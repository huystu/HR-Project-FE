// src/components/Title.jsx
import PropTypes from 'prop-types';
import '../styles/Title.css';

const Title = ({ children, desc }) => {
    return(
        <>
        <div className="title">
            {children}
        </div>
        {desc}
        </>
    )
};

Title.propTypes = {
    children: PropTypes.string.isRequired,
    desc: PropTypes.string,
}

export default Title;