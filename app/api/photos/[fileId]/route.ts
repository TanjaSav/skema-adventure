import { GridFSBucket, ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ fileId: string }> }
) {
  const { fileId } = await context.params;

  if (!ObjectId.isValid(fileId)) {
    return Response.json({ error: "Invalid file id." }, { status: 400 });
  }

  try {
    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB ?? "skema_adventure");
    const bucket = new GridFSBucket(db, { bucketName: "task_photos" });
    const objectId = new ObjectId(fileId);
    const files = await bucket.find({ _id: objectId }).toArray();
    const file = files[0];

    if (!file) {
      return Response.json({ error: "Photo not found." }, { status: 404 });
    }

    const chunks: Buffer[] = [];
    const stream = bucket.openDownloadStream(objectId);

    await new Promise<void>((resolve, reject) => {
      stream.on("data", (chunk: Buffer) => chunks.push(chunk));
      stream.on("error", reject);
      stream.on("end", resolve);
    });

    const body = Buffer.concat(chunks);
    const contentType =
      typeof file.metadata?.contentType === "string"
        ? file.metadata.contentType
        : "application/octet-stream";

    return new Response(body, {
      headers: {
        "Cache-Control": "private, max-age=3600",
        "Content-Length": String(body.length),
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to load photo." }, { status: 500 });
  }
}
