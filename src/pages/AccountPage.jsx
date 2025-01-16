// src/pages/AccountPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import Title from "../components/Title";
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { CopyOutlined, } from '@ant-design/icons';

import { Modal } from 'antd';

function AccountPage() {
    const navigate = useNavigate();
    const user = localStorage.getItem('loginUser'); // User Name
    const accessToken = localStorage.getItem('token');

    const [selectedAccount, setSelectedAccount] = useState(null);

    const [newPassword, setNewPassword] = useState(null);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    // Modal - Add User
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const handleAddUserOpen = () => {
        setIsAddUserModalOpen(true); // Open the modal
    };
    const handleAddUserCancel = () => {
        setIsAddUserModalOpen(false);
        formikAddUser.resetForm({ name: ' ', email: ' ', password: ' ', checkPassword: ' ' }); // Initialize form
    }

    // Modal - Reset Password
    const [isResetPWModalOpen, setIsResetPWModalOpen] = useState(false);
    const handleResetPWOpen = async (account) => {
        if (account.id === undefined) {
            alert('Please select an account');
            return;
        }
        
        setResetPWLoading(true);
        setIsResetPWModalOpen(true);

        setAuthToken(accessToken);
        try {
            const response = await api.patch(`/admin/${account.id}/reset-password`);
            
            console.log("reset password: ", response);

            const formattedData = {
                name: response.data.data.name,
                email: response.data.data.email,
                id: response.data.data.id,
            }
            setNewPassword(response.data.data.newPassword);
            setSelectedAccount(formattedData);
        }
        catch (error) {
            console.log('Failed to copy text: ', error);
            alert('Failed to copy text');
        }

        setResetPWLoading(false);
    };
    const handleResetPWModealClose = () => {
        setIsResetPWModalOpen(false);
        setNewPassword(null);
        setSelectedAccount(null);
    }
    
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [resetPWLoading, setResetPWLoading] = useState(false); // 로딩 상태

    const columns = ['Name', 'Email', 'Role', 'Action'];

    const [data, setData] = useState([]);

    const fetchData = async (page = 0, size = 10) => {
        setLoading(true);

        setAuthToken(accessToken); // 인증 토큰 설정
        try {
            const response = await api.get('/admin', {
                params: {
                    page: page,
                    size: size,
                }
            });
            console.log(response.data); //api 응답 확인

            if (response.status === 200) {
                console.log("Success Account Pagination: ", response);
                console.log(response.data.data.content);
                setPageCount(response.data.data.page.totalPages);
                
                //2. 데이터를 화면에 맞게 변환
                const formattedData = response.data.data.content.map(account => ({
                    Name: account.name,
                    Email: account.email,
                    Role: account.role,
                    Action: ["Reset"],
                    id: account.id,
                }));
                //3. 상태 업데이트
                setData(formattedData);
                setPageCount(response.data.data.page.totalPages);
            }
        }
        catch (error) {
            console.error('Error fetching account data:', error);
        }
        setLoading(false);
    };

    const formikAddUser = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            checkPassword: ""
        },
        validate: (values) => {
            const errors = {};
            if (!values.name) {
                errors.name = 'Name is required';
            }
            if (!values.email) {
                errors.email = 'Email is required';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }
            if (!values.checkPassword) {
                errors.checkPassword = 'Please confirm your password';
            }
            else if (values.password !== values.checkPassword) {
                errors.checkPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            const payload = {
                email: values.email,
                password: values.password,
                name: values.name,
            };

            setAuthToken(accessToken);
            try {
                const response = await api.post('/signup', payload);

                console.log(response.data)

                if (response.status === 200) {
                    fetchData(currentPage - 1, pageSize);
                }

                console.log(`Success Project Info: ${JSON.stringify(response)}`);
                alert("Account added successfully!");

                setIsAddUserModalOpen(false);
            }
            catch (error) {
                const errorMsg = error.response.data.message;

                if (errorMsg === 'This is a duplicate email.') {
                    // 중복 이메일 오류 설정
                    setErrors({ email: 'This email is already in use' });
                }
                else {
                    setIsAddUserModalOpen(false);
                }
                console.log('Error adding user: ', error);
            }
        },
    });

    const hanldeCopy = () => {
        alert('Text copied to clipboard!');
    }

    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); 
        }
    }, [navigate]);

    useEffect(() => {
        fetchData(currentPage - 1, pageSize);
    }, [currentPage]);

    return (
        <Layout user={user} route={`Account`}>
            {/* Add User */}
            <CustomModal 
                isModalOpen={isAddUserModalOpen}
                handleOk={formikAddUser.handleSubmit} //폼 제출
                handleCancel={handleAddUserCancel}
                title = {<Title>Add User</Title>}
                footer={
                <div className = "button-container">
                    <Button className = "btn-gray" onClick={() => setIsAddUserModalOpen(false)}>Close</Button>
                    <Button onClick={formikAddUser.handleSubmit}>Add</Button>
                </div>
                }
            >
                <form onSubmit={formikAddUser.handleSubmit}>
                    <InputField label="Name" type="text" name="name" formik={formikAddUser} />
                    <InputField label="Email" type="text" name="email" formik={formikAddUser} />
                    <InputField label="Password" type="password" name="password" formik={formikAddUser} />
                    <InputField label="Check Password" type="password" name="checkPassword" formik={formikAddUser} />
                </form>
            </CustomModal>

            {/* Reset PW */}
            <Modal
                title={ <h2><Title>Reset Password</Title></h2> }
                open={isResetPWModalOpen}
                onCancel={handleResetPWModealClose}
                footer={null} // 이 부분이 모달 하단의 버튼을 없앱니다
                loading={resetPWLoading}
                centered
            >
                <div style={{fontFamily: 'Pretendard-Regular', fontSize:"15px"}}>
                    The password for <span style={{fontFamily: 'Pretendard-SemiBold'}}>{selectedAccount?.name}({selectedAccount?.email})</span> has been reset to <span style={{color: 'red'}}>{newPassword}</span>
                    <CopyToClipboard text={newPassword} onCopy={hanldeCopy}>
                        <CopyOutlined style={{fontSize: "15px", color: '#6d6d6d', margin: "5px"}}/>
                    </CopyToClipboard>
                </div>
            </Modal>

            <DashboardCard
                header="Account"
                btn="Add User"
                btnClick={handleAddUserOpen}
                footer={<Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />}
            >
                {loading ? ( <LoadingSpinner /> ) // 로딩 중일 때 스피너 표시
                : (
                    <Table columns={columns} data={data} onResetClick={handleResetPWOpen} />
                )}
            </DashboardCard>
        </Layout>
    );
}

export default AccountPage;