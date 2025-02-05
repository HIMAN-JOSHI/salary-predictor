const { predictSalary } = require('../salaryApi');
const { Readable } = require('stream');

describe('Salary API', () => {
  beforeEach(() => {
    global.fetch = jest.fn();  // Mock the global fetch API
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call onChunk with streamed data', async () => {
    const mockPrompt = "Test prompt for salary prediction";

    // Simulate streaming response using Node.js Readable stream
    const streamData = [
      'data: {"choices":[{"delta":{"content":"$50,000 - $60,000"}}]}',
      'data: [DONE]'
    ];

    // Create a Readable stream that simulates the streamed response
    const mockStream = Readable.from(streamData.map(chunk => `${chunk}\n`));

    // Mock fetch to return the simulated stream
    fetch.mockResolvedValue({
      body: mockStream
    });

    const onChunk = jest.fn();

    await predictSalary(mockPrompt, onChunk);

    // Assertions
    expect(onChunk).toHaveBeenCalledWith('$50,000 - $60,000');
    expect(onChunk).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors gracefully', async () => {
    fetch.mockRejectedValue(new Error('API Error'));

    const onChunk = jest.fn();
    await expect(predictSalary("Test prompt", onChunk)).rejects.toThrow('API Error');
  });
});
