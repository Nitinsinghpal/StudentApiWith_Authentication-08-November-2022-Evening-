import React, { useState } from 'react'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function NewPassword(props) {
    const init = {
        email:'',
        password:''
    }
    let [searchParams, setSearchParams] = useSearchParams()
    const [newPassword, setNewPassword] = useState(init)
  const term = searchParams.get("email")
 var navigate = useNavigate();
  const changeHandler = (event)=>{
    setNewPassword({
        email:term,
        [event.target.name]:event.target.value
    })
  }

    const submitClick=()=>{
        // alert('submiy')
        console.log(newPassword);
        if(newPassword!=null)
        {
            axios.post('https://localhost:44358/api/user/submitPassword',newPassword)
        .then((d)=>{
            alert('password changed successfully');
            navigate('/');
        })
        .catch((e)=>{
            alert(e);
        })
        }
        else{
            alert("Password is null");
        }
        

    }
   
    return (
        <div>
            
             <div>
            <div class="row col-lg-4 mx-auto p-4 m-4">
                <div class="card text-center ">
                    <div class="card-header bg-primary text-white">Generate Password</div>
                    <div class="card-body">
                        <div className="form-group row">
                            <label className="col-lg-4 text-left">New Password</label>
                            <div className="col-lg-8">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    onChange={changeHandler}
                                    value={NewPassword.email}
                                />
                            </div>
                        </div>  
                    </div>
                    <div class="card-footer">
                        <input
                            type="button"
                            value="submit"
                            className="btn btn-primary"
                            onClick={submitClick}
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>

    )

}
export default NewPassword



// import React, { Component } from "react";
// // Importing Module
// import queryString from 'query-string'
  
// class NewPassword extends Component {
  
//   state = {
//     email: 'unknown'
//   }
  
//   handleQueryString = () => {
//     // Parsing the query string 
//     // Using parse method
//     let queries = queryString.parse(this.props.location.search)
//     console.log(queries)
//     this.setState(queries)
//   }
  
//   render() {
//     return (
//       <div style={{ margin: 200 }}>
          
// <p> Email: {this.state.email} </p>
  
  
//         <button
//           onClick={this.handleQueryString}
//           className='btn btn-primary'>
//           click me </button>
//       </div>
//     );
//   }
// }
  
// export default NewPassword;