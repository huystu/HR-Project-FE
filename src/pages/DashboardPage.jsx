// src/pages/DashboardPage.jsx
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic, Tabs } from 'antd';

import LineGraph from "../components/charts/LineGraph";
import DonutChart from "../components/charts/DonutChart";
import BarGraph from "../components/charts/BarGraph";

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
    // useEffect(() => {fetchData();}, []); // 컴포넌트가 마운트 될 때만 실행

    const totalUserLineData = React.useMemo( () => [
            {
                label: 'This year',
                data: [
                    { primary: 'Jan', secondary: 65 },
                    { primary: 'Feb', secondary: 59 },
                    { primary: 'Mar', secondary: 80 },
                    { primary: 'Apr', secondary: 81 },
                    { primary: 'May', secondary: 56 },
                    { primary: 'Jun', secondary: 55 },
                    { primary: 'Jul', secondary: 40 },
                ],
            },
            {
                label: 'Last year',
                data: [
                    { primary: 'Jan', secondary: 28 },
                    { primary: 'Feb', secondary: 48 },
                    { primary: 'Mar', secondary: 40 },
                    { primary: 'Apr', secondary: 19 },
                    { primary: 'May', secondary: 86 },
                    { primary: 'Jun', secondary: 27 },
                    { primary: 'Jul', secondary: 90 },
                ],
            },
        ], [] );

    const employeeSkillsData = [
        { name: 'Category A', value: 30 },
        { name: 'Category B', value: 50 },
        { name: 'Category C', value: 20 },
    ];

    const handleTabChange = (key) => { if (key !== '2') { console.log(key); } };

    return (
        <Layout user={user}>
            <div className="dashboard-cards page-height-1">
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
            <div className="dashboard-cards page-height-2">
                <Card className="dashboard-card-3">
                    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                        <Tabs.TabPane tab="Total Users" key="1">
                            <LineGraph data={totalUserLineData} height={400}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Total Projects" key="2">
                            <LineGraph data={totalUserLineData} height={400}/>
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
                <Card className="dashboard-card-2">
                    <DonutChart title="Employee Skills Breakdown" data={employeeSkillsData} innerRadius={50} height={400} />
                </Card>
            </div>
            <div className="dashboard-cards page-height-2">
                <Card className="dashboard-card">
                    <BarGraph title="Project Categories" data={totalUserLineData} height={400} />
                </Card>
            </div>
        </Layout>
    );
};


export default DashboardPage;


