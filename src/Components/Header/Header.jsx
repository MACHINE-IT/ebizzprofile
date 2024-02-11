import { message } from 'antd';
import './Header.css';
import { useTheme } from '../Theme/themeProvider';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { isDarkTheme, toggleTheme } = useTheme();

    const userProfile = () => {
        navigate("/user-profile");
    };

    const userLogin = () => {
        navigate("/login");
    };

    const userSignUp = () => {
        navigate("/signup");
    };

    const userLogout = () => {
        localStorage.clear();
        message.success("Logged out successfully");
        navigate("/login");
    }

    return (
        <>
            <div className='header-outer'>
                <div id="user-profile" onClick={userProfile}>
                    User Profile
                </div>
                <div className='login-register'>
                    {localStorage.getItem("token") ? (
                        <div id="user-logout" onClick={userLogout}>
                            Logout
                        </div>
                    ) : (
                        <>
                            <div id="user-signup" onClick={userSignUp}>
                                Signup
                            </div>
                            <div id="user-login" onClick={userLogin}>
                                Login
                            </div>
                        </>
                    )}
                    <div style={{cursor: 'pointer'}} onClick={toggleTheme} className='theme-switcher'>
                        {isDarkTheme ? <FiSun size={25} /> : <FiMoon size={25} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header