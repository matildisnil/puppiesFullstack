import { Schema, model, connect } from 'mongoose';
import { IPuppy } from './types';
import * as dotenv from 'dotenv';
dotenv.config();


// 1. Create an interface representing a document in MongoDB.
// interface IPuppy {
//   name: string;
//   breed: string;
//   birth_date: string;
// }

// 2. Create a Schema corresponding to the document interface.
const puppySchema = new Schema<IPuppy>({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  birth_date: { type: String, required: true },
});

// 3. Create a Model.
const PuppyModel = model<IPuppy>('Puppy', puppySchema);

async function connectToDB() {
  // 4. Connect to MongoDB
    try { 
        await connect(`mongodb+srv://matilda:${process.env.MONGODB_PASSWORD}@cluster0.ahsfpwx.mongodb.net/?retryWrites=true&w=majority`, {
            socketTimeoutMS: 3000
        });
    /*  setTimeout(() => mongoose.connection.close(), 3000);
 */    } catch (err){
        console.log(err)
    } 
}

export { connectToDB, PuppyModel }