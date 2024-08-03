import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/login";
            const response = await axios.post(url, data);
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/profile");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Invalid email or password. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className={styles.head}>
            <h1 align="center">Welcome to The User Management System Assessment</h1>
            <p align="center">Please log in to continue.</p>
            <div className={styles.login_container}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>Login to Your Account</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn}>
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1 align="center">First time here?</h1>
                        <p><i>Sign up with us!</i></p>
                        <Link to="/signup">
                            <button type="button" className={styles.white_btn}>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
