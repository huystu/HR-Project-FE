import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { Tabs, Select } from 'antd'

import api, { setAuthToken } from '../api';

import Layout from "../components/layouts/Layout";
import Sidebar from "../components/layouts/Sidebar";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import DeleteModal from '../components/DeleteModal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ImgButton from '../components/ImgButton';
import '../styles/global.css';
import '../styles/deletemodal.css';
import LoadingSpinner from "../components/LoadingSpinner";


import { IoMdPersonAdd } from "react-icons/io";
import RoundCard from "../components/RoundCard";


const EmployeeDetailPage = () =>
{

    const { id } = useParams(); //URL에서 ID 가져오기
        
    //info
    const [employeeInfo, setEmployeeInfo] = useState(null);
    const [projectsInfo, setProjectsInfo] = useState([]);

    const [imagePreview, setImagePreview] = useState(null); // 미리보기 이미지 URL

    const [loading, setLoading] = useState(false); // 로딩 상태

  

    const user = "Admin"; // User Name
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }
    
    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); 
        }
    }, [navigate]);
    

     // Fetch data from API
     const fetchEmployeeDetail = async () => {
        setAuthToken(accessToken); // set the accessToken
        console.log(accessToken);
        setLoading(true);


       
        try {
            const response = await api.get(`/employee/${id}/detail`);

            
            if(response.status === 200){
                console.log("Api response:", response.data);
                setEmployeeInfo(response.data.data.employeeInfo);
                setProjectsInfo(response.data.data.projectsInfo);
                console.log(response.data.data.projectsInfo);
                //setImagePreview(employeeInfo.imageUrl );

            }
            }
        catch (error) {
            console.error('Error fetching employee data:', error);
        }

        setLoading(false);
    };

    //페이지 로드 시 데이터 불러오기
    useEffect(() => 
        {
            fetchEmployeeDetail();
        }, []);

        
          
    if (!employeeInfo) {
            return <p>Employee details not available.</p>;
      }
      
    
      return (
       <Layout user={user} route="Employees">
             <DashboardCard>
                <RoundCard 
                imageUrl= {imagePreview || "https://st03image.s3.ap-northeast-2.amazonaws.com/d5adfb26-718d-4387-956a-b64174bd34a0-Cute Little Bear Fly Net.png"}
                details = {{
                    name: employeeInfo.name,
                    firstName: employeeInfo.firstName,
                    lastName: employeeInfo.lastName,
                    email: employeeInfo.email,
                    contact: employeeInfo.contact,
                    skills: employeeInfo.skills,
                    joiningDate: employeeInfo.joiningDate,
                    role: employeeInfo.role,
                    //projectsInfo 데이터는 배열임
                    projecttitle: projectsInfo.length > 0 ? projectsInfo[0].projectInfo.name : "No project assigned",
                    roleinproject: projectsInfo.length > 0? projectsInfo[1].employeeProjectInfo.contribution : "No project assinged",
                    //imageUrl: null,
                }}

                
                >
        

                
      
                
                </RoundCard>
            </DashboardCard>
        </Layout>
        
      );
    };
    

export default EmployeeDetailPage;