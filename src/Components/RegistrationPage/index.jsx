import React from "react";
import ControlledForm from '../ControlledForm';
import UncontrolledForm from '../UncontrolledForm';

function RegistrationPage() {
  return (
    <div className="container">
      <div className="controlled">
        <h2>Controlled Components</h2>
        <ControlledForm />
      </div>

      <div className="uncontrolled">
        <h2>Uncontrolled Components</h2>
        <UncontrolledForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
