import bcrypt from 'bcrypt';

export default class AuthService {
    public static async hasPassword(password: string, salt = 10): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    public static async comparePassaword(password: string, hashedPassword: string,): Promise<boolean> {
        return await bcrypt.compareSync(password, hashedPassword);
    }
}