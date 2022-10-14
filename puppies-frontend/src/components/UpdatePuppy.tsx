import React from 'react'
import { useState } from 'react';
import { Puppy } from '../types';
import "./AddPuppyStyle.css";
import "./UpdatePuppyStyle.css";
import { backendUri } from '../App'

interface UpdatePuppyComponentProps {
    puppy: Puppy,
    setCounter: React.Dispatch<React.SetStateAction<number>>,
    updateIsActive: boolean,
    setUpdateIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdatePuppy = ({ puppy, setCounter, updateIsActive, setUpdateIsActive }: UpdatePuppyComponentProps) => {
    const [formData, setFormData] = useState({
        name: puppy.name,
        breed: puppy.breed,
        birth_date: '2000-01-01'
    });

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const postToBackend = async () => {
            await fetch(`${backendUri}/api/puppies/${puppy._id}`, {
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
                <form className="update-puppy_form" onSubmit={handleSubmit}>
                    <label htmlFor="update-name">
                        Name:
                    </label>
                    <input type="text" id="update-name" name="name" value={formData.name} onChange={onFormChange} required />
                    <label htmlFor="update-breed">
                        Breed:
                    </label>
                    <input type="text" id="update-breed" name="breed" value={formData.breed} onChange={onFormChange} required />
                    <label htmlFor="update-birth-date">
                        Date of Birth:
                    </label>
                    <input type="date" id="update-birth-date" name="birth_date" value={formData.birth_date} onChange={onFormChange} required />
                    <button className="update-submit-button" onClick={() => setUpdateIsActive(prev => !prev)} type="button" >Close</button>
                    <button className="update-submit-button" type="submit" >Update Dog</button>
                </form>
            </div>
        </>
    )
}

export default UpdatePuppy