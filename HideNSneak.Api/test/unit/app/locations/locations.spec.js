const { locationsService } = require('../../../../src/app/index');

test('test getting all locations', async () => {
  const data = await locationsService.getAll();
  expect(data).toBeDefined();
});
