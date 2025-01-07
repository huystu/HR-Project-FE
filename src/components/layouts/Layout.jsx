// src/pages/Layout.jsx
import PropTypes from "prop-types";
import "../../styles/Layout.css";

import Sidebar from "./Sidebar";
import Content from "./Content";

const Layout = ({ children, user, route }) => {
  return (
    <div className="layout">
        <Sidebar user={user} />
        <Content route={route}>{children}</Content>
    </div>
  );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    user: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
  };

export default Layout;
