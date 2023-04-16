import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import IsContext from '../../context/IsContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './analiticSystemPage.css'
import { initialStage1 } from '../../context/initialGlobalState';

function AnaliticSystemPage() {
    const { stage1, setStage1 } = useContext(IsContext);
    console.log(stage1);
    return (
      <div className='analiticSystem-div'>
        <h5>Estágio 1</h5>
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
        <Link id='clear-button' onClick={() => setStage1(initialStage1)}>Limpar</Link>
      </div>
    );
  }
  
  export default AnaliticSystemPage;