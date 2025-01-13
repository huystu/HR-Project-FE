// src/components/DashboardCard.jsx
import PropTypes from 'prop-types';
import '../styles/DashboardCard.css'

import { Tag } from 'antd';

import Button from './Button';

const DashboardCard = ({ header, children, progress_tag, date_tag, btn, btnClick, footer, btns}) => {
  return (
    <div className='dashboard' >
      <div className='dashboard-header'>
        {header && <div className='left'>{header}</div>}
        {progress_tag && <Tag>{progress_tag}</Tag>}
        {date_tag && <Tag>{date_tag}</Tag>}
        {btn && <Button onClick={btnClick}>{btn}</Button>}
        {btns && <div style={{margin: 0}}>{btns}</div>}
      </div>
      {children && <div className='dashboard-content'>{children}</div>}
      {footer && <div className='dashboard-footer'>{footer}</div>}
    </div>
  );
};

DashboardCard.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  progress_tag: PropTypes.string,
  date_tag: PropTypes.string,
  btn: PropTypes.string,
  btnClick: PropTypes.func,
  footer: PropTypes.node,
  btns: PropTypes.arrayOf(PropTypes.node),
};

export default DashboardCard;
