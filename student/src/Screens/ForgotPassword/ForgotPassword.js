import axios from 'axios'
import React, { useState } from 'react'

function ForgotPassword() {
    const init = {
        email:""
    }

    const [form , setform] =useState(init)

   const changeHandler=(event)=>{
        setform(
            
           { [event.target.name]:event.target.value}
        )
        
    }

    const sendMail=()=>{
        console.log(form);
        // var str = form.toString();
        // console.log(str);
        debugger;
        if(form!=null)
        {
            axios.post('https://localhost:44358/api/user/forgotPassword',form)
            .then((d)=>{
                 alert("check Your Mail");
            })
            .catch((e)=>{
     
            })
        }
        else{
            alert("please enter your mail Id");
        }
      
    }
  return (   
    <div>
       
        <div>
            <div class="row col-lg-4 mx-auto p-4 m-4">
                <div class="card text-center ">
                    <div class="card-header bg-primary text-white">Forgot Password</div>
                    <div class="card-body">
                        <div className="form-group row">
                            <label className="col-lg-4 text-left">Email</label>
                            <div className="col-lg-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    onChange={changeHandler}
                                    // value={loginForm.email}
                                />
                            </div>
                        </div>  
                    </div>
                    <div class="card-footer">
                        <input
                            type="button"
                            value="submit"
                            className="btn btn-primary"
                            onClick={sendMail}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>


  )
}

export default ForgotPassword