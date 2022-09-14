import React from 'react'
import { useState } from 'react';
import "./AddPuppyStyle.css";

interface AddPuppyComponentProps {
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const AddPuppy = ({ setCounter }: AddPuppyComponentProps) => {
    const [formData, setFormData] = useState({ name: '', breed: '', birth_date: '2000-01-01' });


    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postToBackend = async () => {
            await fetch('http://localhost:8080/api/puppies', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // const parsedResponse = await response.json();
            setCounter(prev => prev + 1);
        }
        postToBackend();
    }

    return (
        <>
            <div>
                <form className="add-puppy_form" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                    Name:
                        <input type="text" id="name" name="name" value={formData.name} onChange={onFormChange} required />
                    </label>
                    <label htmlFor="breed">
                    Breed:
                        <input type="text" id="breed" name="breed" value={formData.breed} onChange={onFormChange} required />
                    </label>
                    <label htmlFor="Birth day">
                    Birth date:
                        <input type="date" id="birth_date" name="birth_date" value={formData.birth_date} onChange={onFormChange} required />
                    </label>
                    <button className="submit-button" type="submit" >Add Dog</button>
                </form>
            </div>
        </>
    )
}

export default AddPuppy