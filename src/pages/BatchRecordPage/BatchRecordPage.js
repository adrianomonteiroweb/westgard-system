import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import InputComponent from "../../components/forms/inputs/InputComponent";
import { initialStage3 } from '../../context/initialGlobalState';
import IsContext from '../../context/IsContext';

import './batchRecordPage.css';

function BatchRecordPage() {
    const { stage3, setStage3 } = useContext(IsContext);
    console.log(stage3);
    return (
        <>
            <div className="batch-record-div">
                <div>
                    <InputComponent input={['date', 'batch-date', '', 'Data']} />
                </div>
                <div>
                    <InputComponent input={['number', 'nivel1-result', '', 'Resultado Nível 1']} />
                </div>
                <div>
                    <InputComponent input={['number', 'nivel2-result', '', 'Resultado Nível 2']} />
                </div>
                <div>
                    <Button className='register-button'>+</Button>
                </div>
            </div>
            <Table striped borded hover>
                <tbody>
                    {stage3.map(({date, nivel1, nivel2}, index) => (
                        <tr key={index}>
                            <td>
                                {`${index}`}
                            </td>
                            <td>
                                {`${date}`}
                            </td>
                            <td>
                                {`${nivel1}`}
                            </td>
                            <td>
                                {`${nivel2}`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='links-div'>
                {/* link */}
                <Link to='/batch-registration' id='back-button' className='link'>Voltar</Link>
                <Link to='/batch-result' id='next-button'  className='link'>Próximo</Link>
                <Link id='clear-button'  className='link' onClick={() => setStage3(initialStage3)}>Limpar</Link>
            </div>
        </>
    );
}

export default BatchRecordPage;