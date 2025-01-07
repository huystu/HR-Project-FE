import React from 'react';
import { useFormik } from 'formik';
import { validationSchema } from '../validationSchema';
import { useState } from 'react';
import { Modal } from 'antd';


import Button from '../components/Button';
import Card from '../components/Card';
import Title from '../components/Title';
//import Descript from '../components/Descript';
import InputField from '../components/InputField';
import Input from '../components/Input';
import CustomModal from '../components/Modal';


function update_employee(){
    // formik 설정 (name, email, phoneNumber만 관리)
    const formik = useFormik({
        initialValues: {
            email: '',
            phoneNumber: '', // 전화번호
        },
        validationSchema, // 유효성 검사 추가
        onSubmit: async (values) => {
            console.log('Info: ', values );

            // BE와 연결
            try {
                const response = await fetch('/api/updateEmployee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...values, role, skills }),
                });

                if (!response.ok) {
                    throw new Error('fail update');
                }

                const data = await response.json();
                console.log('success update: ', data);
            } catch (error) {
                console.error('error update: ', error.message);
            }
        },
    });

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


        return (
            <>
                <main>
                    <div>
                        {/*모달 컴포넌트*/}
                <Button type="primary" onClick={showModal}>
                    Update 
                </Button>
                <CustomModal 
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                    title = ''
                    footer ={(
                        <>
                        <div className = "button-container">
                                    <Button 
                                    type = "button" 
                                    className = "btn-gray" 
                                    onClick = { handleCancel }
                                    > Close </Button>
                                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <Button 
                                    type = "submit"
                                    onClick = { handleOk }
                                    > Update </Button>
                        </div>
                        </>
                    )}
                    >
                
                    
                        <Card
                            header={
                                <Title>
                                    Update Employee
                                </Title>
                            }
                            >
                            {/*name, email, phoneNumber, role, skills*/}
                            {/*email, phoneNumber formik*/}
                            {/*<div className = "update">*/}

                                
                                <form onSubmit={formik.handleSubmit}>       
                                    
                                    <Input
                                    label = "Name"
                                    type = "text"
                                    name = "name"
                                    />
                                                      
                                    <InputField
                                    label = "Email"
                                    type = "email"
                                    name = "email"
                                    formik = {formik}
                                    />
                                
                            
                                    <InputField
                                    label = "PhoneNumber"
                                    type = "tel"
                                    name = "phoneNumber"
                                    formik = {formik}
                                />

                                <Input
                                label = "Role"
                                type = "text"
                                name = "role"
                                />

                                <Input
                                label = "Skills"
                                type = "text"
                                name = "skills"
                                />

                            </form>
                            
                        </Card>
                        </CustomModal>
                    </div>
                </main>

                
                </>
        );
    }
export default update_employee;