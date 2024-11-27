import { useState, useContext } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext';
import "./login.css"; // Ensure this file is updated with new styles

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const { setUserId } = useContext(UserContext);

    axios.defaults.withCredentials = true;

    async function logUser(e) {
        e.preventDefault();
        const { email, password } = data;
        try {
            const result = await axios.post("/login", { email, password });
            console.log("rsult",result)
            if (result.data.Status) {
                localStorage.setItem("valid", true);
                toast.success(`Login Successful. Welcome!`);
                const id = result.data.id;
                setUserId(id);
                navigate(`/dashboard`);
            } else {
                toast.error(result.data.error || "Failed to Login");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to navigate to the admin registration page
    const navigateToRegister = () => {
        navigate('/adminRegister');
    }

    return (
        <div className="bg">
            <div className="cont" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={logUser}>
                        <h2 className="h1">Admin</h2>
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        {/* Flex container for the buttons */}
                        <div className="button-container">
                            <button type="submit" className="btnSign">Sign In</button>
                            <button
                                type="button"
                                className="btnSign"
                                onClick={navigateToRegister}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
