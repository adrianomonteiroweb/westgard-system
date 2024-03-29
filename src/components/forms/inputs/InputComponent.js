import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "./inputComponent.css";

function InputComponent({
  input: [type = "text", id, value, nivelText, eventFunc, prop, nivel],
}) {
  return (
    <>
      <Form.Label htmlFor={`${id}`}>
        <h6>{`${nivelText}`}</h6>
      </Form.Label>
      <Form.Control
        type={`${type}`}
        placeholder={type === "date" ? "dd/mm/yyyy" : ""}
        className="input-component"
        id={`${id}`}
        value={value}
        onChange={(event) =>
          eventFunc ? eventFunc(event, prop, nivel) : undefined
        }
      />
    </>
  );
}

InputComponent.propTypes = {
  input: PropTypes,
}.isRequired;

export default InputComponent;
