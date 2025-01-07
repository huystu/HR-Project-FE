// src/components/Skill.jsx

import PropTypes from 'prop-types';
import '../styles/Skill.css';

const Skill = ({skill}) => {
    return (
        <div className="skill-container">
            {skill}
        </div>
    );
}

Skill.propTypes = {
    skill: PropTypes.string.isRequired,
}

export default Skill;