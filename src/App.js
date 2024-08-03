import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [test, setTest] = useState([
    { title: "Get active, Toronto!", id: 12 }, 
    { title: "c asd, 2!", id: 13 },,
    { title: "c2 asd, 2!", id: 14 },
  ]);

  return (
    <div className="App">
      <h1 class="text-3xl font-bold underline">
        Hello world!
      </h1>
      {test.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </div>
  );
}

export default App;