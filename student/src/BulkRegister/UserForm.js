import React, { useState } from 'react';

function UserForm(props) {

    const initialFormState = {
        Id: null,
        Name: '',
        Email: '',
        Password: '',
        Status: ''
    }
    const [user, setUser] = useState(initialFormState)


    const handleInputChange = (event) => {
        const { name, value } = event.target
        console.log(event.target);

        setUser({ ...user, [name]: value })
    }

    return (
        <form onSubmit={event => {
            event.preventDefault()
            if (!user.Name || !user.Email || !user.Password) return

            props.addUser(user)
            setUser(initialFormState)
        }}>
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
                                        name="Name"
                                        placeholder="Name"
                                        onChange={handleInputChange}
                                        value={user.Name}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-4 text-left">Email</label>
                                <div className="col-lg-8">
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="Email"
                                        placeholder="ie.xyz@gmail.com"
                                        onChange={handleInputChange}
                                        value={user.Email}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-4 text-left">Password</label>
                                <div className="col-lg-8">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="Password"
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                        value={user.Password}
                                    />
                                </div>
                            </div>

                        </div>
                        <div class="card-footer">
                            <button>Add To Table</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UserForm