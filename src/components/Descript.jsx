// src/components/Descript.jsx
import PropTypes from 'prop-types';
import '../styles/Descript.css'

const Descript = ({ left, link, right, link_href, align = 'left' }) => {
    return (
        <div className={`descript ${align}`}>
            {left && <span>{left}</span>}
            {link && <a href={link_href}>{link}</a>}
            {right && <span>{right}</span>}
        </div>
    )
}

Descript.propTypes = {
    left: PropTypes.string,
    link: PropTypes.string,
    right: PropTypes.string,
    link_href: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
}

export default Descript;