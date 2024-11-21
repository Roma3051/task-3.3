import React, { useState } from "react";
import { validateForm } from "../../helpers/utils"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ControlledForm() {
  const [controlledFormData, setControlledFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleControlledChange = (e) => {
    const { name, value } = e.target;

    setControlledFormData({
      ...controlledFormData,
      [name]: value,
    });

    const validationErrors = validateForm({
      ...controlledFormData,
      [name]: value,
    });
    setErrors(validationErrors);
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsAgreed(checked);

    setErrors({
      ...errors,
      agreed: checked ? "" : "You must agree to the terms and conditions",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(controlledFormData);
    if (!isAgreed) {
      validationErrors.agreed = "You must agree to the terms and conditions";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted", controlledFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username* </label>
        <input
          type="text"
          name="username"
          value={controlledFormData.username}
          placeholder="Enter your username"
          onChange={handleControlledChange}
        />
        {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
      </div>
      <div>
        <label>Email* </label>
        <input
          type="email"
          name="email"
          value={controlledFormData.email}
          placeholder="Enter your email"
          onChange={handleControlledChange}
        />
        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
      </div>
      <div style={{ position: 'relative' }}>
        <label>Password* </label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          value={controlledFormData.password}
          placeholder="Enter your password"
          onChange={handleControlledChange}
        />
        {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}

        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="eye-icon">
          <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <label>Confirm Password* </label>
        <input
          type={isConfirmPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          value={controlledFormData.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleControlledChange}
        />
        {errors.confirmPassword && (
          <span style={{ color: "red" }}>{errors.confirmPassword}</span>
        )}

        <span onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} className="eye-icon">
          <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
        </span>
      </div>

      <div>
        <label className="agree">
          <input
            type="checkbox"
            name="agreed"
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

export default ControlledForm;
