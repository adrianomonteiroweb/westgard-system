import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function LinkComponent({ link: [Icon, to, id, iconClass, text, func] }) {
  return (
    iconClass === "back-session"
      ? <Link to={to} id={id} onClick={func}>{<Icon className={`${iconClass}`} />}{`${text}`}</Link>
      : <Link to={to} id={id} onClick={func}>{`${text}`}{<Icon className={`${iconClass}`} />}</Link>
  );
}

LinkComponent.propTypes = {
  link: PropTypes,
}.isRequired;

export default LinkComponent;