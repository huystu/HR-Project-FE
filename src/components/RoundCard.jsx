import '../styles/roundcard.css';
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import api, { setAuthToken } from '../api';
import ImgButton from '../components/ImgButton';
import { UploadOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import InputField from '../components/InputField';
import LoadingSpinner from "../components/LoadingSpinner";



import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Avatar, Row, Col, Spin } from "antd";


const RoundCard = ({ imageUrl, details }) => {
    const [imagePreview, setImagePreview] = useState(imageUrl || null); // 미리보기 상태
    const [uploading, setUploading] = useState(false); // 업로드 상태
    const accessToken = localStorage.getItem('token');
    const fileInputRef = useRef(null); // 파일 입력 참조
    const navigate = useNavigate();
    const { id } = useParams(); //URL에서 ID 가져오기
    const [loading, setLoading] = useState(true);

    // Check token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); 
        }

        // 페이지 로드 시 로컬 스토리지에서 이미지 URL을 가져오기
        const storedImage = localStorage.getItem(`image_${id}`);
        if (storedImage) {
            //setLoading(true); //로딩 시작
            setImagePreview(storedImage);
        }
    }, [navigate, id]);

    useEffect(() => {
        if (imagePreview !== null){
            setLoading(false); //이미지가 로드되었으면 로딩 종료
            console.log("loading state changed:", loading);
        }
        
    }, [imagePreview]);


    // 이미지 업로드 처리
    const handleUpload = async (file) => {
        setLoading(true);
        console.log("loading state changed to: ", true);
        setAuthToken(accessToken); // set the accessToken
        console.log(accessToken);

        //setLoading(false);
        console.log("File selected." ,file);
        if (!file) return; //파일이 없는 경우 처리 중단

       

        const formData = new FormData();
        formData.append("file", file); //key는 'file'로 설정
        setUploading(true);

        console.log("Formdata:", formData);

       
        try {
            const response = await api.post(`/employee/${id}/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            });


            console.log("API URL:", `/employee/${id}/image`);

            if (response.status === 200) {

                const uploadedImageUrl = response.data.data; //업로드 된 이미지 url
                console.log("Api response:", response.data);
                console.log("image uploaded successfully", response.data.data);
                console.log(response.data.message);

                // 업로드된 이미지 URL 설정
                
                setImagePreview(uploadedImageUrl); 
                localStorage.setItem(`image_${id}`, uploadedImageUrl); // 로컬 스토리지에 저장
                //fetchEmployeeDetail();
                setLoading(false); //로딩 종료
                console.log("loading state changed to: ", false);

                } else {
                console.error("Image upload failed:", response.data);
                setImagePreview(employeeInfo.imageUrl || 'defaul-image-url.jpg');
                setLoading(false); //에러 발생 시에도 로딩
                console.log("loading state changed to: ", false);
                }
            } catch (error) {
                console.error("Error uploading image:", error.message);
                console.error("error response data:", error.response?.data);
                setLoading(false);
                console.log("loading state changed to: ", false);
            } finally {
                setUploading(false);
            }
            };

            // 파일 입력 열기
            const openFileInput = () => {
                if (fileInputRef.current) {
                    fileInputRef.current.click();
                }
            };


            // 이미지 삭제 처리 (DELETE 요청)
    const handleDeleteImage = async () => {
        setAuthToken(accessToken); // set the accessToken

        try {
            const response = await api.delete(`/employee/${id}/image`);

            if (response.status === 200) {
                console.log(response.data);
                console.log("Image deleted successfully");

                setImagePreview(null); // 이미지 미리보기 초기화 (삭제)
                localStorage.removeItem(`image_${id}`); 
            } else {
                console.error("Image delete failed:", response.data);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };


    if (loading) {
        return <LoadingSpinner />;
       }

    return (
        <Row style={{justifyContent: "center"}}>
            {/*왼쪽 칸 사진, 전체 너비의 비율 Col로 조절*/}
            <Col style={{ width: "25%", marginRight:"1px"}}> 
            
            <Card
                style={{ width:"100%", //두 카드 사이의 간격
                    height: "350px", 
                    borderRadius: "20px",
                    backgroundColor: "rgba(217, 217, 217, 0.4)",
                   }}
                hoverable
                cover={
                    <div className = "round-card-left">
                         { imagePreview ? (
                        <Avatar
                                    className="avatar-placeholder"
                                    src={imagePreview} //선택된 이미지 표시
                                    alt="Employee"
                                    style={{ display: 'block', margin: '0 auto' }} // 중앙 정렬
                                    
                                    
                                />
                            ) : (
                                <div className="placeholder">No image</div>
                                
                            )}

                            
                                <div className="detail-item">
                                
                                <div className="input-field-half-row">
                                    <ImgButton onClick={openFileInput}><UploadOutlined /></ImgButton>
                                    <ImgButton onClick={handleDeleteImage}><DeleteOutlined /></ImgButton>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display:"none"}} // 파일 입력 숨김
                                    onChange={(e) => handleUpload(e.target.files[0])}
                                     // 파일 입력 참조 설정
                                />
                                <span><strong><h3>{details.name}</h3></strong></span>
                                <span>{details.role}</span>

                              

                                </div>
                                 
                        </div>
                    }
                />
                    
            </Col>

            {/*상세정보 카드*/}
            <Col style = {{width:"70%"}}>
            <Card
            style={{ width: "100%",
                 borderRadius: "20px",
                 backgroundColor: "rgba(217, 217, 217, 0.4)",
                }}
            hoverable>

                    <div className = "round-card-right">
                        {details ? (
                            <div className = "details-container">

                                <div className="detail-item">
                                <label>First Name</label>
                                <span>{details.firstName}</span>
                                </div>

                                <div className="detail-item">
                                <label>Last Name</label>
                                <span>{details.lastName}</span>
                                </div>

                                <div className="detail-item">
                                <label>Email</label>
                                <span>{details.email}</span>
                                </div>

                                <div className="detail-item">
                                <label>Phone</label>
                                <span>{details.contact}</span>
                                </div>

                                <div className="detail-item">
                                <label>Skills</label>
                                <span>{details.skills}</span>
                                </div>

                                <div className="detail-item">
                                <label>Project Title</label>
                                <span>{details.projecttitle}</span>
                                </div>

                                <div className="detail-item">
                                <label>Role In Project</label>
                                <span>{details.roleinproject}</span>
                                </div>

                                <div className="detail-item">
                                <label>Joining Date</label>
                                <span>{details.joiningDate}</span>
                                </div>

                    
                    
                            </div>
                    
                ) : (
                    <p>no details</p>
                )}

            </div>
            </Card> 
            </Col>
            </Row>


    );
};

RoundCard.propTypes = {
   imageUrl: PropTypes.string, //직원 사진 url
details: PropTypes.shape({
        name: PropTypes.string.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired,
        skills: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        projecttitle: PropTypes.string.isRequired,
        roleinproject: PropTypes.string.isRequired,
    }),
    //onClick: PropTypes.func,

    

};

export default RoundCard;