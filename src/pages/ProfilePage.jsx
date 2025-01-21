// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import {  useNavigate } from 'react-router-dom';

import { Tabs, } from 'antd'

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Title from "../components/Title";
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import LoadingSpinner from "../components/LoadingSpinner";

function ProfilePage() {
    const navigate = useNavigate();
    const user = localStorage.getItem('loginUser'); // User Name
    const userEmail = localStorage.getItem('loginUserEmail');
    
    const accessToken = localStorage.getItem('token');
    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: '',
            checkNewPassword: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.oldPassword) {
                errors.oldPassword = 'Current password is required';
            }
            if (!values.newPassword) {
                errors.newPassword = 'New password is required';
            }
            if (!values.checkNewPassword) {
                errors.checkNewPassword = 'Please confirm your new password';
            }
            else if (values.newPassword !== values.checkNewPassword) {
                errors.checkNewPassword = 'New passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            setAuthToken(accessToken);
            try {
                const response = await api.patch('/admin/password', {
                    oldPassword: values.oldPassword,
                    newPassword: values.newPassword,
                });

                console.log('Success Changing PW:', response);
                
                if (response.data.status === 200) {
                    formik.resetForm();
                    alert("Your password has been successfully changed");
                }
            } catch (error) {
                const errorMsg = error.response.data.message;

                if (errorMsg === 'old password is incorrect.') {
                    setErrors({ oldPassword: 'Check your current password' });
                }
                console.error('Error Login:', error);
            }
        },
    });

    const handleTabChange = (key) => { if (key !== '2') { formik.resetForm(); } };

    const chatHistoryDel = async () => {
        const accessToken = localStorage.getItem('token');
        const loginUserID = localStorage.getItem('loginUserId');

        setAuthToken(accessToken);
        const headers = { "Session-ID": loginUserID, };

        try {
            const response = await api.delete('/api/gemini/session-history', { headers });

            if (response.status === 200) {
                console.log("delete session: ", response);
            }
        }
        catch (error) {
            console.log("refresh error: ", error);
        }
    }

    useEffect(() => {
        chatHistoryDel();
    }, []);

    return (
        // turn in into Project title
        <Layout user={user} route={`Profile`}>
            <DashboardCard header="Profile">
                <div className="tabs">
                    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                        <Tabs.TabPane tab="Information" key="1">
                            <div className="profile-info">
                                <div className="profile-data" style = {{fontSize: 45}}>User Name: {user}</div>
                                <div className="profile-data" style = {{fontSize: 20, color: '#6d6d6d'}}>User Email: {userEmail}</div>
                            </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Change Password" key="2">
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <InputField label="Current Password"  type="password"  name="oldPassword"  formik={formik} />
                                    <InputField label="New Password" type="password" name="newPassword" formik={formik} />
                                    <InputField label="Check New Password" type="password" name="checkNewPassword" formik={formik} />
                                    <div className="right">
                                        <Button type="submit" variant={`${formik.isValid && formik.dirty? 'enabled' : 'disabled'}`} disabled={!formik.isValid && formik.dirty}>
                                            Change
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </DashboardCard>
        </Layout>
    );
}

export default ProfilePage;