// src/components/ImgButton.jsx
import PropTypes from 'prop-types';
import '../styles/ImgButton.css';

const ImgButton = ({ children, onClick, type = 'button'  }) => {
  return (
    <button className={`imgbtn`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

ImgButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default ImgButton;
