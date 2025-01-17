// src/components/Content.jsx
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import '../../styles/Content.css';

const Content = ({route, children}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('loginUserId');
        localStorage.removeItem('loginUserEmial');
        localStorage.removeItem('loginUserRole');
        navigate('/'); // redirect to login page
    };

    const routeParts = route.trim().split(',');

    return (
        <main>
            <header className="main-header">
                <p>
                    <a className="head-menu" href="/dashboard">Dashboard</a>
                    {routeParts.map((part, index) => (
                        <span key={index}> {" / "}
                            <a className={`head-menu ${index === routeParts.length - 1 ? "menu-active" : ""}`} href={`/${part.trim()}`} >
                                {part.trim()}
                            </a>
                        </span>
                    ))}
                </p>
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