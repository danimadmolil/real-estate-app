import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Client } from "minio";
import { cookies } from "next/dist/client/components/headers";
import fs from "fs";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

var Minio = require("minio");
var minioClient: Client = new Minio.Client({
  endPoint: "minio-d3814n.chbk.run",

  accessKey: "gGa4j1UNUkyVikjJ0wbCpvhC8IAsyj6n",
  secretKey: "Z38FtUNxT10qtdEfnGpdxIXlZkMFcNgm",
});
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
  // const bucketName = "images";
  // const image = await minioClient.getObject(bucketName, "hello-file");
  // console.log("images", image);
  // return new NextResponse(image);

  const listings = await db.listing.findMany({
    include: { createdBy: { select: { name: true } } },
  });
  return new Response(JSON.stringify(listings));
}

export async function POST(req: Request) {
  const bucketName = "images";
  const requestBody = await req.formData();
  let urls: string[] = [];
  const location = requestBody
    .get("location")
    ?.toString()
    .replace("LatLng(", "")
    .replace(")", "")
    .split(",");

  const uploadFiles = requestBody.getAll("files[]") as File[] | undefined;

  const tempBaseFolderPath = path.join(os.tmpdir(), "/upload");
  if (!fs.existsSync(tempBaseFolderPath)) {
    fs.mkdirSync(tempBaseFolderPath);
  }
  if (uploadFiles) {
    for (let index = 0; index < Array.from(uploadFiles).length; index++) {
      const mime = "jpeg";
      const tempFileName: string = uuidv4();
      const filePath = `${path.join(
        tempBaseFolderPath,
        `${tempFileName}.${mime}`
      )}`;
      fs.writeFileSync(filePath, "");
      let uploadedFileStream = uploadFiles[index].stream();

      const tempFileStream = fs.createWriteStream(filePath);
      let writeToTempFileStream = new WritableStream({
        write(chunk, cb) {
          tempFileStream.write(chunk);
        },
      });
      await uploadedFileStream.pipeTo(writeToTempFileStream);
      tempFileStream.close();

      const tempFileReadableStream = fs.createReadStream(filePath);
      const { versionId, etag } = await minioClient.putObject(
        bucketName,
        `${tempFileName}.${mime}`,
        tempFileReadableStream,
        uploadFiles[index].size,
        { "Content-Type": "image/jpeg" }
      );

      const url = await minioClient.presignedUrl(
        "GET",
        bucketName,
        `${tempFileName}.${mime}`
      );
      urls.push(url);

      fs.rmSync(path.join(filePath));
    }
  }

  const user = await getUserFromCookie(cookies());

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

  if (user) {
    try {
      const listing = await db.listing.create({
        data: {
          images: JSON.stringify(urls),
          type: (requestBody.get("type") === "Rent" && "RENT") || "SELL",
          postalCode: requestBody.get("postalCode"),
          category: generateCategory(requestBody.get("category")),
          city: requestBody.get("city"),
          address: requestBody.get("address"),
          description: requestBody.get("description"),
          lat: Number(location[0]),
          lng: Number(location[1]),
          price: Number(requestBody.get("price")),
          title: requestBody.get("title"),
          bed: Number(requestBody.get("bed")),
          createdBy: { connect: { id: user.id } },
          county: requestBody.get("county"),
        },
      });
      return new NextResponse(JSON.stringify(listing), { status: 200 });
    } catch (e) {
      return new NextResponse("Failed to Create Listing", { status: 500 });
    }
  }
}
