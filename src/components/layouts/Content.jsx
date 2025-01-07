// src/components/Content.jsx

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import '../../styles/Content.css';

const Content = ({route, children}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
    
        // redirect to login page
        navigate('/');
      };

    return (
        <main className="content">
            <header className="header">
                <p>Dashboards / {route}</p>
                <button onClick={handleLogout}>logout</button>
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