// src/components/Input.jsx
import PropTypes from 'prop-types';
import '../styles/InputField.css'

const InputField = ({ label, type, name, formik, className }) => {
    return (
      <div className={`input-field ${className ? '-' : className}`.trim()}>
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          name={name}
          id={name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
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
};

InputField.defaultProps = {
    type: 'text',
    className: '',
};

export default InputField;