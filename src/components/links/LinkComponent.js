import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function LinkComponent({ link: [Icon, to, id, iconClass, text] }) {
  return (
    <Link to={to} id={id}>{<Icon className={`${iconClass}`} />}{`${text}`}</Link>
  );
}

LinkComponent.propTypes = {
  link: PropTypes,
}.isRequired;

export default LinkComponent;