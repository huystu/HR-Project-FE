// src/pages/DashboardPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import '../styles/global.css';
import '../styles/deletemodal.css';
import LoadingSpinner from "../components/LoadingSpinner";

const DashboardPage = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem('loginUser'); // User Name

    // Loading
    const [loading, setLoading] = useState(false);

    // Token
    const accessToken = localStorage.getItem('token');
    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    // Dashboard에 들어갈 정보
    const fetchData = async () => {
        setAuthToken(accessToken); // set the accessToken
        setLoading(true); // 정보 받아 오기 전까지 스피너

        try {
            const response = await api.get(``);

            if (response.status === 200) {
                console.log("Success Dashboard: ", response.data.data);

            }
        }
        catch (error) {
            console.error('Error fetching dashboard data:', error);
        }

        setLoading(false); // 정보 받아 오면 로딩 정지
    };
    useEffect(() => {fetchData();}, []); // 컴포넌트가 마운트 될 때만 실행

    return (
        <Layout user={user} >
            <div className="dashboard-cards">
                <Card className="dashboard-card" bordered={false}>
                    <Statistic
                        title="Employees"
                        value={31}
                        precision={0}
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix={<ArrowUpOutlined />}
                    />
                </Card>
                <Card className="dashboard-card" bordered={false}>
                    <Statistic
                    title="Projects"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    suffix={<ArrowUpOutlined />}
                    />
                </Card>
                <Card className="dashboard-card" bordered={false}>
                    <Statistic
                    title="Ongoing Projects"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    suffix={<ArrowDownOutlined />}
                    />
                </Card>
                <Card className="dashboard-card" bordered={false}>
                    <Statistic
                    title="Completed Projects"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    suffix={<ArrowUpOutlined />}
                    />
                </Card>
            </div>
        </Layout>
    );
};


export default DashboardPage;


