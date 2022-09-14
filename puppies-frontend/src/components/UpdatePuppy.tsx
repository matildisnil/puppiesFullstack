import React from 'react'
import { useState } from 'react';
import {Puppy} from '../types';
import "./AddPuppyStyle.css";

interface UpdatePuppyComponentProps {
    puppy: Puppy,
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    updateIsActive: boolean,
    setUpdateIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdatePuppy = ({puppy, setCounter, updateIsActive, setUpdateIsActive}: UpdatePuppyComponentProps) => {
    const [formData, setFormData] = useState({
        name: puppy.name,
        breed: puppy.breed,
        birth_date: '2000-01-01'
    });
    
    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return {...prev, [e.target.name]: e.target.value}  
        })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postToBackend = async() => {
            await fetch(`http://localhost:8080/api/puppies/${puppy.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            // const parsedResponse: {puppy: Puppy} = await response.json();
            setCounter(prev => prev + 1);
            setUpdateIsActive(!updateIsActive)
        }
        postToBackend();
    }

    return (
        <>
            <div>
                <form className="add-puppy_form" onSubmit={handleSubmit}> 
                    <label htmlFor="name">
                        Name:
                        <input type="text" id="name" name="name" value={formData.name} onChange={onFormChange} required/>
                    </label>
                    <label htmlFor="breed">
                        Breed:
                        <input type="text" id="breed" name="breed" value={formData.breed} onChange={onFormChange} required/>
                    </label>
                    <label htmlFor="Birth day">
                        Age:
                        <input type="date" id="age" name="birth_date" value={formData.birth_date} onChange={onFormChange} required/>
                    </label>
                    <button className="submit-button" type="submit" >Update Dog</button>
                </form>
            </div>
        </>
    )
}

export default UpdatePuppy