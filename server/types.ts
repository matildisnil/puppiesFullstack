import mongoose from "mongoose"

// export interface Puppy {
//     id: number,
//     breed: string,
//     name: string,
//     birth_date: string
// }

// export interface StringPuppy {
//     id: string,
//     breed: string,
//     name: string,
//     birth_date: string
// }

// export interface NewPuppy {
//     breed: string,
//     name: string,
//     birth_date: string
// }

export interface DBPuppy {
    _id: mongoose.Types.ObjectId,
    breed: string,
    name: string,
    birth_date: string
}

export interface IPuppy {
    name: string;
    breed: string;
    birth_date: string;
  }