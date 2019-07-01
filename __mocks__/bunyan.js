export const mockInfo = jest.fn();
export const mockLogger = { info: mockInfo };
export default { createLogger: jest.fn().mockReturnValue(mockLogger) };
