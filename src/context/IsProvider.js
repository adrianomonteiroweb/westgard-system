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

    const contextValue = {
        stage1,
        setStage1
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