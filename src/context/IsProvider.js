import { useState } from "react";
import PropTypes from "prop-types";

import IsContext from "./IsContext";
import { initialStage1, initialStage2, initialStage3 } from "./initialGlobalState";

function IsProvider({ children }) {
  const stage1LocalStorage = JSON.parse(localStorage.getItem("stage1"));
  const stage2LocalStorage = JSON.parse(localStorage.getItem("stage2"));
  const stage3LocalStorage = JSON.parse(localStorage.getItem("stage3"));

  const [stage1, setStage1] = useState(stage1LocalStorage || initialStage1);
  const [stage2, setStage2] = useState(stage2LocalStorage || initialStage2);
  const [stage3, setStage3] = useState(stage3LocalStorage || initialStage3);

  const contextValue = {
    stage1,
    setStage1,
    stage2,
    setStage2,
    stage3,
    setStage3
  };

  return (
    <IsContext.Provider value={contextValue}>
      {children}
    </IsContext.Provider>
  );
}

IsProvider.propTypes = {
  children: PropTypes,
}.isRequired;

export default IsProvider;