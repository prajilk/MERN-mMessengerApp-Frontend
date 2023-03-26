import { HiKey, HiEye, HiEyeOff, HiMail } from "react-icons/hi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"
import WaitingForResModal from "./Components/Modal/WaitingForResModal";

export default function Signin() {

    const [passVisibility, setPassVisibility] = useState(<HiEye />);
    const [modal, setModal] = useState(false);

    const changePassVisibility = () => {
        if (passVisibility.type === HiEye) {
            setPassVisibility(<HiEyeOff />)
            document.getElementById('password').type = 'text';
        } else {
            setPassVisibility(<HiEye />)
            document.getElementById('password').type = 'password';
        }
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();

    const onLogin = (e) => {
        e.preventDefault();
        setModal(true);
        axios.post("/signin",
            {
                email,
                password
            }
        ).then(() => {
            setModal(false);
            return navigate('/');
        }).catch((res)=>{
            setModal(false);
            if (res.response.data.error) setLoginError(true)
        })
    };

    return (
        <div className="login-page">
            <div className="logo-container">
                <img src={process.env.PUBLIC_URL + "/logo_w.png"} alt="..." />
            </div>
            <div className="card auth-card shadow col-10 col-sm-7 col-md-7 col-lg-4 py-3">
                <form onSubmit={onLogin}>
                    <h3>Sign in</h3>
                    <p>Log in to your account</p>
                    {loginError ?
                        <p className="bg-danger px-2 py-1 text-white rounded">
                            <small>Email or password is incorrect! try again.</small>
                        </p> : ''
                    }
                    <div className="input-wrapper mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                        <i className="input-icons"><HiMail /></i>

                    </div>
                    <div className="input-wrapper mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                        <i className="input-icons"><HiKey /></i>
                        <i className="pass-visibility" onClick={changePassVisibility}>{passVisibility}</i>
                    </div>
                    <button className="btn" type="submit">Sign in</button>
                </form>
            </div>
            <div className="outside-card">
                <p>Don't you have an account? <span><Link to="/signup">Sign up</Link></span></p>
            </div>
            {modal && <WaitingForResModal/>}
        </div>
    )
}