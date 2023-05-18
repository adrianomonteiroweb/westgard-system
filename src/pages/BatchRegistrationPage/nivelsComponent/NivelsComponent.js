import PropTypes from "react";

import InputComponent from "../../../components/forms/inputs/InputComponent";

import "./nivelsComponent.css";

function NivelsComponent({nivel: [ nivel, nivelText, stage2, setStage2 ]}) {
    
  function setPropState(event, prop, nivel) {
    nivel === "nivel1"
      ? setStage2({ nivel2: stage2.nivel2, nivel1: { ...stage2.nivel1, [prop]: event.target.value} })
      : setStage2({ nivel1: stage2.nivel1, nivel2: { ...stage2.nivel2, [prop]: event.target.value} });
  }

  return (
    <div className="nivel">
      {/* nivel input */}
      <InputComponent
        input={["text",
          "nivel",
          stage2[nivel][nivel],
          nivelText,
          setPropState,
          nivel,
          nivel]}
      />
      {/* batch number input */}
      <InputComponent
        input={["number",
          "batch",
          stage2[nivel]["batchNumber"],
          "Nº de lote",
          setPropState,
          "batchNumber",
          nivel]}
      />
      {/* media input */}
      <InputComponent
        input={["number",
          "media",
          stage2[nivel]["media"],
          "Média",
          setPropState,
          "media",
          nivel]}
      />
      {/* DP input */}
      <InputComponent input={["number",
        "DP",
        stage2[nivel]["DP"],
        "DP",
        setPropState,
        "DP",
        nivel]}
      />
    </div>
  );
}

NivelsComponent.propTypes = {
  nivel: PropTypes,
}.isRequired;

export default NivelsComponent;