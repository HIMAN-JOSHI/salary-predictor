export const predictSalary = async (prompt, onChunk) => {
    const api = process.env.REACT_APP_OPENAI ;
  
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
        stream: true,
      }),
    });
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
  
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
  
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
              onChunk(content);  // Append each chunk to the prediction
            }
          } catch (err) {
            console.error("Error parsing chunk:", err, "Problematic line:", dataStr);
          }
        }
      }
    }
  };
  