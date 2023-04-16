import { useState } from 'react';
import PropTypes from 'prop-types';

import IsContext from './IsContext';

function IsProvider({ children }) {
    const [stage1, setStage1] = useState({
        analiticSystem: '',
        test: '',
        unit: '',
        method: '',
        period: ''
    });
    const [stage2, setStage2] = useState({
        nivel1: {
            nivel1: '',
            batchNumber: 0,
            media: 100,
            DP: 2
        },
        nivel2: {
            nivel2: '',
            batchNumber: 0,
            media: 300,
            DP: 4
        }
    });

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