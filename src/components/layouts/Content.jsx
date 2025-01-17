// src/components/Content.jsx
import PropTypes from 'prop-types';
import '../../styles/Content.css';

const Content = ({route, children}) => {
    const routeParts = route.trim().split(',');
    const loginUser = localStorage.getItem('loginUser');

    return (
        <main>
            <header className="main-header">
                <p>
                    {/* <a className="head-menu" href="/dashboard">Dashboard</a> */}
                    <a className="head-menu">Dashboard</a>
                    {routeParts.map((part, index) => (
                        <span key={index}> {" / "}
                            <a className={`head-menu ${index === routeParts.length - 1 ? "menu-active" : ""}`} href={`/${part.trim()}`} >
                                {part.trim()}
                            </a>
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
    route: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Content;