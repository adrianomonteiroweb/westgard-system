import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './analiticSystemPage.css'

function AnaliticSystemPage() {
    return (
      <div className='analiticSystem-div'>
        <Form.Label htmlFor='analiticSystem'>Sistema Analítico</Form.Label>
        <Form.Control type='text' id='analiticSystem' />
        <Form.Label htmlFor='test'>Teste</Form.Label>
        <Form.Control type='text' id='test' />
        <Form.Label htmlFor='unit'>Unidade</Form.Label>
        <Form.Control type='text' id='unit' />
        <Form.Label htmlFor='method'>Método</Form.Label>
        <Form.Control type='text' id='method' />
        <Form.Label htmlFor='period'>Período</Form.Label>
        <Form.Control type='text' id='period' />
        <Link to='/next' id='next-button'>Próximo</Link>
      </div>
    );
  }
  
  export default AnaliticSystemPage;