import { useEffect, useState } from 'react'
import { Button, Input, message } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import './UserSignup.css'
import axios from 'axios';
import { register } from '../../config/endpoints';
import { validateInput } from './formInputValidation';


const UserSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token") || '';
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        userPhone: "",
    });

    useEffect(() => {
        if (token) {
            // console.log(`token in login`, token);
            navigate('/user-profile');
        }
    }, [token, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        const isFormValidate = validateInput(formData)
        if (isFormValidate) {
            await performAPICall();
        }
    }

    const performAPICall = async () => {
        setLoading(true);
        try {
            const { userEmail, userPassword, firstName, lastName, userPhone } = formData;
            const response = await axios.post(`${register}`, {
                email: userEmail,
                password: userPassword,
                first_name: firstName,
                last_name: lastName,
                phone: userPhone,
            });
            setLoading(false);
            console.log("response data from register api", response.data);
            const errors = response.data.result.errors;
            if (errors) {
                for (const error in errors) {
                    console.log(error)
                    message.error(errors[error].join(''));
                }
            } else {
                message.success(response.data.message);
                navigate("/login");
            }
        } catch (err) {
            console.log(err)
        }

    }

    const userInputChangeHandler = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    return (
        <div className='flex-container'>
            {!token && <div className="register-container container">
                <h1>Register your account</h1>
                <form onSubmit={submitHandler}>
                    <Input
                        className="input-field"
                        type="email"
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                        value={formData.userEmail}
                        name="userEmail"
                        onChange={userInputChangeHandler}
                    />

                    <Input.Password
                        className="input-field"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        value={formData.userPassword}
                        name="userPassword"
                        onChange={userInputChangeHandler}
                    />

                    <Input.Password
                        className="input-field"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        name="confirmPassword"
                        onChange={userInputChangeHandler}
                    />
                    <Input
                        className="input-field"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="First Name"
                        value={formData.firstName}
                        name='firstName'
                        onChange={userInputChangeHandler}
                    />
                    <Input
                        className="input-field"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Last Name"
                        value={formData.lastName}
                        name='lastName'
                        onChange={userInputChangeHandler}
                    />
                    <Input
                        className="input-field"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Phone Number"
                        type="number"
                        value={formData.userPhone}
                        name='userPhone'
                        onChange={userInputChangeHandler}
                    />

                    <Button loading={loading} type="primary" htmlType="submit">
                        Register
                    </Button>
                </form>
                <div className="already-registered">
                    Already Registered? <Link to="/login">Login</Link>
                </div>
            </div>}
        </div>
    )
}

export default UserSignup