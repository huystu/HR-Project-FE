// src/components/Button.jsx
import PropTypes from 'prop-types';
import '../styles/Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'enabled', disabled = false, img = false }) => {
  return (
    <button
      className={`btn-${variant} ${img ? 'btn-img' : 'btn'}`}
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
};

Button.defaultProps = {
  type: 'button',
  variant: 'enabled',
  disabled: false,
  img: false,
};

export default Button;
