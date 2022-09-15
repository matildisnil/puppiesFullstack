import express from 'express';
import { connectToDB, PuppyModel, IPuppy } from './database';
import { Request, Response, Application } from 'express';
import {Puppy, NewPuppy} from "./types";
import cors from "cors";


const puppies: Puppy[] = [
  {"id": 1,
  "breed": "Pomeranian",
  "name": "Amadeus",
  "birth_date": "2020-11-05"},
  {"id": 2,
  "breed": "Poodle",
  "name": "Rambo",
  "birth_date": "2018-02-07"},
  {"id": 3,
  "breed": "Golden retriever",
  "name": "Lady Anne",
  "birth_date": "2021-10-25"},
  {"id": 4,
  "breed": "Great Dane",
  "name": "Gandalf",
  "birth_date": "1900-01-01"},
];


// const useDataBase = async () => {
//   await connectToDB();
//   // const puppy = new PuppyModel({
//   //   name: 'Old Dog',
//   //   breed: 'German shepherd',
//   //   birth_date: '2020-02-01'
//   // });
//   // // await puppy.save();
//   const found = await PuppyModel.find({name: 'Old Dog'});
//   // if(!found){
//   //   return
//   // }
//   console.log(found[0]);
//   console.log(found[0]._id.toString());
// }

// useDataBase();

const app: Application = express();
app.use(cors<Request>());
app.use(express.json());

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json({ puppies: puppies });
});

// DB version
// app.get('/api/puppies', async (_req: Request, res: Response) => {
//   await connectToDB();
//   const puppies: Array<IPuppy> = await PuppyModel.find();
//   if(puppies.length === 0){
//     return res.json({message: 'no puppies found'});
//   }
//   console.log(puppies);
//   console.log(puppies[0].name);
//   return res.status(200).json({ puppies: puppies });
// });

app.get('/api/puppies/:id', (req: Request<{ id: string}>, res: Response) => {
  const puppyId = +req.params.id;
  if(isNaN(puppyId)) return res.status(400).json({message: "Puppy id can only be a number"});
  const puppyIndex = puppies.findIndex(pup => pup.id === puppyId);
  if (puppyIndex === -1) return res.status(404).json({message: "No such puppy found."})
  return res.status(200).json({ puppy: puppies[puppyIndex] });
});

// DB version
// app.get('/api/puppies/:id', (req: Request<{ id: string}>, res: Response) => {
//   const puppyId = +req.params.id;
//   if(isNaN(puppyId)) return res.status(400).json({message: "Puppy id can only be a number"});

//   // const puppyIndex = puppies.findIndex(pup => pup.id === puppyId);
//   // if (puppyIndex === -1) return res.status(404).json({message: "No such puppy found."})
//   // return res.status(200).json({ puppy: puppies[puppyIndex] });
//   return res.json({message: 'not ready'});
// });

app.post('/api/puppies', (req: Request, res: Response) => {
  if(typeof req.body.breed !== 'string' ||
    typeof req.body.name !== 'string' ||
    typeof req.body.birth_date !== 'string') {
      return res.status(400).json({
        message: "Please supply the new pup on the form \{\"breed\": \"string\",\"name\": \"string\", \"birth_date\": \"string\"\}"});
    }
  const newPuppy: NewPuppy = req.body;
  const lastId = Math.max(...puppies.map(pup => pup.id));
  const newId = lastId + 1;
  const dbPuppy = {...newPuppy, id: newId};
  puppies.push(dbPuppy);
  console.log(puppies);
  return res.status(201).json({ puppy: dbPuppy });
});

app.put('/api/puppies/:id', (req: Request<{ id: string}>, res: Response) => {
  if(typeof req.body.breed !== 'string' ||
  typeof req.body.name !== 'string' ||
  typeof req.body.birth_date !== 'string') {
    return res.status(400).json({
      message: "Please supply the updated pup on the form \{\"breed\": \"string\",\"name\": \"string\", \"birth_date\": \"string\"\}"});
  }
  const updatedPuppy: NewPuppy = req.body;
  const puppyId = +req.params.id;
  if(isNaN(puppyId)) return res.status(400).json({message: "Puppy id can only be a number"});
  const dbPuppy: Puppy = {...updatedPuppy, id: puppyId};
  const puppyIndex = puppies.findIndex(pup => pup.id === puppyId);
  if (puppyIndex === -1) return res.status(404).json({message: "No such puppy found."})
  puppies.splice(puppyIndex, 1, dbPuppy);
  return res.status(200).json({ puppy: dbPuppy });
});

app.delete('/api/puppies/:id', (req: Request<{ id: string}>, res: Response) => {
  const puppyId = +req.params.id;
  if(isNaN(puppyId)) return res.status(400).json({message: "Puppy id can only be a number"});
  const puppyIndex = puppies.findIndex(pup => pup.id === puppyId);
  if (puppyIndex === -1) return res.status(404).json({message: "No such puppy found."});
  puppies.splice(puppyIndex, 1);
  console.log(puppies);
  return res.status(204).json();
});

export default app;
