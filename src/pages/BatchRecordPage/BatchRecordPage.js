import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import InputComponent from "../../components/forms/inputs/InputComponent";
import { initialStage3 } from "../../context/initialGlobalState";
import IsContext from "../../context/IsContext";
import { emptyInputs, getValuesOfInputs, persistDataOnLocalStorage, setValuesOfInputs } from "../../utils/functions/";

import "./batchRecordPage.css";

function BatchRecordPage() {
  const { stage3, setStage3 } = useContext(IsContext);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("stage3"))) setStage3(JSON.parse(localStorage.getItem("stage3")));
  }, []);
  
  const batches = {};

  const setStage3Func = () =>
  {
    const date = document.querySelector("#batch-date").value;
    const nivel1 = document.querySelector("#nivel1-result").value;
    const nivel2 = document.querySelector("#nivel2-result").value;

    const stage3Change = [...stage3, {
      id: stage3.length + 1,
      date,
      nivel1,
      nivel2
    }];

    setStage3(stage3Change);

    persistDataOnLocalStorage("stage3", stage3Change);

    emptyInputs(["batch-date", "nivel1-result", "nivel2-result"]);
  };

  const setStage3ById = (id) => {
    const values = getValuesOfInputs(["batch-date", "nivel1-result", "nivel2-result"]);

    const allStage = stage3.filter((reg) => reg.id !== Number(id));

    const isId = Number(id);

    const changeStage3 = [
      ...allStage,
      {id: isId, date: values[0], nivel1: values[1], nivel2: values[2]}];

    setStage3(changeStage3);

    persistDataOnLocalStorage("stage3", changeStage3);

    emptyInputs(["batch-date", "nivel1-result", "nivel2-result"]);
  };

  const editRegister = (id) => {
    const forEdit = stage3.filter((reg) => reg.id === id);
    
    if (forEdit.length > 0) {
      const {date, nivel1, nivel2} = forEdit[0];

      setValuesOfInputs(["batch-date", "nivel1-result", "nivel2-result"], [date, nivel1, nivel2]);

      document.querySelector(".update-button").id = id;
    }
  };

  const deleteRegister = (id) => {
    const forDelete = stage3.filter((reg) => reg.id !== id);

    setStage3(forDelete);

    persistDataOnLocalStorage("stage3", forDelete);
  };

  return (
    <div className="batch-record">
      <div className="batch-record-div">
        <div>
          <InputComponent input={["date", "batch-date",  batches["date"], "Data"]} />
        </div>
        <div>
          <InputComponent input={["number", "nivel1-result",  batches["nivel1"], "Nível 1"]} />
        </div>
        <div>
          <InputComponent input={["number", "nivel2-result",  batches["nivel2"], "Nível 2"]} />
        </div>
        <div>
          <Button className="register-button" onClick={() => setStage3Func()}>Adicionar</Button>
          <Button className="update-button" onClick={(event) => setStage3ById(event.target.id)}>Atualizar</Button>
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
                  className="edit-button"
                  onClick={() => editRegister(index + 1)}
                >
                    Editar
                </Button>
                <Button
                  className="delete-button"
                  onClick={() => deleteRegister(index + 1)}
                >
                    Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="links-div">
        {/* link */}
        <Link to="/" id="back-button" className="link">Voltar</Link>
        <Link to="/batch-registration" id="next-button"  className="link">Próximo</Link>
        <Link id="clear-button"  className="link" onClick={() => {
          setStage3(initialStage3);
          persistDataOnLocalStorage("stage3", initialStage3);
        }}>Limpar Sessão</Link>
      </div>
    </div>
  );
}

export default BatchRecordPage;