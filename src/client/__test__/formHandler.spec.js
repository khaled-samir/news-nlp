import { handleSubmit } from "./handleSubmit";

test('Call API', () => {
    expect(handleSubmit().toBeDefined())
})