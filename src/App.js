import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AnaliticSystemPage from './pages/AnaliticSystemPage/AnaliticSystemPage';

import './App.css';
import IsProvider from './context/IsProvider';

function App() {
  return (
    <IsProvider>
      <div className='App'>
        <div>
          <h1>Controle de qualidade</h1>
        </div>
      <Router>
        <Routes>
          <Route path='/' element={[<AnaliticSystemPage />]} />
        </Routes>
      </Router>
      </div>
    </IsProvider>
  );
}

export default App;
