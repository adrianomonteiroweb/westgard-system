import { useContext, useEffect } from "react";
import { IoArrowUndoSharp, IoArrowRedoSharp, IoTrashSharp } from "react-icons/io5";

import IsContext from "../../context/IsContext";
import NilvelsComponent from "./nivelsComponent/NivelsComponent";

import "./batchRegistrationPage.css";
import { initialStage2 } from "../../context/initialGlobalState";
import LinkComponent from "../../components/links/LinkComponent";
import { stdevFunc } from "../../utils/functions";

function BatchRegistrationPage() {
  const { stage2, setStage2, stage3 } = useContext(IsContext);

  useEffect(() => {
    const sum1 = stage3
      .slice(0, 10)
      .reduce((a, b) => a + Number(b.nivel1), 0);
    const sum2 = stage3
      .slice(0, 10)
      .reduce((a, b) => a + Number(b.nivel2), 0);
    const sum3 = stage3
      .slice(0, 10)
      .reduce((a, b) => a + Number(b.nivel3), 0);

    const media1 = sum1 / 10;
    const media2 = sum2 / 10;
    const media3 = sum3 / 10;

    // standard deviation
    const dp1 = stdevFunc(stage3.slice(0, 10), "nivel1");
    const dp2 = stdevFunc(stage3.slice(0, 10), "nivel2");
    const dp3 = stdevFunc(stage3.slice(0, 10), "nivel3");

    setStage2({
      nivel1: { ...stage2.nivel1, media: media1.toFixed(2), DP: dp1.toFixed(2) },
      nivel2: { ...stage2.nivel2, media: media2.toFixed(2), DP: dp2.toFixed(2) },
      nivel3: { ...stage2.nivel3, media: media3.toFixed(2), DP: dp3.toFixed(2) }
    });
  }, []);

  return (
    <div className="batchRegistration-div">
      <p>Personalização de valores do lote (10 primeiros dias).</p>
      <div className="nivels-div">
        <NilvelsComponent nivel={ ["nivel1", "Nível 1", stage2, setStage2] } />
        { stage2.nivel2.media > 0 && <NilvelsComponent nivel={ ["nivel2", "Nível 2", stage2, setStage2] } /> }
        { stage2.nivel3.media > 0 && <NilvelsComponent nivel={ ["nivel3", "Nível 3", stage2, setStage2] } /> }
      </div>
      {/* link */}
      <LinkComponent link={[IoArrowUndoSharp, "/batch-record", "back-button", "back-session", "Sessão Anterior"]} />
      <LinkComponent link={[IoArrowRedoSharp, "/chart", "next-button", "next-session", "Próxima Sessão", () => localStorage.setItem("stage2", JSON.stringify(stage2))]} />
      <LinkComponent link={[IoTrashSharp, "", "clear-button", "clear-session", "Limpar Sessão", () => setStage2(initialStage2)]} />
    </div>
  );
}

export default BatchRegistrationPage;