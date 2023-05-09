import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/dist/client/components/headers";
BigInt.prototype.toJSON = function () {
  return this.toString();
};
export async function POST(req) {
  const user = await getUserFromCookie(cookies());
  console.log("my user", user);

  return new Response(JSON.stringify(user), { status: 200 });
}
