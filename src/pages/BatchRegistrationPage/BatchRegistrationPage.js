import { useContext } from 'react';
import { Link } from 'react-router-dom';

import IsContext from '../../context/IsContext';
import NilvelsComponent from './nivelsComponent/NivelsComponent';

import './batchRegistrationPage.css';
import { initialStage2 } from '../../context/initialGlobalState';

function BatchRegistrationPage() {
    const { stage2, setStage2 } = useContext(IsContext);
    console.log(stage2);
    return (
      <div className='batchRegistration-div'>
        <div className='nivels-div'>
            <NilvelsComponent nivel={ ['nivel1', 'Nível 1', stage2, setStage2] } />
            <NilvelsComponent nivel={ ['nivel2', 'Nível 2', stage2, setStage2] } />
        </div>
        {/* link */}
        <Link to='/' id='back-button'>Voltar</Link>
        <Link to='/batch-record' id='next-button'>Próximo</Link>
        <Link id='clear-button' onClick={() => setStage2(initialStage2)}>Limpar</Link>
      </div>
    );
  }
  
  export default BatchRegistrationPage;