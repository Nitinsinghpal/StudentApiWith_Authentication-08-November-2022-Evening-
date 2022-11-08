import React, { useState,useEffect } from 'react';
import { Link, useNavigate,navigate } from 'react-router-dom';
import axios from 'axios';
import { Route } from 'react-router-dom';


function Login() {
    
    const initialData = {
        Name: '',
        password: '',
        isChecked: false,
    }
//#region 
    const [loginForm, setLoginForm] = useState(initialData);
    const [IsUserLoggedIn,setIsUserLoggedIn] = useState(false);
//#endregion
    const navigate = useNavigate();
//#region changeHandler    
    const changeHandler = (event) => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
            isChecked: event.target.checked


        });
    }

//#endregion 

  //#region useEffect 
    useEffect(()=>{
            setLoginForm({
                
               isChecked :localStorage.isChecked,
               Name: localStorage.name,
              password: localStorage.password
            });
    },[]);
//#endregion

//#region LoginClick
    const LoginClick = () => {
       debugger;
        console.log(loginForm);
        
        axios.post("https://localhost:44358/api/user", loginForm)
            .then((d) => {
                console.log(d.data);
                if(d.data.IsEmailConfirmed == true)
                {
                    setIsUserLoggedIn(true);
                    
                        navigate('/loginRedirect');
                        
                        
                    
                    if (loginForm.isChecked && loginForm.Name !== "") {
                        // localStorage.userName = loginForm.userName;
                        // localStorage.password = loginForm.password;
                        // localStorage.checkbox = loginForm.isChecked;
                        localStorage.setItem('userName', loginForm.userName);
                        localStorage.setItem('isChecked', loginForm.isChecked);
                        localStorage.setItem('password', loginForm.password);
                        localStorage.setItem('Token', d.data.Token);
                        
                      }
                      else{
                        localStorage.clear();
                    }  
                }
                else if(d.data.IsEmailConfirmed == false && d.data.Name!=null){
                    alert("wrong user name and password");

                }
                else if(d.data.IsEmailConfirmed == false && d.data.Status == "SavedByUser"){
                    alert("please confirm your mail");

                }
                else if(d.data.IsEmailConfirmed == false && d.data.Status == "Saved")
                {
                    alert("You are registered by admin you have to confirm your mail first");
                }
                else if(d.data.IsEmailConfirmed == false){
                    alert("please confirm your mail");

                }
                
                console.log(d.data);
                
               
                
                
                // setLoginForm(initialData);
                // <Route path='/' element={<Login/>} />
            }).catch((e) => {
                alert(JSON.stringify(e));
                setLoginForm(initialData);
            })
    }
//#endregion    


    return (
        <div>
            {/* <div className='nav-link'>
                <Link to='/register'>Register</Link>
            </div> */}
            <div>
                {/* <Header/> */}
                <div>
                    <div class="row col-lg-4 mx-auto p-4 m-4">
                        <div class="card text-center ">
                            <div class="card-header bg-primary text-white">Login</div>
                            <div class="card-body">
                                <div className="form-group row">
                                    <label className="col-lg-4 text-left">UserName</label>
                                    <div className="col-lg-8">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="Name"
                                            placeholder="UserName"
                                            onChange={changeHandler}
                                            value={loginForm.Name}
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
                                            value={loginForm.password}
                                        />
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <Link to="/forgotPassword">Forgot password?</Link>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="checkbox"
                                        checked={loginForm.isChecked}
                                        // id="exampleCheck1"
                                        onChange={changeHandler}
                                        value={loginForm.isChecked}
                                    />

                                <label className="offset-4 form-check-label">Remember Me</label>
                                </div>
                               
                            </div>
                            <div class="card-footer">
                                <input
                                    type="button"
                                    value="Login"
                                    className="btn btn-primary"
                                    onClick={LoginClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Login