// src/pages/EmployeePage.jsx
import { useState } from "react";
import Layout from "../components/layouts/Layout";
import DashboardCard from "../components/DashboardCard";
import Table from "../components/Table";
import CustomModal from '../components/Modal';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Title from '../components/Title';
import { useFormik } from 'formik';
import { validationSchema } from '../validationSchema';

const EmployeePage = () => {
  const user = "Admin"; // User Name
  const columns = ["Date", "Employee", "Role", "Skills", "Email", "Phone Number", "Action"];

  const [data, setData] = useState([
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
    {
      Date: "05/01/25",
      Employee: "Aisha Doe",
      Role: "HR Manager",
      Skills: ["java", "python", "C", "JavaScript"],
      Email: "email@st.com",
      "Phone Number": "01234567890",
      Action: "50px",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleAddEmployee = () => {
    setIsModalOpen(true); // Open the modal
  };

  
  // Formik settings
  const formik = useFormik({
    initialValues: {
      date: '',
      employee: '',
      email: '',
      phoneNumber: '',
      role: '',
      skills: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.date)
      {
        errors.date = 'Date is required';
      }
      
      if (!values.name)
      {
        errors.name = 'Name is required';
      }

      if (!values.phoneNumber)
      {
        errors.phoneNumber = 'phoneNumber is required';
      } else if (!/^\d{10}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Phone number must be 10 digits';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

        return errors;
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
    
  /*
    validationSchema,
    onSubmit: async (values) => {
      const newEmployee = {
        Date: new Date().toLocaleDateString('en-US'),
        Employee: values.name,
        Role: values.role,
        Skills: values.skills,
        Email: values.email,
        "Phone Number": values.phoneNumber,
        Action: "50px",
      };

      setData((prevData) => [...prevData, newEmployee]);
      setIsModalOpen(false);  // Close the modal after adding the employee
    },
  });*/

  return (
    <Layout user={user} route="Employees">
      <DashboardCard header="Employees" btn="Add Employee" btnClick={handleAddEmployee}>
          
          <CustomModal 
            isModalOpen={isModalOpen}
            handleOk={formik.handleSubmit} //폼 제출
            handleCancel={handleCancel}
            title = {<Title>Add Employee</Title>}
            footer={(
              <>
            <div className = "button-container">
              <Button className = "btn-gray" onClick={() => setIsModalOpen(false)}>Close</Button>
              <Button onClick={formik.handleSubmit}>Add</Button></div>
            </>
          )}
          >
          {/*date, Name, role, skills, email, phoneNumber, actions*/}
          {/*email, phoneNumber formik*/}
          {/*<div className = "update">*/}
            
          <form onSubmit={formik.handleSubmit}>
            <InputField label="Date" type="date" name="date" formik={formik} />
            <InputField label="Name" type="text" name="name" formik={formik} />
            <InputField label="Role" type="text" name="role" formik={formik} />
            <InputField label="Skills" type="text" name="skills" formik={formik} />
            <InputField label="Email" type="email" name="email" formik={formik} />
            <InputField label="PhoneNumber" type="tel" name="phoneNumber" formik={formik} />


          </form>
            </CustomModal>
                            


        <Table columns={columns} data={data} />
        
      </DashboardCard>
    </Layout>
  );
};


export default EmployeePage;