import { useEffect, useState } from 'react';
import AddPuppy from './components/AddPuppy';
import PuppyList from './components/PuppyList';
import Header from './components/Header';
import { Puppy } from './types';
import './App.css';


function App() {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchFromApi = async() => {
      const response = await fetch('http://localhost:8080/api/puppies');
      const parsedResponse: {puppies: Puppy[]} = await response.json();
      console.log(parsedResponse);
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
