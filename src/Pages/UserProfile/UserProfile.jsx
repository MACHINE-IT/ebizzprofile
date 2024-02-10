import { useState, useEffect } from 'react'
import { getUserProfile } from '../../config/endpoints';
import axios from 'axios';
import { Form, Input, message } from 'antd';

const UserProfile = () => {
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token") || '';
    const [userData, setUserData] = useState(null);
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
            console.log('response data from get-users', response.data);
            const userData = response.data.result.data;
            setUserData(userData);
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

    return (
        <div className='flex-container'>
            <div className="container">
                <h1>User Profile</h1>
                {userData && (
                    <Form layout="vertical">
                        <Form.Item label="First Name">
                            <Input value={userData.first_name} />
                        </Form.Item>
                        <Form.Item label="Last Name">
                            <Input value={userData.last_name} />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input value={userData.email} disabled />
                        </Form.Item>
                        <Form.Item label="Phone">
                            <Input value={userData.phone} disabled />
                        </Form.Item>
                        <Form.Item label="Zip Code">
                            <Input value={userData.zipcode} disabled />
                        </Form.Item>
                        <Form.Item label="Company Name">
                            <Input value={userData.company_name} disabled />
                        </Form.Item>
                    </Form>
                )}
                {loading && <p>Loading...</p>}
            </div>
        </div>
    )
}

export default UserProfile