import { useState, useEffect } from 'react'
import { getUserProfile } from '../../config/endpoints';
import axios from 'axios';
import { Form, Input, message } from 'antd';
import { setUserData, selectUserData } from '../../Redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './UserProfile.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token") || '';
    // const [userData, setUserData] = useState(null);
    const userDetails = useSelector(selectUserData);
    const dispatch = useDispatch();
    if (!token) {
        navigate('/login')
    }
    useEffect(() => {
        performAPICall()
    }, []);

    const performAPICall = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${getUserProfile}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            // console.log('response data from get-users', response.data);
            const userData = response.data.result.data;
            dispatch(setUserData(userData));
            const error = response.data.message;
            if (error) {
                console.log(error)
                message.error(error);
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
    };
    // console.log(`user details from redux`, userDetails);
    if (loading) {
        return (
            <>
                <Header />
                <div className='flex-container'>
                    <div className="container">
                        <h1>User Profile</h1>
                        <p>loading...</p>
                    </div>
                </div>
                <Footer />
            </>
        )
    }


    return (
        <>
            <Header />
            <div className='flex-container'>
                {token && <div className="container user-profile">
                    <h1>User Profile</h1>
                    {userDetails && (
                        <Form layout="vertical">
                            <Form.Item label="First Name">
                                <Input value={userDetails.first_name} />
                            </Form.Item>
                            <Form.Item label="Last Name">
                                <Input value={userDetails.last_name} />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input value={userDetails.email} disabled />
                            </Form.Item>
                            <Form.Item label="Phone">
                                <Input value={userDetails.phone} disabled />
                            </Form.Item>
                            <Form.Item label="Zip Code">
                                <Input value={userDetails.zipcode} disabled />
                            </Form.Item>
                            <Form.Item label="Company Name">
                                <Input value={userDetails.company_name} disabled />
                            </Form.Item>
                        </Form>
                    )}
                </div>
                }
            </div>
            <Footer />
        </>
    )
}

export default UserProfile