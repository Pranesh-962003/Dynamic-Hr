import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './start.css';
import AdminLogin from './Pages/Login';
import EmployeeLogin from './Pages/EmployeeLogin';

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('https://dynamic-hr-backend-8zgg.onrender.com/verify')
      .then(result => {
        if (result.data.Status) {
          if (result.data.role === "admin") {
            navigate('/dashboard');
          } else {
            navigate('/EmpDashboard/employee_detail/' + result.data.id);
          }
        }
      })
      .catch(err => console.log(err));
  }, [navigate]);

  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage" style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/flat-lay-clean-office-desk_23-2148219267.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="rounded w-65 border loginForm h-60" style={{ marginTop: "-10%", background: "white" }}>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className={`activeButton btn mx-2 ${!isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(false)}
            >
              Employee
            </button>
            <button
              type="button"
              className={`activeButton btn mx-2 ${isAdmin ? 'active' : ''}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin
            </button>
          </div>
          <div className="login-container">
            <div className="loginform">
              {isAdmin ? <AdminLogin /> : <EmployeeLogin />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
