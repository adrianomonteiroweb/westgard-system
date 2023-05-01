import { useContext, useEffect, useState,} from "react";
import { Button, Table } from "react-bootstrap";
import { IoArrowUndoSharp, IoArrowRedoSharp, IoTrashSharp } from "react-icons/io5";

import InputComponent from "../../components/forms/inputs/InputComponent";
import { initialStage3 } from "../../context/initialGlobalState";
import IsContext from "../../context/IsContext";
import { checksShuntedRule, emptyInputs, getValuesOfInputs, persistDataOnLocalStorage, setValuesOfInputs, shuntedRuleResult, stage2Results } from "../../utils/functions/";

import "./batchRecordPage.css";
import LinkComponent from "../../components/links/LinkComponent";

function BatchRecordPage() {
  const { stage3, setStage3, stage2 } = useContext(IsContext);
  const [addButtonStatus, setAddButtonStatus] = useState(true);
  const [setButtonStatus, setSetButtonStatus] = useState(true);
  const [dataValue, setDataValue] = useState("");
  const [nivel1Value, setNivel1Value] = useState("");
  const [nivel2Value, setNivel2Value] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("stage3"))) setStage3(JSON.parse(localStorage.getItem("stage3")));
  }, []);

  useEffect(() => {
    if (dataValue.length > 0 && nivel1Value > 0 && nivel2Value > 0) setAddButtonStatus(false);
  }, [dataValue, nivel1Value, nivel2Value]);

  useEffect(() => {
    if (stage3.length >= 10) addNewColOnTable(shuntedRuleResult(stage3, stage2, checksShuntedRule, stage2Results(stage2)));
  }, [stage3]);

  const batches = {};

  const addNewColOnTable = (period) => {
    const line = document.querySelector(`#l-${Object.keys(period)}`);

    const newTd = document.createElement("td");
    newTd.id = `c-${Object.keys(period)}`;
    newTd.classList.add("period");

    const col = document.querySelector(`#c-${Object.keys(period)}`);

    if (col) return;

    newTd.append(Object.values(period));

    line.appendChild(newTd);
  };

  const setAddButtonStatusFunc = (event, prop) =>
    prop(event.target.value);

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
    setAddButtonStatus(true);

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
    setSetButtonStatus(true);

    persistDataOnLocalStorage("stage3", changeStage3);

    emptyInputs(["batch-date", "nivel1-result", "nivel2-result"]);
  };

  const editRegister = (id) => {
    const forEdit = stage3.filter((reg) => reg.id === id);
    
    if (forEdit.length > 0) {
      const {date, nivel1, nivel2} = forEdit[0];

      setValuesOfInputs(["batch-date", "nivel1-result", "nivel2-result"], [date, nivel1, nivel2]);

      document.querySelector(".update-button").id = id;

      setSetButtonStatus(false);
    }
  };

  const alertMinimalReg = () => stage3.length < 10
    ? (<span className="alert">* Insira pelo menos 10 resultados.</span>)
    : (<div></div>);

  const renderByConditional = () => stage3.length < 10
    ? (<span className="alert-next">Próxima Sessão</span>)
    : (<LinkComponent link={[IoArrowRedoSharp, "/batch-registration", "next-button", "next-session", "Próxima Sessão"]} />);

  const deleteRegister = (id) => {
    const forDelete = stage3.filter((reg) => reg.id !== id);

    setStage3(forDelete);

    persistDataOnLocalStorage("stage3", forDelete);
  };
  
  return (
    <div className="batch-record">
      <div className="batch-record-div">
        <div>
          <InputComponent input={["date", "batch-date",  batches["date"], "Data", setAddButtonStatusFunc, setDataValue]} />
        </div>
        <div>
          <InputComponent input={["number", "nivel1-result",  batches["nivel1"], "Nível 1", setAddButtonStatusFunc, setNivel1Value]} />
        </div>
        <div>
          <InputComponent input={["number", "nivel2-result",  batches["nivel2"], "Nível 2", setAddButtonStatusFunc, setNivel2Value]} />
        </div>
        <div>
          <Button className="register-button" onClick={() => setStage3Func()} disabled={addButtonStatus}>Adicionar</Button>
          <Button className="update-button" onClick={(event) => setStage3ById(event.target.id)} disabled={setButtonStatus}>Atualizar</Button>
        </div>
      </div>
      {alertMinimalReg()}
      <Table striped borded hover>
        <tbody>
          <tr>
            <th>Nº</th>
            <th>Data</th>
            <th>Nível 1</th>
            <th>Nível 2</th>
          </tr>
          {stage3.map(({date, nivel1, nivel2}, index) => (
            <tr key={index} id={`l-${index + 1}`}>
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
        <LinkComponent link={[IoArrowUndoSharp, "/", "back-button", "back-session", "Sessão Anterior"]} />
        {renderByConditional()}
        <LinkComponent link={[IoTrashSharp, "", "clear-button", "clear-session", "Limpar Sessão", () => {
          setStage3(initialStage3);
          persistDataOnLocalStorage("stage3", initialStage3);
        }]} />
      </div>
    </div>
  );
}

export default BatchRecordPage;