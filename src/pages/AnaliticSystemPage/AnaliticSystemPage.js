import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import IsContext from '../../context/IsContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './analiticSystemPage.css'

function AnaliticSystemPage() {
    const { stage1, setStage1 } = useContext(IsContext);
    
    return (
      <div className='analiticSystem-div'>
        {/* analiticSystem input */}
        <Form.Label htmlFor='analiticSystem'>Sistema Analítico</Form.Label>
        <Form.Control type='text' id='analiticSystem' value={ stage1.analiticSystem } onChange={(event) => setStage1({...stage1, analiticSystem: event.target.value })} />
        {/* test input */}
        <Form.Label htmlFor='test'>Teste</Form.Label>
        <Form.Control type='text' id='test' value={ stage1.test } onChange={(event) => setStage1({...stage1, test: event.target.value })} />
        {/* unit input */}
        <Form.Label htmlFor='unit'>Unidade</Form.Label>
        <Form.Control type='text' id='unit' value={ stage1.unit } onChange={(event) => setStage1({...stage1, unit: event.target.value })} />
        {/* method input */}
        <Form.Label htmlFor='method'>Método</Form.Label>
        <Form.Control type='text' id='method' value={ stage1.method } onChange={(event) => setStage1({...stage1, method: event.target.value })} />
        {/* period input */}
        <Form.Label htmlFor='period'>Período</Form.Label>
        <Form.Control type='text' id='period' value={ stage1.period } onChange={(event) => setStage1({...stage1, period: event.target.value })} />
        {/* link */}
        <Link to='/batch-registration' id='next-button'>Próximo</Link>
      </div>
    );
  }
  
  export default AnaliticSystemPage;