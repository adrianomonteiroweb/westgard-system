import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AnaliticSystemPage from './pages/AnaliticSystemPage/AnaliticSystemPage';

import './App.css';

function App() {
  return (
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
  );
}

export default App;
