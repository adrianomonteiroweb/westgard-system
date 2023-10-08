import { useState } from "react";
import PropTypes from "prop-types";

import IsContext from "./IsContext";

function IsProvider({ children }) {
  const initial_state = {
    1: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    2: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    3: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    4: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    5: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    6: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    7: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    8: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    9: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    10: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    11: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
    12: { historicoDados: {}, lotesDados: {}, analisesDados: [] },
  };

  const laac = JSON.parse(localStorage.getItem("laac"));

  const [period, setPeriod] = useState(laac || initial_state);

  if (!laac) {
    localStorage.setItem("laac", JSON.stringify(initial_state));
  }

  const contextValue = {
    period,
    setPeriod,
  };

  return (
    <IsContext.Provider value={contextValue}>{children}</IsContext.Provider>
  );
}

IsProvider.propTypes = {
  children: PropTypes,
}.isRequired;

export default IsProvider;
