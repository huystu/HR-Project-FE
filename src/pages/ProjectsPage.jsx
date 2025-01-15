// src/pages/ProjectsPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Title from '../components/Title';
import { useFormik } from 'formik';
import '../styles/global.css';
import '../styles/deletemodal.css';
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

const ProjectsPage = () => {
    const user = localStorage.getItem('loginUser'); // User Name

    const columns = ["Period", "Title", "Status", "Action"];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // 로딩 상태
    
      const handleCancel = () => {
        setIsModalOpen(false);
      }

      const [data,setData] = useState([]);


    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    //const [data, setData] = useState([]);

    const formatPeriod = (startDate, endDate) => {
        if (endDate) {
            return `${startDate} - ${endDate}`;
        }
        else if (startDate) {
            return `${startDate} - `;
        }
        else {
          return '';
        }
    };

    //formik 폼데이터를 api.post로 서버에 전송하고, 저장된 데이터를 다시 가져와 UI에 반영
  // 1. API에서 데이터 가져오기
    const fetchData = async (page = 0, size = 10) => {
    setAuthToken(accessToken); // 인증 토큰 설정
    setLoading(true);

    //console.log(accessToken);
    
    try {
        const response = await api.get('/project', {
            params: {
            page: page,
            size: size,
            }
        });
        console.log(response.data); //api 응답 확인

        if (response.status === 200) {
            console.log("Success Pagination: ", response);
            console.log(response.data.data.content);
            setPageCount(response.data.data.page.totalPages);
            
            //2. 데이터를 화면에 맞게 변환
            const formattedData = response.data.data.content.map(project => ({
                Period: formatPeriod(project.startDate, project.endDate),
                Title: project.name,
                Status: project.status,
                Action: ["View"],
                id: project.id,
            }));
            
            //3. 상태 업데이트
            setData(formattedData);
            setPageCount(response.data.data.page.totalPages);
        }
    }
    catch (error) {
        console.error('Error fetching project data:', error);
    }
    
    setLoading(false);
  };

    //모달 열기, 폼 데이터 초기화 후 모달 열기
    const handleAddProject = () => {
        setIsModalOpen(true); // Open the modal
        formik.resetForm(); // Initialize form
      };

  // Formik settings
  //initialValues는 처음 렌더링할 때만 설정됨
  //selectedEmployee가 바뀔 때마다 폼 값을 업데이트하려면 formik.setValues를 이용해 명시적으로
  const formik = useFormik({
    initialValues: {
        title: "",
        description: "",
    },
    //enableReinitialize: true, //selectedEmployee가 변경될 때 초기화
    validate: (values) => {
      const errors = {};
      if (!values.title)
      {
        errors.title = 'Title is required';
      }
      if (!values.description)
      {
        errors.description = 'Description is required';
      }
        return errors;
    },
    onSubmit: async (values) => {
      const payload = {
        name: values.title,
        description: values.description,
      };

      setAuthToken(accessToken); // accessToken 설정

        try {
          console.log("submitting values:", values); //전송 데이터 확인
          const response = await api.post("/project", payload);
          console.log("Response", response);

          if (response.status === 200) {
            fetchData(currentPage - 1, pageSize); //성공적으로 추가된 후, fetchData로 데이터를 새로고침하여 테이블에 반영

            console.log(`Success Project Info: ${JSON.stringify(response)}`);
            alert("Project added successfully!");

            setIsModalOpen(false);
          }
        } catch (error) {
          console.error("Error adding project:", error.response?.data || error.message);
          alert(`Failed to add project. Error: ${error.response?.data.message || error.message}`);
        }
      }
    },
);

    const handleViewClick = (row) => {
        navigate(`/projects/${row.id}`);
    };

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



    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/"); 
        }
      }, [navigate]);


    return (
        <Layout user={user} route="Projects">
            <DashboardCard
                header="Projects" btn="Add Project" btnClick = {handleAddProject}
                // btnClick={}
                footer={<Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} pageSize={pageSize} />}
            >
                <CustomModal 
                  isModalOpen={isModalOpen}
                  handleOk={formik.handleSubmit} //폼 제출
                  handleCancel={handleCancel}
                  title = {<Title>Add Project</Title>}
                  footer={
                  <div className = "button-container">
                      <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Close</Button>
                      <Button onClick={formik.handleSubmit}>Add</Button>
                  </div>
                  }
                >
                  <form onSubmit={formik.handleSubmit}>
                    <InputField label="Title" type="text" name="title" formik={formik} />
                    <InputField label="Description" type="text" name="description" formik={formik} />
                  </form>
                </CustomModal>
                {loading ? ( <LoadingSpinner /> ) // 로딩 중일 때 스피너 표시
                : (
                    <Table columns={columns} data={data} onViewClick={handleViewClick} />
                )}
            </DashboardCard>
        </Layout>
    );
};


export default ProjectsPage;