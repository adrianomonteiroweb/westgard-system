import Form from 'react-bootstrap/Form';

import 'bootstrap/dist/css/bootstrap.min.css';

function InputComponent({ input: [ type = 'text', id, value, nivelText, eventFunc, nivel, prop ] }) {
    return (
        <>
            <Form.Label htmlFor={`${id}`}>{`${nivelText}`}</Form.Label>
            <Form.Control type={`${type}`} id={`${id}`} value={value} onChange={(event) => eventFunc(nivel, event, prop)}
            />
        </>
    );
}

export default InputComponent;