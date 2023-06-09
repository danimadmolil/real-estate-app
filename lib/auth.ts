import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);
export const comparePasswords = async (
  plainPassword: string,
  hashPassword: string
) => {
  return bcrypt.compare(plainPassword, hashPassword);
};

export const createJWT = (user) => {
  // return jwt.sign({ id: user.id }, 'cookies')
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({ payload: { id: user.id, email: user.email } })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt) => {
  if (jwt) {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return payload.payload as any;
  }
  return null;
};

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);

  if (jwt) {
    const { id } = await validateJWT(jwt && jwt.value);

    const user = await db.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  }
  return null;
};
