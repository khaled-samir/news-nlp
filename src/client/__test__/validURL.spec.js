import { validURL } from "../js/validURL";
test('Check if the string is URL', () => {
    expect(validURL('test test')).toBeFalsy()
})