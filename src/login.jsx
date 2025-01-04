// import { useState } from 'react';
import { useFormik } from 'formik';
import { validationSchema } from './validationSchema';
import './global.css';
import './login.css';

function Login() {

    const formik = useFormik({
        initialValues: {
            email: '',
            pw: '',
        },
        validationSchema, // 유효성 검사 추가
        onSubmit: async (values) => {
            console.log('Login Info: ', values);

            // connect BE
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                throw new Error('fail login');
                }

                const data = await response.json();
                console.log('success login: ', data);
            } catch (error) {
                console.error('error login: ', error.message);
            }
        },
    });

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
                            {/* <form onSubmit={handleSubmit}> */}
                            <form onSubmit={formik.handleSubmit}>
                                <div className="input">
                                    <label name="email">Email address</label>
                                    <input type="email" name="email" id="email" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="input">
                                    <label name="pw">
                                    Password
                                    </label>
                                    <input type="password" name="pw" id="pw"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.pw}
                                    />
                                    {formik.touched.pw && formik.errors.pw ? (
                                        <div style={{ color: 'red' }}>{formik.errors.pw}</div>
                                    ) : null}
                                </div>
                                <div className="right">
                                <button
                                    className={`btn ${formik.isValid && formik.dirty? 'btn-enabled' : 'btn-disabled'}`}
                                    type="submit"
                                    disabled={!formik.isValid && formik.dirty}
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