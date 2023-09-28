import { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  IoArrowUndoSharp,
  IoArrowRedoSharp,
  IoTrashSharp,
} from "react-icons/io5";

import InputComponent from "../../components/forms/inputs/InputComponent";
import { initialStage3 } from "../../context/initialGlobalState";
import IsContext from "../../context/IsContext";
import {
  emptyInputs,
  getValuesOfInputs,
  persistDataOnLocalStorage,
  setValuesOfInputs,
  shuntedRuleResult,
  stage2Results,
} from "../../utils/functions/";

import "./batchRecordPage.css";
import LinkComponent from "../../components/links/LinkComponent";

function BatchRecordPage() {
  const { stage3, setStage3 } = useContext(IsContext);
  const [addButtonStatus, setAddButtonStatus] = useState(false);
  const [setButtonStatus, setSetButtonStatus] = useState(false);
  const [dataValue, setDataValue] = useState("");
  const [nivel1Value, setNivel1Value] = useState("");
  const [nivel2Value, setNivel2Value] = useState("");
  const [nivel3Value, setNivel3Value] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("stage3")))
      setStage3(JSON.parse(localStorage.getItem("stage3")));
  }, []);

  useEffect(() => {
    if (
      (dataValue.length > 0 && nivel1Value > 0) ||
      nivel2Value > 0 ||
      nivel3Value > 0
    )
      setAddButtonStatus(false);
  }, [dataValue, nivel1Value, nivel2Value, nivel3Value]);

  const batches = {};

  const setAddButtonStatusFunc = (event, prop) => prop(event.target.value);

  const businessRoleForMaxTeenDays = () => {
    const allDates = stage3.map(({ date }) => new Date(date));

    const minDate = new Date(Math.min.apply(null, allDates));
    const maxDate = new Date(Math.max.apply(null, allDates));

    const minStr = `${minDate.getFullYear()}-${
      minDate.getMonth() + 1
    }-${minDate.getDate()}`;
    const maxStr = `${maxDate.getFullYear()}-${
      maxDate.getMonth() + 1
    }-${maxDate.getDate()}`;

    const diffInMinutes = new Date(maxStr) - new Date(minStr);
    const diffInDays = diffInMinutes / 10 / (100 * 60 * 60 * 24);

    return diffInDays;
  };

  const saveRegister = () => {
    const date = new Date(document.querySelector("#batch-date").value);
    const nivel1 = document.querySelector("#nivel1-result");
    const nivel2 = document.querySelector("#nivel2-result");
    const nivel3 = document.querySelector("#nivel3-result");

    const formatedDate =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

    const stage3Change = [
      ...stage3,
      {
        id: `l-${stage3.length}`,
        date: formatedDate || new Date(),
        nivel1: nivel1.value || 0,
        nivel2: nivel2.value,
        nivel3: nivel3.value,
      },
    ];

    setStage3(stage3Change);
    //setAddButtonStatus(true);

    persistDataOnLocalStorage("stage3", stage3Change);

    emptyInputs([
      "batch-date",
      "nivel1-result",
      "nivel2-result",
      "nivel3-result",
    ]);
  };

  const getTodayDate = () => {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const ano = dataAtual.getFullYear();

    return `${mes}/${dia}/${ano}`;
  };

  const saveRegisterByID = (id) => {
    const values = getValuesOfInputs([
      "batch-date",
      "nivel1-result",
      "nivel2-result",
      "nivel3-result",
    ]);

    const allStage = stage3.filter((reg, i) => i !== Number(id));

    const isId = Number(id);

    const changeStage3 = [
      ...allStage,
      {
        id: isId,
        date: values[0],
        nivel1: values[1],
        nivel2: values[2],
        nivel3: values[3],
      },
    ];

    setStage3(changeStage3);
    //setSetButtonStatus(true);

    persistDataOnLocalStorage("stage3", changeStage3);

    emptyInputs([
      "batch-date",
      "nivel1-result",
      "nivel2-result",
      "nivel3-result",
    ]);
  };

  const editRegister = (e) => {
    const index = e.target.parentNode.parentNode.id;
    const forEdit = stage3.filter((reg, i) => i === Number(index));
    console.log(forEdit);
    if (forEdit.length > 0) {
      const { date, nivel1, nivel2, nivel3 } = forEdit[0];

      setValuesOfInputs(
        ["batch-date", "nivel1-result", "nivel2-result", "nivel3-result"],
        [date, nivel1, nivel2, nivel3]
      );

      document.querySelector(".update-button").id = index;

      setSetButtonStatus(false);
    }
  };

  const deleteRegister = (e) => {
    const index = e.target.parentNode.parentNode.id;
    const new_register = stage3.filter((reg, i) => i !== Number(index));

    persistDataOnLocalStorage("stage3", new_register);

    setStage3(new_register);
  };

  return (
    <div className="batch-record">
      <div className="links-div">
        {/* link */}
        <LinkComponent
          link={[
            IoArrowUndoSharp,
            "/",
            "back-button",
            "back-session",
            "Sessão Anterior",
          ]}
        />
        <LinkComponent
          link={[
            IoArrowRedoSharp,
            "/batch-registration",
            "next-button",
            "next-session",
            "Próxima Sessão",
          ]}
        />
        <LinkComponent
          link={[
            IoTrashSharp,
            "",
            "clear-button",
            "clear-session",
            "Limpar Sessão",
            () => {
              setStage3(initialStage3);
              persistDataOnLocalStorage("stage3", initialStage3);
            },
          ]}
        />
      </div>
      <div className="batch-record-div">
        <div>
          <InputComponent
            input={[
              "date",
              "batch-date",
              batches["date"],
              "Data",
              //setAddButtonStatusFunc,
              setDataValue,
            ]}
          />
        </div>
        <div>
          <InputComponent
            input={[
              "number",
              "nivel1-result",
              batches["nivel1"],
              "Nível 1",
              //setAddButtonStatusFunc,
              setNivel1Value,
            ]}
          />
        </div>
        <div>
          <InputComponent
            input={[
              "number",
              "nivel2-result",
              batches["nivel2"],
              "Nível 2",
              //setAddButtonStatusFunc,
              setNivel2Value,
            ]}
          />
        </div>
        <div>
          <InputComponent
            input={[
              "number",
              "nivel3-result",
              batches["nivel3"],
              "Nível 3",
              //setAddButtonStatusFunc,
              setNivel3Value,
            ]}
          />
        </div>
        <div>
          <Button
            className="register-button"
            onClick={() => saveRegister()}
            disabled={addButtonStatus}
          >
            Adicionar
          </Button>
          <Button
            className="update-button"
            onClick={(event) => saveRegisterByID(event.target.id)}
            disabled={setButtonStatus}
          >
            Atualizar
          </Button>
        </div>
      </div>
      {/* {alertMinimalReg()}
      {alertMaxDaysReg()} */}
      <Table striped borded hover>
        <tbody>
          <tr>
            <th>Nº</th>
            <th>Data</th>
            <th>Nível 1</th>
            <th>Nível 2</th>
            <th>Nível 3</th>
          </tr>
          {stage3.map(({ date, nivel1, nivel2, nivel3 }, index) => (
            <tr key={index} id={`${index}`}>
              <td>{`${index + 1}`}</td>
              <td className="date-td">
                {`${new Date(date).getDate()}-${
                  new Date(date).getMonth() + 1
                }-${new Date(date).getFullYear()}`}
              </td>
              <td>{`${nivel1}`}</td>
              <td>{`${nivel2 ? nivel2 : 0}`}</td>
              <td>{`${nivel3 ? nivel3 : 0}`}</td>
              <td>
                <Button
                  className="edit-button"
                  id={`${index}`}
                  onClick={(e) => editRegister(e)}
                >
                  Editar
                </Button>
                <Button
                  className="delete-button"
                  id={`${index}`}
                  onClick={(e) => deleteRegister(e)}
                >
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BatchRecordPage;
