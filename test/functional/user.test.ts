import { User } from "@src/models/user";

describe('User functional test', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

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

        it('Should return 400 when there is a validation error', async () => {
            const newUser = {
                email: 'john@mail.com',
                password: '12345'
            }

            const response = await global.testRequest.post('/users').send(newUser);
            expect(response.status).toBe(422);
            expect(response.body).toEqual({
                code: 422,
                error: 'User validation failed: name: Path `name` is required.'
            });
        })

        it('Shold return 409 when the email already exists', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'john@mail.com',
                password: '12345'
            }
            await global.testRequest.post('/users').send(newUser);
            const response = await global.testRequest.post('/users').send(newUser);

            expect(response.status).toBe(409);
            expect(response.body).toEqual({code: 409, error: 'User validation failed: email: already exists in the database'})
        });
    });
});