import healthCheck from '../healthCheck';

it('Call res.send with 200', () => {
  const res = { sendStatus: jest.fn() };
  healthCheck(null, res);
  expect(res.sendStatus).toHaveBeenCalledWith(200);
});
