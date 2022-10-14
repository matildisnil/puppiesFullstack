import { useEffect, useState } from 'react';
import AddPuppy from './components/AddPuppy';
import PuppyList from './components/PuppyList';
import Header from './components/Header';
import { Puppy } from './types';
import './App.css';

const backendUri = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://dogalogue.herokuapp.com/'; 


function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchFromApi = async() => {
      const response = await fetch(`${backendUri}/api/puppies`);
      const parsedResponse: {puppies: Puppy[]} = await response.json();
      setPuppies(parsedResponse.puppies);
    }
    fetchFromApi();
  }, [counter])
  

  return (
    <div className="App">
      <Header />
      <AddPuppy setCounter={setCounter}/>
      <PuppyList setCounter={setCounter} puppies={puppies}/>
    </div>
  );
}

export default App;
