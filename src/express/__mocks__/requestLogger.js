export const mockLogger = jest.fn();
export default jest.fn().mockReturnValue(mockLogger);
