import { MongoClient, type Db } from "mongodb"

const MONGODB_URI =
  "mongodb+srv://safetronix:safetronixx3@cluster0.rxjnc1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGODB_DB = "safetronix"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(MONGODB_DB)

    cachedClient = client
    cachedDb = db

    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}
