import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import InputComponent from "../../components/forms/inputs/InputComponent";
import { initialStage3 } from '../../context/initialGlobalState';
import IsContext from '../../context/IsContext';

import './batchRecordPage.css';

function BatchRecordPage() {
    const { stage3, setStage3 } = useContext(IsContext);
    const [batches, setBatches] = useState({});
    console.log(stage3); // -----------------------------

    const emptyInputs = () => 
    {
        document.querySelector('#batch-date').value = '';
        document.querySelector('#nivel1-result').value = '';
        document.querySelector('#nivel2-result').value = '';
    }

    const setStage3Func = () =>
      {
        const date = document.querySelector('#batch-date').value;
        const nivel1 = document.querySelector('#nivel1-result').value;
        const nivel2 = document.querySelector('#nivel2-result').value;

        setStage3([...stage3, {
            id: stage3.length + 1,
            date,
            nivel1,
            nivel2
        }])

        emptyInputs()
    }

    const setStage3ById = (id) => {
        const date = document.querySelector('#batch-date').value;
        const nivel1 = document.querySelector('#nivel1-result').value;
        const nivel2 = document.querySelector('#nivel2-result').value;

        const allStage = stage3.filter((reg) => reg.id !== Number(id))

        const isId = Number(id);

        setStage3([...allStage, {id: isId, date, nivel1, nivel2}])

        emptyInputs()
    }

    const editRegister = (id) => {
        const forEdit = stage3.filter((reg) => reg.id === id)
        
        if (forEdit.length > 0) {
            const {date, nivel1, nivel2} = forEdit[0];

            document.querySelector('#batch-date').value = date;
            document.querySelector('#nivel1-result').value = nivel1;
            document.querySelector('#nivel2-result').value = nivel2;

            document.querySelector('.update-button').id = id;
        }
    }

    return (
        <>
            <div className="batch-record-div">
                <div>
                    <InputComponent input={['date', 'batch-date',  batches['date'], 'Data']} />
                </div>
                <div>
                    <InputComponent input={['number', 'nivel1-result',  batches['nivel1'], 'Nível 1']} />
                </div>
                <div>
                    <InputComponent input={['number', 'nivel2-result',  batches['nivel2'], 'Nível 2']} />
                </div>
                <div>
                    <Button className='register-button' onClick={() => setStage3Func()}>Adicionar</Button>
                    <Button className='update-button' onClick={(event) => setStage3ById(event.target.id)}>Atualizar</Button>
                </div>
            </div>
            <Table striped borded hover>
                <tbody>
                    <tr>
                        <th>Nº</th>
                        <th>Data</th>
                        <th>Nível 1</th>
                        <th>Nível 2</th>
                    </tr>
                    {stage3.map(({date, nivel1, nivel2}, index) => (
                        <tr key={index}>
                            <td>
                                {`${index + 1}`}
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
                            <td>
                                <Button
                                    className='edit-button'
                                    onClick={() => editRegister(index + 1)}
                                >
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='links-div'>
                {/* link */}
                <Link to='/' id='back-button' className='link'>Voltar</Link>
                <Link to='/batch-registration' id='next-button'  className='link'>Próximo</Link>
                <Link id='clear-button'  className='link' onClick={() => setStage3(initialStage3)}>Limpar</Link>
            </div>
        </>
    );
}

export default BatchRecordPage;