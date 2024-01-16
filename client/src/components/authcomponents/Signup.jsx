import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup  ()  {
  const [registrationDetails, setRegistrationDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted registration details:', registrationDetails);
    setRegistrationDetails({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="card p-5 shadow-lg rounded">
        <h2 className="mb-4 text-center font-weight-bold" style={{ color: '#333' }}>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-muted">Username:</label>
            <input
              type="text"
              name="username"
              value={registrationDetails.username}
              onChange={handleInputChange}
              className="form-control border-bottom"
            />
          </div>
          <div className="mb-3">
            <label className="text-muted">Email:</label>
            <input
              type="email"
              name="email"
              value={registrationDetails.email}
              onChange={handleInputChange}
              className="form-control border-bottom"
            />
          </div>
          <div className="mb-3">
            <label className="text-muted">Password:</label>
            <input
              type="password"
              name="password"
              value={registrationDetails.password}
              onChange={handleInputChange}
              className="form-control border-bottom"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-purple">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;