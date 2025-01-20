// src/components/Content.jsx
import PropTypes from 'prop-types';
import '../../styles/Content.css';

const Content = ({route='', children}) => {
    const routeParts = route.trim().split(',').filter(part => part);
    const loginUser = localStorage.getItem('loginUser');

    return (
        <main>
            <header className="main-header">
                <p>
                    <a className={`head-menu ${routeParts.length === 0 ? "menu-active" : ""}`} href="/dashboard">Dashboard</a>
                        {routeParts.length > 0 && routeParts.map((part, index) => (
                            <span key={index}> {" / "} <a className={`head-menu ${index === routeParts.length - 1 ? "menu-active" : ""}`} href={`/${part.trim()}`}> {part.trim()} </a>
                            </span>
                        ))}
                </p>
                <p style={{color: 'black'}}>Hi, {loginUser} 👋</p>
            </header>
            <div className="main-content">
                {children}
            </div>
        </main>
    );
}

Content.propTypes = {
    route: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default Content;