import { useContext } from "react";
import { Link } from "react-router-dom";

import IsContext from "../../context/IsContext";

import { initialStage1 } from "../../context/initialGlobalState";
import InputComponent from "../../components/forms/inputs/InputComponent";

import "./analiticSystemPage.css";

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
      <Link to="/batch-record" id="next-button" onClick={() => stage1Persist()}>Próxima Sessão</Link>
      <Link id="clear-button" onClick={() => setStage1(initialStage1)}>Limpar Sessão</Link>
    </div>
  );
}
  
export default AnaliticSystemPage;