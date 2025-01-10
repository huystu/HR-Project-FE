// src/components/Nav.jsx
import PropTypes from 'prop-types';
import '../../styles/Sidebar.css'

import { AiOutlineRight } from "react-icons/ai";

const Sidebar = ({user})=> {
    return (
        <>
            <aside className="sidebar">
                <div className="user">{user}</div>
                <nav>
                    <p><a className="menu" href="/dashboards">Dashboards</a></p>
                    <p><AiOutlineRight /><a className="menu" href="/employee">Employees</a></p>
                    <p><AiOutlineRight /><a className="menu" href="/project">Projects</a></p>
                </nav>
            </aside>
        </>
    )
}

Sidebar.propTypes = {
    user: PropTypes.string.isRequired,
}

export default Sidebar;