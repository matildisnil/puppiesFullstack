import { Schema, model, connect } from 'mongoose';
import { IPuppy } from './types';
import * as dotenv from 'dotenv';
dotenv.config();

const puppySchema = new Schema<IPuppy>({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  birth_date: { type: String, required: true },
});

const PuppyModel = model<IPuppy>('Puppy', puppySchema);

async function connectToDB() {
    try { 
        await connect(`mongodb+srv://matilda:${process.env.MONGODB_PASSWORD}@cluster0.ahsfpwx.mongodb.net/?retryWrites=true&w=majority`, {
            socketTimeoutMS: 3000
        });
    } catch (err){
        console.log(err)
    } 
}

export { connectToDB, PuppyModel }