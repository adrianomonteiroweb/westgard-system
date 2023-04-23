import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";

function InputComponent({ input: [ type = "text", id, value, nivelText, eventFunc, prop, nivel ] }) {
  return (
    <>
      <Form.Label htmlFor={`${id}`}>{`${nivelText}`}</Form.Label>
      <Form.Control
        type={`${type}`}
        id={`${id}`}
        value={value}
        // max={new Date().toISOString().split("T")[0]}
        onChange={(event) => eventFunc ? eventFunc(event, prop, nivel) : undefined}
      />
    </>
  );
}

InputComponent.propTypes = {
  input: PropTypes,
}.isRequired;

export default InputComponent;