export interface Puppy {
    _id: string,
    breed: string,
    name: string,
    birth_date: string
}

export interface DogApiResponse {
    message: string,
    status: string,
    code?: number 
}