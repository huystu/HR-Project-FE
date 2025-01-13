// src/pages/ProjectDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Tabs, Select } from 'antd'

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ImgButton from '../components/ImgButton';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

import { IoMdPersonAdd } from "react-icons/io";

const ProjectDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = "Admin"; // User Name
    const columns = ["Name", "Status", "Start Date", "End Date", "Email", "Role", "Action"];

    const roleOptions = [
        {value: "Team Leader", label: "Team Leader",},
        {value: "Designer", label: "Designer",},
        {value: "Developer", label: "Developer",},
        {value: "Tester", label: "Tester",},
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };

    const data = [
        {
            Name: "Name1",
            Status: "Doing",
            "Start Date": "2024/12/30",
            "End Date": "-",
            Email: "aaa@aaa.com",
            Role: <Select defaultValue="Team Manager" onChange={handleChange} options={roleOptions} />,
            Action: ["Link", "Delete"],
        },
        {
            Name: "Name2",
            Status: "Exited",
            "Start Date": "24/12/30",
            "End Date": "25/01/05",
            Email: "aaaa@aaa.com",
            Role: <Select defaultValue="Designer" onChange={handleChange} options={roleOptions} />,
            Action: ["Link", "Delete"],
        },
    ];

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const btnsArray = [
        <Button key="update">Update Project</Button>,
        <Button key="delete">Delete Project</Button>,
    ];

    const accessToken = localStorage.getItem('token');

    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); 
        }
      }, [navigate]);

    return (
        // turn in into Project title
        <Layout user={user} route={`Projects, ${id}`}> 
            <DashboardCard
                header={`${id}`} // turn id into Project title
                btns={btnsArray}
                progress_tag="In Progress"
                date_tag="YYYY.MM.DD"
            >
                <div className="project-description">
                    Description
                    <div>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium ducimus voluptates perferendis molestias animi vitae, recusandae itaque ipsam accusamus qui officia necessitatibus, eum porro! Dolores repellat vero deleniti nam quisquam?
                    </div>
                </div>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Members" key="1">
                        <div style={{display: 'flex'}}>
                            <Table columns={columns} data={data} />
                            {/* Add Members Button */}
                            <ImgButton>
                                <IoMdPersonAdd />
                            </ImgButton>
                        </div>
                        <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />
                    </Tabs.TabPane>
                </Tabs>
            </DashboardCard>
        </Layout>
    );
};


export default ProjectDetailPage;


