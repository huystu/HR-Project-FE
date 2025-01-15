// src/components/Input.jsx
import PropTypes from 'prop-types';
import '../styles/InputField.css';
import { Select, AutoComplete } from 'antd';

const InputField = ({ label, type, name, formik, className, options, value, onSearch, onFocus, onSelect }) => {
  return (
    <div className={`input-field${className ? className:''} input-field-${type}`.trim()}>
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <Select
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
      ) : type === "autocomplete" ? (
        <AutoComplete
        // options={options.map(option => ({ value: option.value, label: option.label, key: option.key }))} // 자동완성 옵션
          options={options}
          value={value} // 상태 관리된 값을 설정
          onSearch={onSearch}
          onFocus={onFocus} // 포커스 핸들러
          onSelect={onSelect}
          onBlur={formik.handleBlur}
          style={{ width: '100%' }}
        >
          <input type="text" name={name} id={name} />
        </AutoComplete>
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
  value: PropTypes.string, // 자동완성 입력 값
  onSearch: PropTypes.func, // 상태 변경 핸들러
  onFocus: PropTypes.func, // 포커스 핸들러
  onSelect: PropTypes.func, // 필드 선택
};

InputField.defaultProps = {
  type: 'text',
  className: '',
};

export default InputField;
