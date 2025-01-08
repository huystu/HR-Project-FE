// src/components/DashboardCard.jsx
import PropTypes from 'prop-types';
import '../styles/DashboardCard.css'

import Button from './Button';

const DashboardCard = ({ header, children, btn, btnClick, footer}) => {
  return (
    <div className='dashboard' >
      <div className='dashboard-header'>
        {header && <div className='left'>{header}</div>}
        {btn && <Button onClick={btnClick}>{btn}</Button>}
      </div>
      {children && <div className='dashboard-content'>{children}</div>}
      {footer && <div className='dashboard-footer'>{footer}</div>}
    </div>
  );
};

DashboardCard.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  btn: PropTypes.string,
  btnClick: PropTypes.func,
  footer: PropTypes.node,
};

export default DashboardCard;
