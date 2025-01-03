import { useState } from 'react';

import './global.css';
import './login.css';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        pw: '',
    });

    const isFormValid = loginInfo.email && loginInfo.pw;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLoginInfo((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!isFormValid) {
            console.log('Please fill in all required fileds.');
            return;
        }

        console.log('Login Info: ', loginInfo);

        // connect BE
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginInfo),
            });

            if(!response.ok) {
                throw new Error('Faild to login');
            }

            const data = await response.json();
            console.log('Login Success: ', data);
        }
        catch (error) {
            console.error('Error during login: ', error.message);
        }
    };

    return (
        <>
            <main>
                <div>
                    <div className="card">
                        <div className="title">
                            Login
                        </div>
                        <div>
                        <div className="other-info">
                            <p>Don’t have an account? <a href="">Sign Up</a></p>
                        </div>
                        <div className="login">
                            <div className="login-google">
                                <button type='button'>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" alt="goolge logo" />
                                    <span>Log in with Google</span>
                                </button>
                            </div>
                        </div>
                        <div className="or">
                            <hr />
                            <span>or</span>
                            <hr />
                        </div>
                        <div className="login-itself">
                            <form onSubmit={handleSubmit}>
                                <div className="input">
                                    <label name="email">
                                    Email address
                                    </label>
                                    <input type="email" name="email" id="email" 
                                    onChange={handleChange}
                                    required />
                                </div>
                                <div className="input">
                                    <label name="pw">
                                    Password
                                    </label>
                                    <input type="password" name="pw" id="pw"
                                    onChange={handleChange} required />
                                </div>
                                <div className="right">
                                <button
                                    className={`btn ${isFormValid ? 'btn-enabled' : ''}`}
                                    type="submit"
                                >
                                    Login
                                </button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    <div className="other-info right">
                        <a href="">Forgot password?</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;