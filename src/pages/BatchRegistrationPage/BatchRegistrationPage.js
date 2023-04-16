import { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import IsContext from '../../context/IsContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import './batchRegistrationPage.css';

function BatchRegistrationPage() {
    const { stage2, setStage2 } = useContext(IsContext);

    return (
      <div className='batchRegistration-div'>
        <div className='nivels-div'>
            <div className='nivel1'>
                {/* nivel1 input */}
                <Form.Label htmlFor='nivel1'>Nível 1</Form.Label>
                <Form.Control type='text' id='nivel1'
                onChange={(event) => setStage2({ nivel2: stage2.nivel2, nivel1: { ...stage2.nivel1, nivel1: event.target.value} })}
                />
            </div>
            <div className='nivel2'>
                {/* nivel2 input */}
                <Form.Label htmlFor='nivel2'>Nível 2</Form.Label>
                <Form.Control type='text' id='nivel2'
                onChange={(event) => setStage2({ nivel1: stage2.nivel1, nivel2: { ...stage2.nivel2, nivel2: event.target.value} })}
                />
            </div>
        </div>
        {/* link */}
        <Link to='/' id='next-button'>Voltar</Link>
        <Link to='/batch-registration' id='next-button'>Próximo</Link>
      </div>
    );
  }
  
  export default BatchRegistrationPage;