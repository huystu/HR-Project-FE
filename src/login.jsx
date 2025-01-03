import './global.css';
import './login.css';

function Login() {

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
                            <form action="" method="post">
                                <div className="input">
                                    <label name="email">
                                    Email address
                                    </label>
                                    <input type="email" name="email" id="email" required />
                                </div>
                                <div className="input">
                                    <label name="pw">
                                    Password
                                    </label>
                                    <input type="password" name="pw" id="pw" required />
                                </div>
                                <div className="right">
                                <button
                                    className="btn"
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