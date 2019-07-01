export const mockBodyParserJsonInstance = jest.fn();
export const mockBodyParserJson = jest.fn().mockReturnValue(mockBodyParserJsonInstance);
export default { json: mockBodyParserJson };
