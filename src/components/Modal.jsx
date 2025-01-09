import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import '../styles/InputField.css'

const CustomModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title,
  subTitle,
  footer = null,

}) => {
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title={
        <div>
          <h2>{title}</h2>
          {subTitle && <p style={{ color: 'gray', fontSize: '14px' }}>{subTitle}</p>}
        </div>
      }
      footer={footer} // 기본 버튼 제거 또는 사용자 정의
    >
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  children: PropTypes.node,
  title: PropTypes.node,  /*string->node로 바꾸기*/
  subTitle: PropTypes.node,
  footer: PropTypes.node,
};

export default CustomModal;
