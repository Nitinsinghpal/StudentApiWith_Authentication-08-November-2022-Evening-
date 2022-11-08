import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DemoBulkRegister() {

    var initialData = [
        {
            name: '',
            email: '',
            password: ''
        }];
    const [registerForm, setregisterForm] = useState(initialData);
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    


    const changeHandler = (event) => {
        setregisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });
    }

    function renderClass() {
        let classRows = [];
        registerForm?.map((items) => {
            classRows.push(
                <tr key={items.email}>
                    <td>{items.name}</td>
                    <td>{items.email}</td>
                    <td>{items.password}</td>


                </tr>
            )
        });
        console.log(classRows);
        return classRows;
    }
    function registerClick() {
        alert("registerClick");
        setregisterForm({
            
        })
        console.log(initialData);
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






// ------------------------------------Table----------------------------------------------


            <div className='col-9 p-4 m-4'>
                <table className='table table-striped table-bordered table-striped table-active'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>email</th>
                            <th>password</th>

                            {/* <th>Actions</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {renderClass()}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DemoBulkRegister