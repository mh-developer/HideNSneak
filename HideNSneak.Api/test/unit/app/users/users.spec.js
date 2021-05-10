const { usersService } = require("../../../../src/app/index");

test("test getting all users", async () => {
    const data = await usersService.getAll();
    expect(data).toBeDefined();
});
