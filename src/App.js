import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AnaliticSystemPage from './pages/AnaliticSystemPage/AnaliticSystemPage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={[<AnaliticSystemPage />]} />
      </Routes>
    </Router>
  );
}

export default App;
