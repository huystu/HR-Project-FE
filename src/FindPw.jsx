import { useState } from 'react';

import './global.css';
import './findPw.css';

function FindPw() {

    const [email, setEmail] = useState('');


    const isFormValid = email.trim().length > 0;

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <>
            <main>
                <div>
                    <div className='card'>
                        <div className="left">
                            <div className="title">Forgot password?</div>
                            <div className="other-info">
                                <p>Enter your email<br />
                                and we will send you a link to get back into your account.</p>
                            </div>
                        </div>
                        <div>
                            <form>
                                <div className="input">
                                    <label name="email">
                                        Email
                                    </label>
                                    <input type="email" name="email" id="email" onChange={handleChange} required />
                                </div>
                                <button
                                    className={`btn ${isFormValid ? 'btn-enabled' : 'btn-disabled'}`}
                                    type="submit"
                                    disabled={!isFormValid}
                                >
                                    Send login link
                                </button>
                            </form>
                        </div>
                        <div className="other-info">
                            <p><a>Create New Account</a></p>
                        </div>
                    </div>
                    <div className="other-info right">
                        <a href="">Back to Login</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default FindPw;