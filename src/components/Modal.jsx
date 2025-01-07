import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

const CustomModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  children,
  title,
  footer = null,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title={title}
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
  title: PropTypes.string,
  footer: PropTypes.node,
};

export default CustomModal;
