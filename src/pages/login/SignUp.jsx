import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userAddTodb } from "../../hooks/userdb";

const SignUp = () => {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate()
    const from = "/login"

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
        const id = new Date().getTime().toString();
        const form = e.target;
        const fullName = form.full_name.value;
        const userName = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const tasks = [];
        const user = { id, fullName, userName, email, password, tasks };
        userAddTodb(user)
        form.reset()
        toast('Sign Up Successful');
        navigate(from, { replace: true })
    };

    return (
        <div>
            <div className="hero min-h-screen md:my-2">
                <div className="md:w-3/12 w-full">
                    <div className="card  mx-5 md:mx-0 border-[1px] border-slate-300 rounded-none shadow-2xl bg-white">
                        <form onSubmit={handleSubmit}>
                            <div className="card-body w-full">
                                <h1 className="text-3xl mb-3 font-bold">SignUp now!</h1>
                                <div className="form-control">
                                    <input type="text" name="full_name" placeholder="Full Name" className="input-field" />
                                </div>
                                <div className="form-control">
                                    <input type="text" name="name" required="required" placeholder="User Name *" className="input-field" />
                                </div>
                                <div className="form-control">
                                    <input type="email" name="email" required="required" placeholder="Email *" className="input-field" />
                                </div>
                                <div className="form-control">
                                    <input type={passwordType} name="password" required="required" onChange={handlePasswordChang} placeholder="Password *" className="input-field" />
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
                                    <input className="btn btn-primary" type="submit" value="Sign Up" />
                                    <ToastContainer />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card mx-5 md:mx-0 border-[1px] border-slate-300 rounded-none shadow-2xl bg-white my-3">
                        <p className="px-10 py-5">
                            <p> Have an account ? <Link to="/login">
                                <span className="text-secondary font-semibold hover:font-bold"> Login</span>
                            </Link></p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;