import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017/";

const client = new MongoClient(connectionString);

let dbConnect = async() => {
        let conn = await client.connect()
        return conn.db('TestBlog')
    }

export default dbConnect;