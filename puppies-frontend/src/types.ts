export interface Puppy {
    id: number,
    breed: string,
    name: string,
    birth_date: string
}

export interface DogApiResponse {
    message: string,
    status: string,
    code?: number 
}