// src/components/Nav.jsx
import PropTypes from 'prop-types';
import '../../styles/Sidebar.css'

const Sidebar = ({user})=> {
    return (
        <>
            <aside className="sidebar">
                <div className="user">{user}</div>
                <nav>
                    <p><a className="menu" href="/dashboard">Dashboard</a></p>
                    <p>&gt; <a className="menu" href="/employees">Employees</a></p>
                    <p>&gt; <a className="menu" href="/projects">Projects</a></p>
                </nav>
            </aside>
        </>
    )
}

Sidebar.propTypes = {
    user: PropTypes.string.isRequired,
}

export default Sidebar;