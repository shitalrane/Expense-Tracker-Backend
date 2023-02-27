import dbConnect from "./MongoDBConnection";

export const createUser = async (user: any) => {
    console.log('in create user')
    let db = await dbConnect()
    
    let collection = db.collection('test1')
    let asd = await collection.insertOne({'key': 'value'})
    console.log(asd)
}