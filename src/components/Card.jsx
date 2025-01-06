// src/components/Card.jsx
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ header, children, }) => {
  return (
    <div className={`card`} >
      {header && <div className='left'>{header}</div>}
      {children && <div>{children}</div>}
    </div>
  );
};

Card.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node,
};

export default Card;
