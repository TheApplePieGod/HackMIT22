import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_PASS) {
  throw new Error('Invalid environment variable: "MONGODB_PASS"')
}

const uri = `mongodb+srv://admin:${process.env.MONGODB_PASS}@cluster0.22p7mmz.mongodb.net/?retryWrites=true&w=majority`;
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to ot use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
