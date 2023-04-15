import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function AnaliticSystemPage() {
    return (
      <>
        <Form.Label htmlFor='analiticSystem'>Sistema Analítico</Form.Label>
        <Form.Control type='text' id='analiticSystem' />
      </>
    );
  }
  
  export default AnaliticSystemPage;