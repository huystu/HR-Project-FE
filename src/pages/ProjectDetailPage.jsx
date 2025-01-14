// src/pages/ProjectDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Tabs, Select } from 'antd'

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import Title from "../components/Title";
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ImgButton from '../components/ImgButton';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
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

    // const [pageCount, setPageCount] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize] = useState(10);

    const [isModalOpen, setIsModalOpen] = useState(false);

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

                const members = response.data.data.employeesInfo;

                const formattedMembersData = members.map(member =>({
                    Name: member.employeeInfo.name,
                    Status: member.employeeProjectInfo.joinStatus,
                    "Start Date": member.employeeProjectInfo.joinDate,
                    "End Date": member.employeeProjectInfo.exitDate,
                    Email: member.employeeInfo.email,
                    Role: <Select defaultValue={`${member.employeeProjectInfo.roleInProject}`} onChange={handleChange} options={roleOptions} />,
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

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const handleAddEmployee = () => {
        setIsModalOpen(true); // Open the modal
        formik.setValues({
            title: projectInfo.title,
            description: projectInfo.description,
            status: projectInfo.status,
        }); // Initialize form
      };

    // Update Formik settings
    const formik = useFormik({
        initialValues: {
            title: projectInfo.title || '',
            description: projectInfo.description || '',
            status: projectInfo.status || '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.title) {
                errors.title = 'Title is required';
            }
            if (!values.description) {
                errors.description = 'Description is required';
            }
            if (!values.status) {
                errors.status = 'Status is required';
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log(values);

            setAuthToken(accessToken); // set accessToken

            const updatedData = {
                name: values.title,
                description: values.description,
                status: values.status,
            }
            
            try {
                const response = await api.put(`/project/${id}`, updatedData);

                if (response.status === 200) {
                    alert("Project Info Updated successfully!");
                    setIsModalOpen(false);
                    fetchData();
                }
            } catch (error) {
                console.error("Error adding employee:", error);
                alert("Failed to add employee. Please try again.");
            }
        },
    });

    const handleChange = (value) => {
        formik.setFieldValue('status', value);
    };

    const btnsArray = [
        <Button key="update" onClick={handleAddEmployee}>Update Project</Button>,
        <Button key="delete">Delete Project</Button>,
    ];

    const projectStatusOptions = [
        {value: "PENDING", label: "PENDING",},
        {value: "WORKING", label: "WORKING",},
        {value: "COMPLETE", label: "COMPLETE",},
    ];

    return (
        // turn in into Project title
        <Layout user={user} route={`Projects, ${projectInfo.title}`}>
            {/* Update Project  */}
            <CustomModal
                isModalOpen={isModalOpen}
                handleOk={formik.handleSubmit} //폼 제출
                handleCancel={handleCancel}
                title = {<Title>Update Project</Title>}
                footer={
                    <div className = "button-container">
                        <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Close</Button>
                        <Button onClick={formik.handleSubmit}>Update</Button>
                    </div>
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <InputField label="Title" type="text" name="title" formik={formik} />
                    <InputField label="Description" type="textarea" name="description" formik={formik} />
                    <div>
                        <p>Status</p>
                        <Select id="status" defaultValue={`${projectInfo.status}`} onChange={handleChange} options={projectStatusOptions} />
                    </div>
                </form>
            </CustomModal>
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


