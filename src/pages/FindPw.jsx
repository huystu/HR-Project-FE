// src/pages/FindPw.jsx

import '../styles/global.css';
import '../styles/findPw.css';

import { useFormik } from 'formik';
import { validationSchema } from '../validationSchema';

import Button from '../components/Button';
import Card from '../components/Card';
import Title from '../components/Title';
import Descript from '../components/Descript';
import InputField from '../components/InputField';

function FindPw() {

    const formik = useFormik({
            initialValues: {
                email: '',
            },
            validationSchema,
            onSubmit: async (values) => {
                console.log('Email Info: ', values);
                // connect BE
            },
        });

    return (
        <>
            <main>
                <Card header={
                        <Title desc={<Descript left="Enter your email and we will send you a link to get back into your account." />}>
                            Forgot password?
                        </Title>}
                >
                    <div>
                        <div>
                            <form onSubmit={formik.handleSubmit}>
                                <InputField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    formik={formik}
                                />
                                <Button type="submit" variant={`${formik.isValid && formik.dirty? 'enabled' : 'disabled'}`} disabled={!formik.isValid && formik.dirty}>
                                    Send login link
                                </Button>
                            </form>
                        </div>
                        <Descript link="Create New Account" align="center" />
                    </div>
                </Card>
                <Descript link="Back to Login" align="right" />
            </main>
        </>
    );
}

export default FindPw;