import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function UncontrolledForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "username" && !value) {
      newErrors.username = "Username is required";
    } else if (name === "email" && !value) {
      newErrors.email = "Email is required";
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = "Please enter a valid email address";
    } else if (name === "password" && (!value || value.length < 8)) {
      newErrors.password = "Password must contain at least 8 symbols";
    } else if (name === "confirmPassword" && value !== passwordRef.current.value) {
      newErrors.confirmPassword = "Passwords do not match";
    } else if (name === "agreed" && !isAgreed) {
      newErrors.agreed = "You must agree to the terms and conditions";
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);
  };

  const handleCheckboxChange = () => {
    const checked = !isAgreed;
    setIsAgreed(checked);
    validateField("agreed", checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uncontrolledFormData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    const newErrors = {};
    Object.keys(uncontrolledFormData).forEach((key) => {
      validateField(key, uncontrolledFormData[key]);
    });

    if (uncontrolledFormData.password !== uncontrolledFormData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!isAgreed) {
      newErrors.agreed = "You must agree to the terms and conditions";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form Submitted", uncontrolledFormData);
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username* </label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          ref={usernameRef}
          onChange={(e) => validateField(e.target.name, e.target.value)}
        />
        {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
      </div>
      <div>
        <label>Email* </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          ref={emailRef}
          onChange={(e) => validateField(e.target.name, e.target.value)}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>
      <div style={{ position: 'relative' }}>
        <label>Password* </label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          ref={passwordRef}
          onChange={(e) => validateField(e.target.name, e.target.value)}
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
        
        <span 
          onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
          className="eye-icon"
        >
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <label>Confirm Password* </label>
        <input
          type={isConfirmPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          ref={confirmPasswordRef}
          onChange={(e) => validateField(e.target.name, e.target.value)}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword}</span>
        )}
        
        <span 
          onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} 
          className="eye-icon"
        >
          <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
        </span>
      </div>

      <div>
        <label className="agree">
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={handleCheckboxChange}
          />
          I agree to the terms and conditions.
        </label>
        {errors.agreed && <span style={{ color: "red" }}>{errors.agreed}</span>}
      </div>

      <button type="submit">Register</button>
      <h1>*Required field</h1>
    </form>
  );
}

export default UncontrolledForm;
