import { validURL } from "./validURL";
test('Check if the string is URL', () => {
    expect(validURL('https://archive.jestjs.io/docs/en/').toBeTruthy())
})