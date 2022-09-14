import express from 'express';
import { Request, Response, Application } from 'express';
import {Puppy, NewPuppy} from "./types";
import cors from "cors";


const puppies: Puppy[] = [{"id": 1,
  "breed": "Yorkshire terrier",
  "name": "Amadeus",
  "birth_date": "2020-11-05"},
  {"id": 2,
  "breed": "Poodle",
  "name": "Rambo",
  "birth_date": "2018-02-07"},
  {"id": 3,
  "breed": "Golden retriever",
  "name": "Lady Anne",
  "birth_date": "2021-10-25"}];

const app: Application = express();
app.use(cors<Request>());
app.use(express.json());

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.status(200).json({ puppies: puppies });
});

// app.get('/api/puppies/random', (_req: Request, res: Response) => {
//   const index
//   return res.status(200).json({ puppies: puppies });
// });

app.get('/api/puppies/:id', (req: Request<{ id: string}>, res: Response) => {
  const puppyId = +req.params.id;
  if(isNaN(puppyId)) return res.status(400).json({message: "Puppy id can only be a number"});
  const puppyIndex = puppies.findIndex(pup => pup.id === puppyId);
  if (puppyIndex === -1) return res.status(404).json({message: "No such puppy found."})
  return res.status(200).json({ puppy: puppies[puppyIndex] });
});

// app.post('/api/puppies', (req: Request<{},{}, NewPuppy>, res: Response) => {
//   const newPuppy = req.body;
//   const lastId = Math.max(...puppies.map(pup => pup.id));
//   const newId = lastId + 1;
//   const dbPuppy = {...newPuppy, id: newId};
//   puppies.push(dbPuppy);
//   return res.status(201).json({ puppy: dbPuppy });
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

// app.put('/api/puppies/:id', (req: Request<{ id: string},{}, NewPuppy>, res: Response) => {
//   const updatedPuppy = req.body;
//   const puppyId = +req.params.id;
//   const dbPuppy: Puppy = {...updatedPuppy, id: puppyId};
//   const puppyIndex = puppies.findIndex(pup => pup.id === puppyId);
//   if (puppyIndex === -1) return res.status(404).json({message: "No such puppy found."})
//   puppies.splice(puppyIndex, 1, dbPuppy);
//   return res.status(200).json({ puppy: dbPuppy });
// });

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
