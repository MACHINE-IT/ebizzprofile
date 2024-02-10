import { message } from "antd";

export const validateInput = (data) => {
    console.log(data);
    const { userEmail, userPassword, confirmPassword, firstName, lastName, userPhone } = data;

    if (!firstName) {
        message.error("First name is a required field");
        return false;
    }
    if (firstName.length < 3) {
        message.error("First name must be at least 6 characters");
        return false;
    }
    if (firstName.length > 32) {
        message.error("First name must be at most 32 characters");
        return false;
    }
    if (!lastName) {
        message.error("Last name is a required field");
        return false;
    }
    if (lastName.length < 3) {
        message.error("Last name must be at least 6 characters");
        return false;
    }
    if (lastName.length > 32) {
        message.error("Last name must be at most 32 characters");
        return false;
    }
    if (!userPassword) {
        message.error("Password is a required field");
        return false;
    }
    if (userPassword.length < 8) {
        message.error("Password must be at least 8 characters");
        return false;
    }
    if (userPassword.length > 32) {
        message.error("Password must be at most 32 characters");
        return false;
    }
    if (userPassword !== confirmPassword) {
        message.error("Passwords do not match");
        return false;
    }
    if (userEmail.length > 100) {
        message.error("Email must be at most 100 characters");
        return false;
    }
    if (userPhone.length !== 10) {
        message.error("Phone number must be 10 digits");
        return false;
    }
    return true;
};