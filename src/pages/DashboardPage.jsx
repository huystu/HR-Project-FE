// src/pages/DashboardPage.jsx
import { useState, useEffect,  } from "react";
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

// import ChatHistoryDel from '../../ChatHisoryDel';

const DashboardPage = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem('loginUser'); // User Name

    // Loading
    const [loading, setLoading] = useState(false);

    // 1번째 줄
    const [smallCardData, setSmallCardData] = useState([]);

    // 2번째 줄 그래프
    const [totalUsers, setTotalUsers] = useState([ {
        label: 'tmp',
        data: [ { primary: 'tmp', secondary: 65 } ],
    },]);
    const [totalProjects, setTotalProjects] = useState([
        {
            label: 'tmp',
            data: [ { primary: 'tmp', secondary: 65 } ],
        },
    ]);

    // 2번째 줄 도넛 그래프 
    const [skillCategory, setSkillCategory] = useState([]);

    // 3번째 줄 막대 그래프
    const [projectCategory, setProjectCategory] = useState([
        {
            label: 'tmp',
            data: [ { primary: 'Jan', secondary: 65 } ],
        },
    ]);

    // Token
    const accessToken = localStorage.getItem('token');
    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const transformData = (data) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        return Object.entries(data).map(([key, value]) => {
            const [year, month] = key.split('-');
            const monthIndex = parseInt(month, 10) - 1;
            return {
                primary: months[monthIndex], secondary: value
            };
        });
    };

    const transformProjectCategoryData = (data) => {
        
        return Object.entries(data).map(([key, value]) => {
            return {
                primary: key, secondary: value
            };
        });
    };

    // Dashboard에 들어갈 정보
    const fetchData = async () => {
        setAuthToken(accessToken); // set the accessToken
        setLoading(true); // 정보 받아 오기 전까지 스피너

        try {
            const response = await api.get(`/dashboard`);

            if (response.status === 200) {
                console.log("Success Dashboard: ", response.data.data);

                // 상단 카드
                const formattedSmallCardData = [
                    {
                        label: 'Employees',
                        data: response.data.data.totalEmployeesNum,
                        updown: response.data.data.totalEmployeesChangePercent,
                    },
                    {
                        label: 'Upcoming Projects',
                        data: response.data.data.pendingProjectsNum,
                        updown: response.data.data.pendingProjectsChangePercent,
                    },
                    {
                        label: 'Onging Projects',
                        data: response.data.data.ongoingProjectsNum,
                        updown: response.data.data.ongoingProjectsChangePercent,
                    },
                    {
                        label: 'Completed Projects',
                        data: response.data.data.completedProjectsNum,
                        updown: response.data.data.completedProjectsChangePercent,
                    }
                ];
                setSmallCardData(formattedSmallCardData);

                // 직원 수, 프젝 수 그래프
                const formattedUsersData = [
                    {
                        label: 'This year',
                        data: transformData(response.data.data.employeesPerMonth)
                    },
                    {
                        label: 'Last year',
                        data: transformData(response.data.data.prevEmployeesPerMonth)
                    },
                ];
                setTotalUsers(formattedUsersData);
                
                const formattedProjectData = [
                    {
                        label: 'This year',
                        data: transformData(response.data.data.ongoingProjectsPerMonth)
                    },
                    {
                        label: 'Last year',
                        data: transformData(response.data.data.prevOngoingProjectsPerMonth)
                    },
                ];
                setTotalProjects(formattedProjectData);

                // 기술 카테고리 비율 그래프
                const formattedSkillCategory = Object.entries(response.data.data.employeeSkillRatio).map(([key, value]) => {
                    return {
                        name: key,
                        value: value,
                    };
                });
                setSkillCategory(formattedSkillCategory);

                // 프젝 카테고리 비율 그래프
                const formattedProjectCategory = [
                    {
                        label: "project category",
                        data: transformProjectCategoryData(response.data.data.projectCategoryRatio)
                    },
                ];
                console.log(formattedProjectCategory);
                setProjectCategory(formattedProjectCategory);
            }
        }
        catch (error) {
            console.error('Error fetching dashboard data:', error);
        }

        setLoading(false); // 정보 받아 오면 로딩 정지
    };
    useEffect(() => {fetchData();}, []); // 컴포넌트가 마운트 될 때만 실행

    const handleTabChange = (key) => { if (key !== '2') { console.log(key); } };

    const renderSuffix = (value) => {
        if (value > 0) {
            return <ArrowUpOutlined />;
        } else if (value < 0) {
            return <ArrowDownOutlined />;
        } else {
            return '-';
        }
    };

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
        <Layout user={user}>
            {loading ? <LoadingSpinner /> :
            (<div style={{overflowY: "scroll", width:"100%"}}>
            <div className="dashboard-cards page-height-1">
                {smallCardData.map((card, index) => (
                    <Card className="dashboard-card" bordered={false} key={index}>
                        <Statistic
                        title={card.label}
                        value={card.data}
                        precision={0}
                        valueStyle={{
                            color: card.updown > 0 ?
                                '#3f8600' : card.updown < 0 ? '#cf1322' : '#000000'
                            }}
                        suffix={renderSuffix(card.updown)} />
                    </Card>
                ))}
            </div>
            <div className="dashboard-cards page-height-2">
                <Card className="dashboard-card-3">
                    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                        <Tabs.TabPane tab="Total Users" key="1">
                            <LineGraph data={totalUsers} height={400}/>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Total Projects" key="2">
                            <LineGraph data={totalProjects} height={400}/>
                        </Tabs.TabPane>
                    </Tabs>
                </Card>
                <Card className="dashboard-card-2">
                    <DonutChart title="Employee Skills Breakdown" data={skillCategory} innerRadius={50} height={400} />
                </Card>
            </div>
            <div className="dashboard-cards page-height-2">
                <Card className="dashboard-card">
                    <BarGraph title="Project Categories" data={projectCategory} height={400} />
                </Card>
            </div>
            </div>)}
        </Layout>
    );
};


export default DashboardPage;


