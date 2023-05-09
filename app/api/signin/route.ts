import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req, res: NextApiResponse) {
  const { email, password } = await req.json();
  if (req.method === "POST") {
    const user = await db.users.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new Response("Failed to login", { status: 401 });
    }

    const isUser = await comparePasswords(password, user.password);

    if (isUser) {
      const jwt = await createJWT(user);
      return new Response(JSON.stringify({ user: user }), {
        status: 200,
        headers: {
          "Set-Cookie": serialize(process.env.COOKIE_NAME, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          }),
        },
      });
    } else {
      return new Response("Invalid login", { status: 403 });
    }
  } else {
    return new Response("Failed to login", { status: 402 });
  }
}
