const testSum = require("../components/testSum");

test("adds 1 + 2 to equal 3", () => {
  expect(testSum(1, 2)).toBe(3);
});
