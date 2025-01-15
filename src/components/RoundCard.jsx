import '../styles/roundcard.css';
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
//import styled from "styled-components";
//import "antd/dist/antd.css";

import { Card, Avatar, Typography, Row, Col } from "antd";
const { Title, Text } = Typography;

const RoundCard = ({ photoUrl, details }) => {
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
                        
                        {photoUrl ? (
                        <Avatar
                                    size={120}
                                    src={photoUrl}
                                    alt="Employee"
                                    style={{ borderRadius: "50%" }}
                                />
                            ) : (
                                <div className="placeholder">No image</div>

                            )}

                                <div className="detail-item">
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

                    *
                    
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
   ImageUrl: PropTypes.string, //직원 사진 url
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
    })

    

};

export default RoundCard;