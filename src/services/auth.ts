import bcrypt from 'bcrypt';
import jtw from 'jsonwebtoken';
import config from 'config';
import { User } from '@src/models/user';

export interface DecodedUser extends Omit<User, '_id'> {
    id: string
}

export default class AuthService {
    public static async hasPassword(password: string, salt = 10): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    public static async comparePassaword(password: string, hashedPassword: string,): Promise<boolean> {
        return await bcrypt.compareSync(password, hashedPassword);
    }

    public static generateToken(payload: object): string {
        return jtw.sign(payload, config.get('App.auth.key'), {
            expiresIn: config.get('App.auth.tokenExpireIn')
        })
    }

    public static decodeToke(token: string): DecodedUser {
        return jtw.verify(token, config.get('App.auth.key')) as DecodedUser;
    }
}