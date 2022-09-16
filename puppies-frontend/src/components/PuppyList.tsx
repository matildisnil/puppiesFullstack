import React from 'react'
import PuppyCard from './PuppyCard';
import { Puppy } from '../types';
import "./PuppyListStyle.css"

interface PuppyListComponentProps {
    puppies: Puppy[],
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const PuppyList = ({puppies, setCounter}: PuppyListComponentProps) => {
  return (
    <div className="puppy-list">{puppies.map(puppy =><PuppyCard puppy={puppy} key={puppy._id} setCounter={setCounter} />)}</div>
  )
}

export default PuppyList