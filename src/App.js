import './App.css';
import { HomePage } from './Components/homePage/HomePage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <HomePage />
    </>
  )
}
export default App;
