// src/components/Input.jsx
import PropTypes from 'prop-types';
import '../styles/InputField.css'
import { Select } from "antd";

const InputField = ({ label, type, name, formik, className, options}) => {
    return (
      <div className={`input-field ${className ? '-' : className}`.trim()}>
        <label htmlFor={name}>{label}</label>
        {type === "select" ? (
           <Select
           //type={type}
           name={name}
           id={name}
           onChange={(value) => formik.setFieldValue(name, value)}  // Formik의 setFieldValue로 값 설정
           onBlur={formik.handleBlur}
           placeholder={`Select ${label}`}
         >
        {options && options.map((option, index) => (
          <Select.Option key={index} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
        </Select>
        ) : (       
          <input
          type={type}
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
        )}
        
        {formik.touched[name] && formik.errors[name] ? (
          <div className="msg">{formik.errors[name]}</div>
        ) : <div className="msg"></div>}
      </div>
    );
};

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired, //formik 객체는 필수로 전달되어야 함
    className: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired, // 드롭다운에 표시될 텍스트
        value: PropTypes.string.isRequired, // 드롭다운 옵션 값
      })
    ), // options는 드롭다운일 경우 사용
};

InputField.defaultProps = {
    type: 'text',
    className: '',
};

export default InputField;