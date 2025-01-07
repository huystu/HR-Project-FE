// src/components/DashboardCard.jsx
import PropTypes from 'prop-types';
import '../styles/DashboardCard.css'

import Button from './Button';

const DashboardCard = ({ header, children, btn, btnClick, }) => {
  return (
    <div className='dashboard' >
      <div className='dashboard-header'>
        {header && <div className='left'>{header}</div>}
        {btn && <Button onClick={btnClick}>{btn}</Button>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

DashboardCard.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  btn: PropTypes.string,
  btnClick: PropTypes.func,
};

export default DashboardCard;
