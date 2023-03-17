import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [copyPassword, setCopyPassword] = useState("");

  const [usersData, setUsersData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    facebook: "",
  });

  const [error, setError] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    facebook: "",
  });

  const handleChange = (e) => {
    setUsersData({
      ...usersData,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
    setCopyPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName } = usersData;

    const userErros = {
      fullName: "",
      userName: "",
      email: "",
      phone: "",
      password: "",
      facebook: "",
    };

    if (fullName === "") {
      userErros.fullName = "Full Name is required";
    } else if (fullName.length < 3) {
      userErros.fullName = "Full Name must be greater then 3";
    }

    const regexUserName = /^[a-zA-Z0-9_-]{3,16}$/;

    if (userName === "") {
      userErros.userName = "User Name is required";
    } else if (!regexUserName.test(userName)) {
      userErros.userName = "User name is not valid";
    }

    const regexEmail = /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

    if (email === "") {
      userErros.email = "Email Address is required";
    } else if (!regexEmail.test(email)) {
      userErros.email = "Valid email is required";
    }

    const regexPhone = /^(?:\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

    if (phone === "") {
      userErros.phone = "Phone Number is required";
    } else if (!regexPhone.test(Number(phone))) {
      userErros.phone = "Phone Number is not valid";
    }

    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password === "") {
      userErros.password = "Password is required";
    } else if (!regexPassword.test(password)) {
      userErros.password =
        "At least one lowercase letter one uppercase letter one digit one special character minimum length of 8 characters ";
    }

    const regexFacebookUrl =
      /(http:\/\/)?(https:\/\/)?(www)?\.?(facebook)\.\w.+\/\w.+/gim;

    if (facebook === "") {
      userErros.facebook = "Facebook url is required";
    } else if (!regexFacebookUrl.test(facebook)) {
      userErros.facebook = "Valid Facebook url is required";
    }

    setError(userErros);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(copyPassword);

    if (copyPassword) {
      toast.success("Password copied successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const { fullName, userName, email, phone, password, facebook } = usersData;

  return (
    <div className="box">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            onChange={handleChange}
            value={fullName}
            name="fullName"
            type="text"
            className={`form-control shadow-none ${
              error.fullName && "border-danger"
            }`}
          />
          <span className="text-danger">{error.fullName}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            onChange={handleChange}
            value={userName}
            name="userName"
            type="text"
            className={`form-control shadow-none ${
              error.userName && "border-danger"
            }`}
          />
          <span className="text-danger">{error.userName}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            onChange={handleChange}
            value={email}
            name="email"
            type="email"
            className={`form-control shadow-none ${
              error.email && "border-danger"
            }`}
          />
          <span className="text-danger">{error.email}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            onChange={handleChange}
            value={phone}
            name="phone"
            type="text"
            className={`form-control shadow-none ${
              error.phone && "border-danger"
            }`}
          />
          <span className="text-danger">{error.phone}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="groups position-relative">
            <input
              onChange={handleChange}
              value={password}
              name="password"
              type={`${showPassword ? "text" : "password"}`}
              className={`form-control shadow-none ${
                error.password && "border-danger"
              }`}
            />
            {showPassword ? (
              <AiOutlineEye
                onClick={handleShowPassword}
                className="pass-icon"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={handleShowPassword}
                className="pass-icon"
              />
            )}
            <TbCopy onClick={handleCopyPassword} className="copy" />
          </div>
          <span className="text-danger">{error.password}</span>
        </div>

        <div className="mb-3">
          <label className="form-label">Facebook URL</label>
          <input
            onChange={handleChange}
            value={facebook}
            name="facebook"
            type="text"
            className={`form-control shadow-none ${
              error.facebook && "border-danger"
            }`}
          />
          <span className="text-danger">{error.facebook}</span>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
