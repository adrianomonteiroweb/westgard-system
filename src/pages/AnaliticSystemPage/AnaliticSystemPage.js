import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoArrowRedoSharp, IoTrashSharp } from "react-icons/io5";

import IsContext from "../../context/IsContext";

import { initialStage1 } from "../../context/initialGlobalState";
import InputComponent from "../../components/forms/inputs/InputComponent";

import "./analiticSystemPage.css";
import LinkComponent from "../../components/links/LinkComponent";

function AnaliticSystemPage() {
  const { stage1, setStage1 } = useContext(IsContext);

  const setStage1Func = (event, prop) =>
    setStage1({...stage1, [prop]: event.target.value });

  const stage1Persist = () => localStorage.setItem("stage1", JSON.stringify(stage1));

  return (
    <div className="analiticSystem-div">
      {/* analitic input */}
      <InputComponent input={["text", "analiticSystem", stage1.analiticSystem, "Sistema Analítico", setStage1Func, "analiticSystem"]} />
      {/* test input */}
      <InputComponent input={["text", "test", stage1.test, "Teste", setStage1Func, "test"]} />
      {/* unit input */}
      <InputComponent input={["text", "unit", stage1.unit, "Unidade", setStage1Func, "unit"]} />
      {/* method input */}
      <InputComponent input={["text", "method", stage1.method, "Método", setStage1Func, "method"]} />
      {/* period input */}
      <InputComponent input={["date", "period", stage1.period, "Período", setStage1Func, "period"]} />
      {/* link */}
      <LinkComponent link={[IoArrowRedoSharp, "/batch-record", "next-button", "next-session", "Próxima Sessão", () => stage1Persist()]} />
      <LinkComponent link={[IoTrashSharp, "", "clear-button", "clear-session", "Limpar Sessão", () => 
        setStage1(initialStage1)]} />
    </div>
  );
}
  
export default AnaliticSystemPage;