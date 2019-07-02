export const mockRouterParam = jest.fn();
export const mockRouterGet = jest.fn();
export const Router = jest.fn().mockReturnValue({
  param: mockRouterParam,
  get: mockRouterGet,
});

export const mockExpressUse = jest.fn();
export const mockExpressEnable = jest.fn();
export default jest.fn().mockReturnValue({
  use: mockExpressUse,
  enable: mockExpressEnable,
});
