import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AnaliticSystemPage from './pages/AnaliticSystemPage/AnaliticSystemPage';

import './App.css';

function App() {
  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={[<AnaliticSystemPage />]} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
