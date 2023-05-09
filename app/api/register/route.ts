import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";
BigInt.prototype.toJSON = function () {
  return this.toString();
};
export async function POST(req, res) {
  const { password, email, firstName } = await req.json();
  console.log(">> dd", { password, email, firstName });
  if (req.method === "POST") {
    const user = await db.users.create({
      data: {
        email: email,
        password: await hashPassword(password),
        name: firstName,
      },
    });

    const jwt = await createJWT(user);
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
      // headers: {
      //   "Set-Cookie": serialize(process.env.COOKIE_NAME, jwt, {
      //     httpOnly: true,
      //     path: "/",
      //     maxAge: 60 * 60 * 24 * 7,
      //   }),
      // },
    });
  } else {
    return new Response(
      JSON.stringify({ message: "because email or password was wrong" }),
      {
        status: 403,
      }
    );
  }
}
