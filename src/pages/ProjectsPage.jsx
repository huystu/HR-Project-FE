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
    const columns = ["Period", "Title", "Team Manager", "Status", "Action"];

    const data = [
        { Period: "29/12/24 -", Title: "Project Title", "Team Manager": "Aisha Doe", Status: "In Progress", Action: ['View'] },
        { Period: "29/11/24 - 29/12/24", Title: "Project Title", "Team Manager": "Aisha Doe", Status: "Done", Action: ['View'] },
    ];

    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const navigate = useNavigate();

    const handleViewClick = (row) => {
        navigate(`/projects/${row.id}`);
    };

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


