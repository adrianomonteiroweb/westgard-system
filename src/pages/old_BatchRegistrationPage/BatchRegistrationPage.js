import { useContext, useEffect } from "react";
import {
  IoArrowUndoSharp,
  IoArrowRedoSharp,
  IoTrashSharp,
} from "react-icons/io5";
import * as math from "mathjs";

import IsContext from "../../context/IsContext";
import { initialStage2 } from "../../context/initialGlobalState";

import NilvelsComponent from "./nivelsComponent/NivelsComponent";
import LinkComponent from "../../components/links/LinkComponent";

import { mediaCalculate } from "../../utils/functions";

import "./batchRegistrationPage.css";

function BatchRegistrationPage() {
  const { stage2, setStage2, stage3 } = useContext(IsContext);

  useEffect(() => {
    const media1 = mediaCalculate(stage3.slice(0, 10) || 0, "nivel1");
    const media2 = mediaCalculate(stage3.slice(0, 10) || 0, "nivel2");
    const media3 = mediaCalculate(stage3.slice(0, 10) || 0, "nivel3");

    // standard deviation
    const dp1 = math.std(stage3.slice(0, 10).map((item) => item.nivel1) || 0);
    const dp2 = math.std(stage3.slice(0, 10).map((item) => item.nivel2) || 0);
    const dp3 = math.std(stage3.slice(0, 10).map((item) => item.nivel3) || 0);

    setStage2({
      nivel1: {
        ...stage2.nivel1,
        mediaTenDays: media1.toFixed(2),
        DPTenDays: dp1.toFixed(2),
      },
      nivel2: {
        ...stage2.nivel2,
        mediaTenDays: media2.toFixed(2),
        DPTenDays: dp2.toFixed(2),
      },
      nivel3: {
        ...stage2.nivel3,
        mediaTenDays: media3.toFixed(2),
        DPTenDays: dp3.toFixed(2),
      },
    });
  }, []);

  return (
    <div className="batchRegistration-div">
      <p>Personalização de valores do lote (10 primeiros dias).</p>
      <div className="nivels-div">
        <NilvelsComponent nivel={["nivel1", "Nível 1", stage2, setStage2]} />
        {stage2.nivel2.mediaTenDays > 0 && (
          <NilvelsComponent nivel={["nivel2", "Nível 2", stage2, setStage2]} />
        )}
        {stage2.nivel3.mediaTenDays > 0 && (
          <NilvelsComponent nivel={["nivel3", "Nível 3", stage2, setStage2]} />
        )}
      </div>
      {/* link */}
      <LinkComponent
        link={[
          IoArrowUndoSharp,
          "/batch-record",
          "back-button",
          "back-session",
          "Sessão Anterior",
        ]}
      />
      <LinkComponent
        link={[
          IoArrowRedoSharp,
          "/chart",
          "next-button",
          "next-session",
          "Próxima Sessão",
          () => localStorage.setItem("stage2", JSON.stringify(stage2)),
        ]}
      />
      <LinkComponent
        link={[
          IoTrashSharp,
          "",
          "clear-button",
          "clear-session",
          "Limpar Sessão",
          () => setStage2(initialStage2),
        ]}
      />
    </div>
  );
}

export default BatchRegistrationPage;
