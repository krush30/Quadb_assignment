const checkValidate = (email, password) => {
    const checkPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    const checkEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    if (checkEmail === false) return "Please enter correct email";
    if (checkPassword === false) return "Your password is wrong";

    return null;
}
export default checkValidate;
