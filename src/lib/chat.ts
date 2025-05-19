
import { generateGroqResponse, GroqMessage } from './groqApi';

// Function to generate a response based on the input and conversation history
export const generateResponse = async (input: string, messageHistory: GroqMessage[] = []): Promise<string> => {
  return await generateGroqResponse(input, messageHistory);
};
