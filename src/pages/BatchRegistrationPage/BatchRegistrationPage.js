import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import IsContext from "../../context/IsContext";
import NilvelsComponent from "./nivelsComponent/NivelsComponent";

import "./batchRegistrationPage.css";
import { initialStage2 } from "../../context/initialGlobalState";

function BatchRegistrationPage() {
  const { stage2, setStage2 } = useContext(IsContext);
  const { stage3, setStage3 } = useContext(IsContext);

  useEffect(() => {
    const sum1 = stage3
      .reduce((a, b) => a + Number(b.nivel1), 0);
    const sum2 = stage3
      .reduce((a, b) => a + Number(b.nivel2), 0);

    const media1 = sum1 / stage3.length;
    const media2 = sum2 / stage3.length;

    // variant calculate by population
    const variant1 = stage3.reduce((total, valor) => total + Math.pow(media1 - Number(valor.nivel1), 2)/stage3.length, 0);

    const variant2 = stage3.reduce((total, valor) => total + Math.pow(media2 - Number(valor.nivel2), 2)/stage3.length, 0);

    // standard deviation
    const dp1 = Math.sqrt(variant1).toFixed(2);
    const dp2 = Math.sqrt(variant2).toFixed(2);

    setStage2({
      nivel1: { ...stage2.nivel1, media: media1.toFixed(2), DP: dp1 },
      nivel2: { ...stage2.nivel2, media: media2.toFixed(2), DP: dp2 }
    });
  }, []);

  return (
    <div className="batchRegistration-div">
      <div className="nivels-div">
        <NilvelsComponent nivel={ ["nivel1", "Nível 1", stage2, setStage2] } />
        <NilvelsComponent nivel={ ["nivel2", "Nível 2", stage2, setStage2] } />
      </div>
      {/* link */}
      <Link to="/batch-record" id="back-button">Voltar</Link>
      <Link to="/batch-result" id="next-button">Próximo</Link>
      <Link id="clear-button" onClick={() => setStage2(initialStage2)}>Limpar</Link>
    </div>
  );
}

export default BatchRegistrationPage;