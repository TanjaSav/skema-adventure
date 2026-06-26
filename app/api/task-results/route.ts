import { GridFSBucket, ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";

export const runtime = "nodejs";

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getFile(value: FormDataEntryValue | null) {
  return value instanceof File && value.size > 0 ? value : null;
}

async function uploadPhoto(bucket: GridFSBucket, photo: File) {
  const uploadStream = bucket.openUploadStream(photo.name, {
    metadata: {
      contentType: photo.type || "application/octet-stream",
    },
  });

  const buffer = Buffer.from(await photo.arrayBuffer());

  await new Promise<void>((resolve, reject) => {
    uploadStream.end(buffer, (error?: Error | null) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });

  return uploadStream.id as ObjectId;
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const teamName = getString(formData.get("teamName"));
  const ageCategoryId = getString(formData.get("ageCategoryId"));
  const locationId = getString(formData.get("locationId"));
  const taskTitle = getString(formData.get("taskTitle"));
  const completedAt = getString(formData.get("completedAt"));
  const taskStepValue = Number(getString(formData.get("taskStep")));
  const taskStep = Number.isInteger(taskStepValue) ? taskStepValue : null;
  const photo = getFile(formData.get("photo"));

  if (!teamName || !ageCategoryId || !locationId || !taskTitle || !taskStep) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const completedAtDate = completedAt ? new Date(completedAt) : new Date();

  if (Number.isNaN(completedAtDate.getTime())) {
    return Response.json({ error: "Invalid completedAt value." }, { status: 400 });
  }

  if (!process.env.MONGODB_URI) {
    return Response.json(
      { skipped: true, reason: "MONGODB_URI is not configured." },
      { status: 202 }
    );
  }

  try {
    const client = await getMongoClient();
    const db = client.db(process.env.MONGODB_DB ?? "skema_adventure");
    const collection = db.collection("task_results");
    const bucket = new GridFSBucket(db, { bucketName: "task_photos" });
    const photoFileId = photo ? await uploadPhoto(bucket, photo) : null;

    const result = await collection.insertOne({
      ageCategoryId,
      completedAt: completedAtDate,
      createdAt: new Date(),
      locationId,
      photoContentType: photo?.type || null,
      photoFileId,
      photoFileName: photo?.name ?? null,
      photoFileSize: photo?.size ?? null,
      photoUrl: photoFileId ? `/api/photos/${photoFileId.toString()}` : null,
      taskStep,
      taskTitle,
      teamName,
    });

    return Response.json({ id: result.insertedId.toString() }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to save task result." },
      { status: 500 }
    );
  }
}
