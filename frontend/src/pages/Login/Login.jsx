import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/Login_image.jpg';
import regImg from '../../assets/RegImage.jpg';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axiosapi from '../../services/axiosapi';
import SignUp from '../Signup/SignUp';

function Login() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });
    const [registerActive, setRegisterActive] = useState(false);

    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserDetails((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    function handleRegisterButtonClick() {
        setRegisterActive(current => !current)
    }

    //generating the token once the user login
    async function login(e) {
        e.preventDefault();
        const response = await axiosapi.post("/generate-token", { 
            'username': userDetails.email, 
            'password': userDetails.password
        }, {
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        });
        if (response.status === 200) {
            const data = response.data
            console.log(data)
            swal({
                title: "Welcome!",
                text: "User logged In Successfully!",
                icon: "success",
            });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } else {
            swal("Wrong Credentials", "Something went wrong!", "error")
        }
    }

    return (
        <>
            <Navbar />
            <div className='main'>
                <div 
                    className='details'
                    style={registerActive ? {transform: 'translateX(100%)', marginRight: '0', borderRight: '1px solid #e8d2f0', borderLeft: 'none', borderBottomRightRadius: '40px', borderTopRightRadius: '40px', borderTopLeftRadius: '0', borderBottomLeftRadius: '0', boxShadow: '20px 20px 21px 0px rgba(232,210,240,0.62)'} : {}}
                >
            {registerActive ? (
                <SignUp handleRegisterButtonClick={handleRegisterButtonClick}/>
            ) : (
                <>
                        <h2>Login to your account</h2>
                        <form onSubmit={login}>
                            <label>Email</label>
                            <input value={userDetails.email} onChange={handleInputChange} type="email" name="email" id="" placeholder='Email' required />
                            <label>Password</label>
                            <input value={userDetails.password} onChange={handleInputChange} type="password" name="password" id="" placeholder='Password' required />
                            <button type='submit'>Sign In</button>
                        </form>
                        <div className='registerLink'><p>Don't have an account? </p><p onClick={handleRegisterButtonClick} className='registerClick'>Register here</p></div>
                </>
            )}
            </div>
            <div 
                className='loginImage'
                style={{transform: registerActive ? 'translateX(-100%)' : '', marginLeft: registerActive ? '35px' : ''}}
            >
                {registerActive ? (
                    <img src={regImg} alt="" />
                ) : (
                    <img src={img} alt="" />
                )}
                
            </div>
        </div>
        </> 
    )
}

export default Login