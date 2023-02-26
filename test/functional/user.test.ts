import { User } from "@src/models/user";

describe('User functional test', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    })

    describe('When createting new user', () => {
        it('should successfunly create a new user', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '12345'
            }

            const response = await global.testRequest.post('/users').send(newUser);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining(newUser));
        })
    })
});