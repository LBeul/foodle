import foodleIcon from '/foodle.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3003/api/restaurants');
      const parsedData = await data.json();
      console.log(parsedData);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <img src={foodleIcon} className='logo' alt='Vite logo' />
      </div>
      <h1>Foodle</h1>
      <div className='card'>
        <p>Check console for queried data!</p>
      </div>
    </>
  );
}

export default App;
