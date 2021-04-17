const validURL = require("./validURL");

test('Check if the string is URL', () => {
    expect(validURL('https://archive.jestjs.io/docs/en/').toBe(true))
})