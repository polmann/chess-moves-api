export const mockExpressUse = jest.fn();
export const mockExpressEnable = jest.fn();
export default jest.fn().mockReturnValue({
  use: mockExpressUse,
  enable: mockExpressEnable,
});
