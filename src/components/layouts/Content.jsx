// src/components/Content.jsx

import PropTypes from 'prop-types';
import '../../styles/Content.css';

const Content = ({route, children}) => {
    return (
        <main className="content">
            <header className="header">
                <p>Dashboards / {route}</p>
            </header>
            {children}
        </main>
    );
}

Content.propTypes = {
    route: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Content;