import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Input.css'; // 스타일 파일 연결 (선택 사항)

const Input = ({ label, type, name }) => {
    return (
        <div className="input">
            {label && <label htmlFor={name} className="input">{label}</label>}
            <input
                id={name}
                type={type}
                name={name}
            />
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,        // 입력 필드의 라벨
    type: PropTypes.string.isRequired, // 입력 필드 타입 (text, email, password 등)
    name: PropTypes.string.isRequired, // 입력 필드의 이름 (formik과 연결)
};

Input.defaultProps = {
    type: 'text',
};

export default Input;