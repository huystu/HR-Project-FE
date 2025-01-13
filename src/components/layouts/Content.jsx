// src/components/Content.jsx
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import '../../styles/Content.css';

const Content = ({route, children}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // redirect to login page
    };

    return (
        <main>
            <header className="main-header">
                <p><a className="head-menu" href="/dashboard">Dashboard</a> / <a className="head-menu menu-active" href={`/${route}`}>{route}</a></p>
                <button onClick={handleLogout}>logout</button>
            </header>
            <div className="main-content">
                {children}
            </div>
        </main>
    );
}

Content.propTypes = {
    route: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Content;