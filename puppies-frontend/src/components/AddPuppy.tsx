import React from 'react'
import { useState } from 'react';
import "./AddPuppyStyle.css";

const backendUri = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://dogalogue.herokuapp.com/';

interface AddPuppyComponentProps {
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const AddPuppy = ({ setCounter }: AddPuppyComponentProps) => {
    const formInitialState = { name: '', breed: '', birth_date: '2000-01-01' }
    const [formData, setFormData] = useState(formInitialState);


    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postToBackend = async () => {
            await fetch(`${backendUri}/api/puppies`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            setCounter(prev => prev + 1);
        }
        postToBackend();
        setFormData(formInitialState);
    }

    return (
        <>
            <div className='add-puppy-container'>
                <form className="puppy_form" onSubmit={handleSubmit}>
                    <h1 className='add-puppy-title'> Add a Dog to the Dogalogue</h1>

                    <input className='input' type="text" id="name" name="name" placeholder='Name' value={formData.name} onChange={onFormChange} required />

                    <input type="text" className="input" id="breed" name="breed" placeholder='Breed' value={formData.breed} onChange={onFormChange} required />

                    <label htmlFor="birth_date">
                        Date of Birth:
                    </label>
                    <input type="date" className="input" id="birth_date" name="birth_date" value={formData.birth_date} onChange={onFormChange} required />

                    <button className="submit-button" type="submit" >Add Dog</button>
                </form>
            </div>
        </>
    )
}

export default AddPuppy