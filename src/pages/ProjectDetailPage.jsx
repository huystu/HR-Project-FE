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

    const [loading, setLoading] = useState(false); // 로딩 상태

    const user = "Admin"; // User Name

    // Project Info
    const [projectInfo, setProjectInfo] = useState({});

    // Members info
    const columns = ["Name", "Status", "Start Date", "End Date", "Email", "Role", "Action"];
    const [members, setMembers] = useState([]);


    const roleOptions = [
        {value: "Team Leader", label: "Team Leader",},
        {value: "Designer", label: "Designer",},
        {value: "Developer", label: "Developer",},
        {value: "Tester", label: "Tester",},
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // const [pageCount, setPageCount] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize] = useState(10);

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

    const formatPeriod = (startDate, endDate) => {
        if (endDate) {
            return `${startDate} - ${endDate}`;
        }
        else {
            return `${startDate} - `;
        }
    };

    // Fetch data from API
    const fetchData = async () => {
        setAuthToken(accessToken); // set the accessToken

        setLoading(true);

        try {
            const response = await api.get(`/project/${id}/detail`);

            if (response.status === 200) {
                console.log("Success Project Detail: ", response);
                console.log(response.data.data);

                const projectInfo = response.data.data.projectInfo;

                const formattedProjectData = {
                    title: projectInfo.name,
                    description: projectInfo.description,
                    period: formatPeriod(projectInfo.startDate, projectInfo.endDate),
                    status: projectInfo.status,
                    id: projectInfo.id,
                }

                setProjectInfo(formattedProjectData);

                const members = response.data.data.employees;

                const formattedMembersData = members.map(member =>({
                    Name: member.name,
                    // Status: member.status,
                    // "Start Date": member.startDate,
                    // "End Date": member.endDate,
                    Email: member.email,
                    Role: <Select defaultValue={`${member.roleInProject}`} onChange={handleChange} options={roleOptions} />,
                    Action: ['Link', 'Delete'],
                    id: member.id,
                }));
                setMembers(formattedMembersData);
            }
        }
        catch (error) {
            console.error('Error fetching employee data:', error);
        }

        setLoading(false);
    };

    useEffect(() => {fetchData();}, []);

    return (
        // turn in into Project title
        <Layout user={user} route={`Projects, ${projectInfo.title}`}>
            {loading ? ( <LoadingSpinner /> ) // 로딩 중일 때 스피너 표시
                : (
            <DashboardCard
                header={`${projectInfo.title}`}
                btns={btnsArray}
                progress_tag={`${projectInfo.status}`}
                date_tag={`${projectInfo.period}`}
            >
                <div className="project-description">
                    Description
                    <div>
                        {projectInfo.description}
                    </div>
                </div>
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Members" key="1">
                        <div style={{display: 'flex'}}>
                            <Table columns={columns} data={members} />
                            {/* Add Members Button */}
                            <ImgButton>
                                <IoMdPersonAdd />
                            </ImgButton>
                        </div>
                        {/* <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} /> */}
                    </Tabs.TabPane>
                </Tabs>
            </DashboardCard> )}
        </Layout>
    );
};


export default ProjectDetailPage;


