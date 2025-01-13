// src/pages/ProjectsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ImgButton from '../components/ImgButton';
import Title from '../components/Title';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

const ProjectsPage = () => {
    const user = "Admin"; // User Name
    const columns = ["Period", "Title", "Status", "Action"];

    // const data = [
    //     { Period: "29/12/24 -", Title: "Project Title", "Team Manager": "Aisha Doe", Status: "In Progress", Action: ['View'] },
    //     { Period: "29/11/24 - 29/12/24", Title: "Project Title", "Team Manager": "Aisha Doe", Status: "Done", Action: ['View'] },
    // ];

    const [data, setData] = useState([]);

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const [loading, setLoading] = useState(false); // 로딩 상태

    const navigate = useNavigate();

    const handleViewClick = (row) => {
        navigate(`/projects/${row.id}`);
    };

    const accessToken = localStorage.getItem('token');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); 
        }
      }, [navigate]);

    // Fetch data from API
    const fetchData = async (page = 0, size = 10) => {
        setAuthToken(accessToken); // set the accessToken

        setLoading(true);

        
        try {
            const response = await api.get('/project', {
                params: {
                page: page,
                size: size,
                }
            });

            if (response.status === 200) {
                console.log("Success Project Pagination: ", response);
                console.log(response.data.data.content);
                setPageCount(response.data.data.page.totalPages);
                
                const formattedData = response.data.data.content.map(project => ({
                    Period: project.startDate, // 원하는 형식으로 날짜 변환 함수
                    Title: project.name,
                    Status: project.status,
                    Action: ["View"],
                    id: project.id,
                }));
                setData(formattedData);
            }
        }
        catch (error) {
            console.error('Error fetching employee data:', error);
        }
        
        setLoading(false);
    };

    useEffect(() => {
        fetchData(currentPage - 1, pageSize);
      }, [currentPage]);

    return (
        <Layout user={user} route="Projects">
            <DashboardCard
                header="Projects" btn="Add Projects"
                // btnClick={}
                footer={<Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />}
            >
                <Table columns={columns} data={data} onViewClick={handleViewClick} />
            </DashboardCard>
        </Layout>
    );
};


export default ProjectsPage;


