import jwt from 'jsonwebtoken';
export class AuthUtil {
  static generateToken(name: string) {
    return jwt.sign({ name }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
  }
}
