import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLoginUser } from '../../hooks/userdb';

const Login = () => {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [UnameOrEmail, setUnameOrEmail] = useState("");
    const navigate = useNavigate()
    const location = useLocation()
  
    const from = location.state?.from?.pathname || "/"
    
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };
    const handlePasswordChang = (event) => {
        setPasswordInput(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
    
        const registeredUser = JSON.parse(localStorage.getItem('allUser')) || [];
    
        const user = registeredUser.find((user) => user.userName === UnameOrEmail || user.email === UnameOrEmail);
    
        if (user) {
            if (password === user.password) {
                form.reset();
                setUnameOrEmail()
                addLoginUser(user)
                toast('Login Successful');
            } else {
                toast('Wrong password');
            }
        } else {
            toast('Username or Email not found');
        }
        navigate(from, {replace: true})
    };
    

    return (
        <div>
            <div className="hero min-h-screen md:my-2">
                <div className="md:w-3/12 w-full">
                    <div className="card  mx-5 md:mx-0 border-[1px] border-slate-300 rounded-none shadow-2xl bg-white">
                        <form onSubmit={handleSubmit}>
                            <div className="card-body w-full">
                                <h1 className="text-3xl mb-3 font-bold">Login now!</h1>
                                <div className="form-control">
                                    <input type="text" name="name" required="required" value={UnameOrEmail} onChange={(e) => setUnameOrEmail(e.target.value)} placeholder="User Name or Email *" className="input-field" />
                                </div>
                                <div className="form-control">
                                    <input type={passwordType} required="required" name="password" onChange={handlePasswordChang} placeholder="Password *" className="input-field" />
                                    <div className="text-end -mt-10 mr-5">
                                        <button onMouseUp={togglePassword}>
                                            {passwordType === "password" ? (
                                                <FaEye></FaEye>
                                            ) : (
                                                <FaEyeSlash></FaEyeSlash>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <ToastContainer/>
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card mx-5 md:mx-0 border-[1px] border-slate-300 rounded-none shadow-2xl bg-white my-3">
                        <p className="px-10 py-5">
                            <p> Don't have an account? <Link to="/signup">
                                <span className="text-secondary font-semibold hover:font-bold"> Sign Up</span>
                            </Link></p>

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

