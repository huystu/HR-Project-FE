import React, { Component } from 'react';
import { useState } from 'react';
import './Account.css';
import './global.css';

class Account extends Component {
    render() {
        return(
            <div className = "card">
                {/*title wrap*/}
                <div className = "title">
                    Create Account <br></br>
                </div>
                {/*content wrap*/}
                <div className = "contentWrap">
                    
                    <div className = "input">
                        <label name="name">
                        Name
                        </label>
                        {/*사용자로부터 입력받는 부분*/}
                        <input type="text" id="name" name="name" required/> 
                    </div>
                    {/*
                    <div className = "inputWrap">
                        <input></input>
                    </div>
                    */}
                    <div className = "input">
                        <label name="Email address">
                            Email address
                        </label>
                        <input type="email" id="email" name="email" required/>
                    </div>
                    {/*
                    <div className = "inputWrap">
                        <input></input>
                    </div>
                    */}
                    <div className = "input">
                        <label name="Password">
                            Password
                        </label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div className = "input">
                        <label name="Repeat Password">
                        Repeat your password
                        </label>
                        <input type="password" id="password" name="password" required/>
                    </div>
                    <div className = "checkbox">
                        <input type="checkbox" id="agree" className = "other-info" required/>
                        &nbsp;I agree all statements in 
                        <a href=""> Terms of service</a>
                    </div>
                    <div className= "right">
                    <button className="btn" type="submit">
                        Sign up 
                    </button>
                    </div>
                    </div>
                    <br></br>

                    <div className = "other-info">
                        <h5>Have you already an account? 
                        <a href=""> Login here</a></h5>
                    </div>
                </div>

        );
    }
}
export default Account;