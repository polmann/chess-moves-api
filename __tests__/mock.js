export default {
  asyncFn(implementation) {
    const mock = jest.fn(function asyncFn() {
      return Promise.resolve(implementation ? implementation.call(this) : undefined);
    });
    mock.mockResolveValueOnce = value => mock.mockReturnValueOnce(Promise.resolve(value));
    mock.mockRejectValueOnce = value => mock.mockReturnValueOnce(Promise.reject(value));
    return mock;
  },
  callbackFn() {
    const argumentsStack = [];
    const mock = jest.fn(...args => args[args.length - 1].apply(null, argumentsStack.pop()));
    mock.mockCallbackArgumentsOnce = (...args) => argumentsStack.push(args);
    return mock;
  },
};
