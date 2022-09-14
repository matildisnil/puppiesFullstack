import React from 'react';
import { useState, useEffect } from 'react';
import UpdatePuppy from './UpdatePuppy';
import { DogApiResponse, Puppy } from '../types';
import "./PuppyCardStyle.css";

interface PuppyCardProps {
  puppy: Puppy,
  setCounter: React.Dispatch<React.SetStateAction<number>>
}

const PuppyCard = ({ puppy, setCounter }: PuppyCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const [updateIsActive, setUpdateIsActive] = useState(false);
  const [dogImageLink, setDogImageLink] = useState('');
  // let dogImageLink: string = '';

  useEffect(() => {
    const getDogPic = async () => {
      // const response = await fetch(`https://dog.ceo/api/breed/${puppy.breed.toLowerCase()}/images/random`);
      const splitBreed = puppy.breed.toLowerCase().split(' ');
      const breedString = splitBreed[1] ? splitBreed[1] + '/' + splitBreed[0] : splitBreed[0];
      const response = await fetch(`https://dog.ceo/api/breed/${breedString}/images/random`);
      const parsedResponse: DogApiResponse = await response.json();
      if (parsedResponse.status === 'error') {
        setDogImageLink("https://i.pinimg.com/originals/0c/24/36/0c2436d19ec57dfd4a7f4a0076777429.png");
        return
      }
      setDogImageLink(parsedResponse.message);
    }
    getDogPic();
    setCounter(prev => prev + 1);
  }, [puppy.breed, setCounter])


  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const deleteDog = async () => {
      await fetch(`http://localhost:8080/api/puppies/${puppy.id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      //const parsedResponse = await response.json();
      setCounter(prev => prev + 1);
    }
    deleteDog();

  }

  return (
    <>
      <div className="puppy-card-container" >
        <div onClick={toggleClass} className="puppy-card" >{puppy.name} </div>
        {/* dropdowninfo */}
        <div className={isActive ? 'show-details' : "no-details"}>
          <div>Breed: {puppy.breed} </div>
          <div >Birth Date: {puppy.birth_date} </div>
          <button onClick={() => setUpdateIsActive(!updateIsActive)}>{updateIsActive ? 'Close' : 'Update details'}</button>
          <div className={updateIsActive ? 'show-details' : "no-details"}>
            <UpdatePuppy puppy={puppy} setCounter={setCounter} updateIsActive={updateIsActive} setUpdateIsActive={setUpdateIsActive} />
          </div>
          <img className="dog-image" src={dogImageLink} alt="Dog" />
          <button onClick={handleDelete}>Kill your puppy</button>
        </div>
        <hr className="card-divider" />
      </div>
    </>
  )
}


export default PuppyCard