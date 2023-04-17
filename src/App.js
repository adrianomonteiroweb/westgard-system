import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import AnaliticSystemPage from './pages/AnaliticSystemPage/AnaliticSystemPage';
import BatchRegistrationPage from './pages/BatchRegistrationPage/BatchRegistrationPage';
import BatchRecordPage from './pages/BatchRecordPage/BatchRecordPage';

// css style
import './App.css';

// provider
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
          <Route path='/batch-registration' element={[<BatchRegistrationPage />]} />
          <Route path='/batch-record' element={[<BatchRecordPage />]} />
        </Routes>
      </Router>
      </div>
    </IsProvider>
  );
}

export default App;
