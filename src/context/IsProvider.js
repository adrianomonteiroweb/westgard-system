import { useState } from "react";
import PropTypes from "prop-types";

import IsContext from "./IsContext";

function IsProvider({ children }) {
  const initial_state = {
    1: { analysis: {}, batch: {}, values: [] },
    2: { analysis: {}, batch: {}, values: [] },
    3: { analysis: {}, batch: {}, values: [] },
    4: { analysis: {}, batch: {}, values: [] },
    5: { analysis: {}, batch: {}, values: [] },
    6: { analysis: {}, batch: {}, values: [] },
    7: { analysis: {}, batch: {}, values: [] },
    8: { analysis: {}, batch: {}, values: [] },
    9: { analysis: {}, batch: {}, values: [] },
    10: { analysis: {}, batch: {}, values: [] },
    11: { analysis: {}, batch: {}, values: [] },
    12: { analysis: {}, batch: {}, values: [] },
  };

  const laac_state = JSON.parse(localStorage.getItem("laac_state"));
  const laac_period = JSON.parse(localStorage.getItem("laac_period"));

  const [laacState, setLaacState] = useState(laac_state || initial_state);
  const [laacPeriod, setLaacPeriod] = useState(laac_period || 1);

  if (!laac_state) {
    localStorage.setItem("laac_state", JSON.stringify(initial_state));
  }

  if (!laac_period) {
    localStorage.setItem("laac_period", JSON.stringify(1));
  }

  const contextValue = {
    laacState,
    setLaacState,
    laacPeriod,
    setLaacPeriod,
  };

  return (
    <IsContext.Provider value={contextValue}>{children}</IsContext.Provider>
  );
}

IsProvider.propTypes = {
  children: PropTypes,
}.isRequired;

export default IsProvider;
