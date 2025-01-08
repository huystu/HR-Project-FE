// src/components/Button.jsx
import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'enabled', disabled = false, img = false, className='' }) => {
  return (
    <button
      className={`btn-${variant} ${img ? 'btn-img' : 'btn'} ${className}`}
      /*img가 true이면 btn-img클래스가 적용, 기본적으로는 btn 클래스 적용*/
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['enabled', 'disabled']),
  disabled: PropTypes.bool,
  img: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
