// src/components/Nav.jsx
import PropTypes from 'prop-types';
import '../../styles/Sidebar.css'
import { useNavigate } from 'react-router-dom';

import { LogoutOutlined, } from '@ant-design/icons';
import ImgButton from '../ImgButton';

const Sidebar = ({user})=> {
    const isSuperAdmin = localStorage.getItem('loginUserRole') === 'SUPER_ADMIN';

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginUser');
        localStorage.removeItem('loginUserId');
        localStorage.removeItem('loginUserEmail');
        localStorage.removeItem('loginUserRole');
        navigate('/'); // redirect to login page
    };

    const handleProfileClick = () => {
        navigate("/profile")
    };

    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-upper">
                    <div className="logo">LOGO</div>
                    <nav>
                        {/* <p><a className="menu" href="/dashboard">Dashboard</a></p> */}
                        <p><a className="menu">Dashboard</a></p>
                        <p>&gt; <a className="menu" href="/employees">Employees</a></p>
                        <p>&gt; <a className="menu" href="/projects">Projects</a></p>
                        {isSuperAdmin ? (<p>&gt; <a className="menu" href="/account">Account</a></p>) : <></>}
                    </nav>
                </div>
                <div className="sidebar-bottom">
                    <hr className="sidebar-hr"/>
                    <div className='access-profile'>
                        <div className='username'>
                            <button onClick={handleProfileClick}>
                                {user}
                            </button>
                        </div>
                        <span className="logout">
                            <ImgButton onClick={handleLogout}>
                                <LogoutOutlined />
                            </ImgButton>
                        </span>
                    </div>
                </div>
            </aside>
        </>
    )
}

Sidebar.propTypes = {
    user: PropTypes.string.isRequired,
}

export default Sidebar;