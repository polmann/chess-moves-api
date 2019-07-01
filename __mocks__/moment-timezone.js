export const FakeMoment = jest.fn();
FakeMoment.prototype.tz = jest.fn().mockReturnThis();
FakeMoment.prototype.format = jest.fn().mockReturnThis();
FakeMoment.prototype.startOf = jest.fn().mockReturnThis();

const moment = jest.fn(() => new FakeMoment());

export default moment;
