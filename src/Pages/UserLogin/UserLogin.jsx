import { useState } from 'react';
import { Button, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import "./UserLogin.css";
import axios from 'axios';
import { login } from '../../config/endpoints';

const UserLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        userPhone: "",
    })

    const validateInput = (data) => {
        console.log(data);
        const { userEmail, userPassword } = data;
        if (!userEmail) {
            message.error("Email is a required field");
            return false;
        }
        if (!userPassword) {
            message.error("Password is a required field");
            return false;
        }
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const isFormValidate = validateInput(formData)
        if (isFormValidate) {
            await performAPICall();
        }
    };

    const performAPICall = async () => {
        setLoading(true);
        try {
            const { userEmail, userPassword } = formData;
            const response = await axios.post(`${login}`, {
                email: userEmail,
                password: userPassword,
            });
            setLoading(false);
            console.log("response data from login api", response.data);
            const errors = response.data.result.errors;
            if (errors) {
                for (const error in errors) {
                    console.log(error)
                    message.error(errors[error].join(''));
                }
            } else {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.result.data.token);
                navigate("/user-profile");
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
    };

    // const login = async () => {
    //     const isValidInput = validateInput();
    //     // if (isValidInput) {
    //     //     const response = await performAPICall();
    //     //     if (response) {
    //     //         persistLogin(
    //     //             response.tokens.access.token,
    //     //             response.user.email,
    //     //             response.user.walletMoney,
    //     //             response.user.name,
    //     //             response.user._id
    //     //         );
    //     //         setEmail("");
    //     //         setPassword("");
    //     //         message.success("Logged in successfully");
    //     //         navigate("/products");
    //     //     }
    //     // }
    // };

    return (
        <div className={`flex-container`}>
            <div className="login-container container">
                <h1>Login</h1>
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

                    <Button loading={loading} type="primary" htmlType='submit'>
                        Login
                    </Button>
                </form>
                <div className="already-loggedin">
                    <Link to="/signup">Create New Account</Link>
                </div>
            </div>
        </div>
    )
}

export default UserLogin