import { getMongoClient } from "@/lib/mongodb";

export const runtime = "nodejs";

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    ageCategoryId?: unknown;
    teamName?: unknown;
  } | null;
  const teamName = getString(body?.teamName);
  const ageCategoryId = getString(body?.ageCategoryId);

  if (!teamName || !ageCategoryId) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
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
    const collection = db.collection("teams");
    const now = new Date();

    const result = await collection.updateOne(
      { ageCategoryId, teamName },
      {
        $set: {
          ageCategoryId,
          lastStartedAt: now,
          teamName,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true }
    );

    return Response.json({
      id: result.upsertedId?.toString() ?? null,
      matched: result.matchedCount,
      upserted: result.upsertedCount,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to save team." },
      { status: 500 }
    );
  }
}
