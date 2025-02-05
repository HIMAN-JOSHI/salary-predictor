import Logger from 'js-logger';

const api = process.env.REACT_APP_OPENAI; 

export async function predictSalary(prompt, onChunk) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${api}`,  
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a career and salary advisor.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 100,
          temperature: 0.7,
          stream: true  
        })
      });
  
      if (!response.ok) {
        Logger.error('Error fetching the response:', response.statusText);
        return;
      }
  
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
  
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
  
        // Split the streamed response by lines
        const lines = chunkValue.split("\n").filter(line => line.trim() !== "");
  
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6).trim();
  
            if (dataStr === "[DONE]") {
              done = true;
              break;
            }
  
            try {
              const parsed = JSON.parse(dataStr);
              const content = parsed.choices?.[0]?.delta?.content;
  
              if (content) {
                onChunk(content);  // Pass each streamed chunk to the callback
              }
            } catch (err) {
                Logger.error("Error parsing JSON:", err, "Problematic line:", dataStr);
            }
          }
        }
      }
    } catch (error) {
        Logger.error('Error in predictSalary:', error);
    }
  }