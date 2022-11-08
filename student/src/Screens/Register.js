import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {

    const initialData = {
        name: '',
        email:'',
        password: ''
    }
    const [registerForm, setregisterForm] = useState(initialData);
    const navigate = useNavigate();
    
    const changeHandler = (event) => {
        setregisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });
    }


    const registerClick = () => {
        
        // alert(registerForm);
        axios.post("https://localhost:44358/api/register", registerForm)
            .then((d) => {
                debugger;
                console.log(d.data);
                if(d.data.Email=="true")
                {
                    alert("Email already exists");                    
                }
                else{
                    navigate('/login');
                    alert("Registered successfully,check yor mailbox to confirm the mail");
                    setregisterForm(initialData)
                }
                // alert(d.data);
               
                // localStorage.setItem('token',d.data.Token);
            }).catch((e) => {
                alert(JSON.stringify(e));
                setregisterForm(initialData);
            })
    }


    return (
        <div>
            {/* <div>Login</div> */}
            <div>
                {/* <Header/> */}
                <div>
                    <div class="row col-lg-4 mx-auto p-4 m-4">
                        <div class="card text-center ">
                            <div class="card-header bg-primary text-white">Register</div>
                            <div class="card-body">
                            <div className="form-group row">
                                    <label className="col-lg-4 text-left">UserName</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="UserName"
                                            onChange={changeHandler}
                                            value={registerForm.name}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-4 text-left">Email</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email"
                                            onChange={changeHandler}
                                            value={registerForm.email}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-lg-4 text-left">Password</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            onChange={changeHandler}
                                            value={registerForm.password}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <input
                                    type="button"
                                    value="Register"
                                    className="btn btn-primary"
                                    onClick={registerClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Register