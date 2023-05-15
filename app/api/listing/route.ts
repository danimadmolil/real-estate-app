import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

type RequestBody = {
  type: "Rent" | "Sell";
  bed: number;
  title: string;
  price: string;
  category: string;
  location: { lng: number; lat: number };
  city: string;
  town: string;
  address: string;
  description: string;
  county: string;
  postalCode: string;
};
BigInt.prototype.toJSON = function () {
  return this.toString();
};
export async function GET() {
  const listings = await db.listing.findMany({
    include: { createdBy: { select: { name: true } } },
  });
  return new Response(JSON.stringify(listings));
}

export async function POST(req: Request) {
  const requestBody: RequestBody = await req.json();
  const user = await getUserFromCookie(cookies());
  function validation(data: RequestBody) {
    if (data.type !== "Sell" && data.type !== "Rent") {
      return false;
    }
  }
  function generateCategory(clientCategory = "") {
    if (clientCategory === "Apartment") {
      return "APARTMENT";
    } else if (clientCategory === "Gust House") {
      return "GUSTHOUSE";
    } else if (clientCategory === "House") {
      return "HOUSE";
    }
    return "HOUSE";
  }
  if (user && requestBody && validation(requestBody) !== false) {
    try {
      const listing = await db.listing.create({
        data: {
          type: (requestBody.type === "Rent" && "RENT") || "SELL",
          postalCode: requestBody.postalCode,
          category: generateCategory(requestBody.category),
          city: requestBody.city,
          address: requestBody.address,
          description: requestBody.description,
          lat: Number(requestBody.location.lat),
          lng: Number(requestBody.location.lng),
          price: Number(requestBody.price),
          title: requestBody.title,
          bed: Number(requestBody.bed),
          createdBy: { connect: { id: user.id } },
          county: requestBody.county,
        },
      });
      return new NextResponse(JSON.stringify(listing), { status: 201 });
    } catch (e) {
      return new NextResponse("Failed to create listing", { status: 401 });
    }
  }

  console.log({ requestBody });
}
