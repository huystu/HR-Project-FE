// src/pages/ProjectDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Tabs, Select, Tag } from 'antd'

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
    const navigate = useNavigate();

    const { id } = useParams(); // Project ID
    const user = "Admin"; // User Name

    // Loading
    const [loading, setLoading] = useState(false);

    // Project Info
    const [projectInfo, setProjectInfo] = useState({});

    // Members Info
    const columns = ["Name", "Status", "Start Date", "End Date", "Email", "Role", "Action"];
    const [members, setMembers] = useState([]);
    const roleOptions = [ // Member's Roles
        { value: 'TEAM_LEADER', label: 'TEAM_LEADER' },
        { value: 'DESIGNER', label: 'DESIGNER' },
        { value: 'FE_DEVELOPER', label: 'FE_DEVELOPER' },
        { value: 'BE_DEVELOPER', label: 'BE_DEVELOPER' },
        { value: 'AI_ENGINEER', label: 'AI_ENGINEER' },
        { value: 'TESTER', label: 'TESTER' },
    ];

    // Modal - Update Project
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const handleUpdateCancel = () => {
        setIsUpdateModalOpen(false);
    }
    // Modal - Add Member
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    // Token
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

    // Dashboard에 들어갈 정보
    const fetchData = async () => {
        setAuthToken(accessToken); // set the accessToken
        setLoading(true); // 정보 받아 오기 전까지 스피너

        try {
            const response = await api.get(`/project/${id}/detail`);

            if (response.status === 200) {
                console.log("Success Project Detail: ", response.data.data);

                // 프로젝트 정보
                const projectInfo = response.data.data.projectInfo;
                const formattedProjectData = {
                    title: projectInfo.name,
                    description: projectInfo.description,
                    period: formatPeriod(projectInfo.startDate, projectInfo.endDate),
                    status: projectInfo.status,
                    id: projectInfo.id,
                }
                setProjectInfo(formattedProjectData);

                // 프로젝트 참여 멤버 정보
                const members = response.data.data.employeesInfo;
                const formattedMembersData = members.map(member =>({
                    Name: member.employeeInfo.name,
                    Status: <Tag color="blue"><div onClick={handleClickMemberStatus}>{member.employeeProjectInfo.joinStatus}</div></Tag>,
                    "Start Date": member.employeeProjectInfo.joinDate,
                    "End Date": member.employeeProjectInfo.exitDate,
                    Email: member.employeeInfo.email,
                    Role: <Select defaultValue={`${member.employeeProjectInfo.roleInProject}`} onChange={(value) => handleMemberRoleChange(value, member.employeeInfo.id)} options={roleOptions} />,
                    Action: ['Link', 'Delete'],
                    id: member.employeeInfo.id,
                }));
                setMembers(formattedMembersData);
            }
        }
        catch (error) {
            console.error('Error fetching employee data:', error);
        }

        setLoading(false); // 정보 받아 오면 로딩 정지
    };
    useEffect(() => {fetchData();}, []); // 컴포넌트가 마운트 될 때만 실행
    
    // Update Project
    // Dashboard 버튼 onClick - update project
    const handleUpdateProject = () => {
        setIsUpdateModalOpen(true); // Open the modal
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
                    setIsUpdateModalOpen(false);
                    fetchData();
                }
            } catch (error) {
                console.error("Error adding employee:", error);
                alert("Failed to add employee. Please try again.");
            }
        },
    });
    // Update Project's Status
    const handleProjectStatusChange = (value) => {
        formik.setFieldValue('status', value);
    };
    
    // Add Member
    const [addMemberId, setAddMemberId] = useState();
    const [inputValue, setInputValue] = useState('');
    const [addMemberOptions, setAddMemberOptions] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    // 모든 멤버 불러오기: add member의 option으로 제공
    const fetchAllMember = async () => {
        setAuthToken(accessToken); // set accessToken
        const response = await api.get('/employee/all');
        if (response.status === 200) {
            const members = response.data.data;
            console.log("Load Members", members);
            // { value: 'Asdkj Zasdf', label: 'Asdkj Zasdf' },
            const formattedData = members.map(employee => (
                {
                    value: employee.name,
                    label: employee.name,
                    key: employee.employeeId,
                }
            ));
            setAllMembers(formattedData);
        }
    }
    // Open AddMember Modal
    const handleAddMember = () => {
        setIsAddMemberModalOpen(true);
        fetchAllMember();
        formikAddMember.resetForm( { name: ' ', role: ' ' } );
        setInputValue('');
    }
    // Close AddMember Modal
    const handleAddMemberCancel = () => {
        setIsAddMemberModalOpen(false);
    }

    // onSelect: 사용자가 옵션을 선택시 호출
    const handelAddMemberSelect = (value, option) => {
        setInputValue(value);
        formikAddMember.setFieldValue('name', value);
        setAddMemberId(option.key);
    }

    // onSearch: 입력 필드에서 검색 수행 시 호출
    const handelAddMemberSearch = (value) => {
        setInputValue(value);
        
        const filtered = allMembers.filter(member =>
            member.value.toLowerCase().includes(value.toLowerCase())
        );

        console.log('Filtered Members:', filtered);
        
        setAddMemberOptions(filtered);

        console.log(addMemberOptions);
    };
    
    // onFocus: 입력창 포커스 될 때 호출
    const handleAddMemberFocus = () => {
        if (!inputValue) {
            setAddMemberOptions(allMembers);
        }
        console.log("handleAddMemberFocus: ", addMemberOptions);
    };

    // Add Members Formik settings
    const formikAddMember = useFormik({
        initialValues: {
            name: '',
            role: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.role) {
                errors.role = 'Role is required';
            }
            return errors;
        },
        onSubmit: async (values) => {
            console.log('Form Values:', values);
            console.log('Selected Member ID:', addMemberId);

            setAuthToken(accessToken); // set accessToken
            
            try {
                const response = await api.post(`/project/${id}/employee`, [{
                    employeeId: addMemberId,
                    role: values.role,
                    contribution: '',
                }]);

                if (response.status === 200) {
                    alert("Member Added successfully!");
                    setIsAddMemberModalOpen(false);
                    fetchData();
                }
            } catch (error) {
                console.error("Error adding employee:", error);
                alert("Failed to add employee. Please try again.");
            }
        },
    });
    
    // Update Member's Role
    const handleMemberRoleChange = async (value, employeeId) => {
        console.log('Selected Role:', value);
        console.log('Member ID:', employeeId);

        setAuthToken(accessToken); // set accessToken
        const updatedData = { role: value, }

        try {
            const response = await api.put(`/project/${id}/employee/${employeeId}/role`, updatedData);
            if (response.status === 200) {
                alert(`${employeeId}'s role updated successfully!`);
                fetchData();
            }
        } catch (error) {
            console.error("Error updating member's role:", error);
            alert("Failed to change member's role. Please try again.");
        }
    };

    // Update Member's Status
    const handleClickMemberStatus = () => {
        
    }

    const btnsArray = [
        <Button key="update" onClick={handleUpdateProject}>Update Project</Button>,
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
                isModalOpen={isUpdateModalOpen}
                handleOk={formik.handleSubmit} //폼 제출
                handleCancel={handleUpdateCancel}
                title = {<Title>Update Project</Title>}
                footer={
                    <div className = "button-container">
                        <Button className = "btn-gray" onClick={() => setIsUpdateModalOpen(false)}>Close</Button>
                        <Button onClick={formik.handleSubmit}>Update</Button>
                    </div>
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <InputField label="Title" type="text" name="title" formik={formik} />
                    <InputField label="Description" type="textarea" name="description" formik={formik} />
                    <div>
                        <p>Status</p>
                        <Select id="status" defaultValue={`${projectInfo.status}`} onChange={handleProjectStatusChange} options={projectStatusOptions} />
                    </div>
                </form>
            </CustomModal>
            
            {/* Add Member  */}
            <CustomModal
                isModalOpen={isAddMemberModalOpen}
                handleOk={formikAddMember.handleSubmit} //폼 제출
                handleCancel={handleAddMemberCancel}
                title = {<Title>Add Member</Title>}
                footer={
                    <div className = "button-container">
                        <Button className = "btn-gray" onClick={() => setIsAddMemberModalOpen(false)}>Close</Button>
                        <Button onClick={formikAddMember.handleSubmit}>Update</Button>
                    </div>
                }
            >
                <form onSubmit={formikAddMember.handleSubmit}>
                    <InputField
                        label="Name"
                        type="autocomplete"
                        name="name"
                        formik={formikAddMember}
                        options={addMemberOptions}
                        value={inputValue}
                        onSearch={handelAddMemberSearch}
                        onFocus={handleAddMemberFocus}
                        onSelect={handelAddMemberSelect}
                    />
                    <InputField label="Role" type="select" name="role" formik={formikAddMember} options={roleOptions} />
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
                            <ImgButton onClick={handleAddMember}>
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


