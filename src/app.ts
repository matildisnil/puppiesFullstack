import express from 'express';
import { connectToDB, PuppyModel } from './database';
import { Request, Response, Application } from 'express';
import { DBPuppy, IPuppy } from "./types";
import cors from "cors";
import path from 'path';

const formatRequestPuppy = (requestPuppy:IPuppy) => {
  return {
    name: requestPuppy.name,
    breed: requestPuppy.breed,
    birth_date: requestPuppy.birth_date,
  }
}

const app: Application = express();

app.use(cors<Request>());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', async (_req: Request, res: Response) => {
  try {
    await connectToDB();
    const puppies2: DBPuppy[] = await PuppyModel.find();
    return res.status(200).json({ puppies: puppies2 });
  } catch (err) {
    return res.status(500).json({message: err});
  }
});

app.get('/api/puppies/:id', async (req: Request<{ id: string}>, res: Response) => {
  try {
    await connectToDB();
    const puppy2: DBPuppy | null  = await PuppyModel.findById(req.params.id);
    if (typeof puppy2 === null){
      return res.json({message: 'no puppy with that id found'})
    }
    return res.json({puppy: puppy2});
  } catch (err) {
    return res.status(500).json({message: err});
  }
});

app.post('/api/puppies', async (req: Request, res: Response) => {
  try {
    if(typeof req.body.breed !== 'string' ||
    typeof req.body.name !== 'string' ||
    typeof req.body.birth_date !== 'string') {
      return res.status(400).json({
        message: "Please supply the new pup on the form \{\"breed\": \"string\",\"name\": \"string\", \"birth_date\": \"string\"\}"});
    }
    const newPuppy: IPuppy = formatRequestPuppy(req.body);
    await connectToDB();
    const puppy = new PuppyModel(newPuppy);
    await puppy.save();
    return res.status(201).json({ puppy: puppy });
  } catch (err) {
    return res.status(500).json({message: err});
  }

});

app.put('/api/puppies/:id', async (req: Request<{ id: string}>, res: Response) => {
  try {
    if(typeof req.body.breed !== 'string' ||
    typeof req.body.name !== 'string' ||
    typeof req.body.birth_date !== 'string') {
      return res.status(400).json({
        message: "Please supply the updated pup on the form \{\"breed\": \"string\",\"name\": \"string\", \"birth_date\": \"string\"\}"});
    }
    const cleanedUpdatePuppy: IPuppy = formatRequestPuppy(req.body);
    await connectToDB();
    const puppy = await PuppyModel.findById(req.params.id);
    if (!puppy){
      return res.json({message: 'no puppy with that id found'})
    }
    Object.assign(puppy, cleanedUpdatePuppy);
    await puppy.save();
    return res.status(200).json({ puppy: puppy });
  } catch (err) {
    return res.status(500).json({message: err});
  }
});

app.delete('/api/puppies/:id', async (req: Request<{ id: string}>, res: Response) => {
  try {
    connectToDB();
    await PuppyModel.deleteOne({ _id: req.params.id });
    return res.status(204).json();
  } catch (err){
    console.log(err);
    return res.status(404).json({message: err});
  }
});

export default app;
