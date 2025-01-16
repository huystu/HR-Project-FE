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

function AccountPage() {
    const navigate = useNavigate();
    const user = localStorage.getItem('loginUser'); // User Name
    const accessToken = localStorage.getItem('token');

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    // Modal - Add User
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => {
        setIsModalOpen(true); // Open the modal
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        formik.resetForm(
            { name: ' ', email: ' ', password: ' ', checkPassword: ' ' }
        ); // Initialize form
    }
    
    const [loading, setLoading] = useState(false); // 로딩 상태

    const columns = ['Name', 'Email', 'Role', 'Action'];

    const data = [
        {
            Name: 'Jihyeon Lee',
            Email: 'gee9328@gmail.com',
            Role: 'Admin',
            Action: ["Reset"],
        }
    ];

    const formik = useFormik({
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
        onSubmit: async (values) => {
            const payload = {
                email: values.email,
                password: values.password,
                name: values.name,
            };
        },
    });

    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); 
        }
    }, [navigate]);

    return (
        <Layout user={user} route={`Account`}>
            <CustomModal 
                isModalOpen={isModalOpen}
                handleOk={formik.handleSubmit} //폼 제출
                handleCancel={handleCancel}
                title = {<Title>Add User</Title>}
                footer={
                <div className = "button-container">
                    <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Close</Button>
                    <Button onClick={formik.handleSubmit}>Add</Button>
                </div>
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <InputField label="Name" type="text" name="Name" formik={formik} />
                    <InputField label="Email" type="text" name="Email" formik={formik} />
                    <InputField label="Password" type="text" name="Password" formik={formik} />
                    <InputField label="Check Password" type="text" name="Check Password" formik={formik} />
                </form>
            </CustomModal>
            <DashboardCard
                header="Account"
                btn="Add User"
                btnClick={handleOpen}
                footer={<Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />}
            >
                {loading ? ( <LoadingSpinner /> ) // 로딩 중일 때 스피너 표시
                : (
                   <Table columns={columns} data={data}
                    // onViewClick={}
                    />
                )}
            </DashboardCard>
        </Layout>
    );
}

export default AccountPage;