import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <Form.Label htmlFor='analiticSystem'>Sistema Analítico</Form.Label>
      <Form.Control type='text' id='analiticSystem' />
    </>
  );
}

export default App;
