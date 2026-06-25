import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<MongoClient> | undefined;

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!global.mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global.mongoClientPromise = client.connect();
  }

  if (process.env.NODE_ENV === "development") {
    return global.mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}
