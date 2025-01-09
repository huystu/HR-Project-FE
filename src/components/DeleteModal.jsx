import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import '../styles/InputField.css';
import '../styles/DeleteModal.css';
import CustomModal from '../components/Modal';


const DeleteModal = ({ isModalOpen, onCancel, onDelete, employee, title, subTitle, footer=null}) => {
    return (
      <CustomModal 
        isModalOpen={isModalOpen} 
        handleOk={onDelete}  // When 'OK' is pressed, delete the employee
        handleCancel={onCancel}  // When 'Cancel' is pressed, close the modal
        title={title}
        subTitle={subTitle}
        footer={footer}
        className="deletemodal"
    
      >
        {/*<p>Are you sure you want to delete {employee?.Employee}? This action cannot be undone.</p>*/}
      </CustomModal>
    );
  };
                      

DeleteModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  employee: PropTypes.node,
  title: PropTypes.string,
  subTtitle: PropTypes.node,
  footer: PropTypes.node, //node는 렌더링 가능한 모든 것을 허용하는 타입
};

export default DeleteModal;
