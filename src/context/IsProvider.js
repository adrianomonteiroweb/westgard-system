import { useState } from 'react';
import PropTypes from 'prop-types';

import IsContext from './IsContext';
import { initialStage1, initialStage2 } from './initialGlobalState';

function IsProvider({ children }) {
    const [stage1, setStage1] = useState(initialStage1);
    const [stage2, setStage2] = useState(initialStage2);

    const contextValue = {
        stage1,
        setStage1,
        stage2,
        setStage2
    };

    return (
        <IsContext.Provider value={contextValue}>
            {children}
        </IsContext.Provider>
    );
}

IsProvider.propTypes = {
    children: PropTypes.shape(),
}.isRequired;

export default IsProvider;