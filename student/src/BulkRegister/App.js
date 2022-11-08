import React, { useState, useEffect } from 'react'
import Table from './Table';
import UserForm from './UserForm';
import axios from 'axios';
const BulkApp = () => {

    //#region  States   

    const usersData = []
    // const filterData = []
    const initialFormState = { Id: null, Name: '', Password: '', Email: '', Status: 'Saved' }
    const [users, setUsers] = useState(usersData)
    const [sendUser, setSendUser] = useState()
    const [checkedArray, SetCheckedArray] = useState([])
    const [checkedFilter, SetCheckedFilter] = useState([])

    const [editing, setEditing] = useState(false)
    const [currentUser, setCurrentUser] = useState(initialFormState)
    //#endregion





    //#region addUser
    const addUser = (user) => {
        var registered = 0;
        users.map((d) => {
            if (d.Email == user.Email) {
                alert("Email already registered");
                registered = 1
            }

        })
        if (registered == 0) {
            user.Id = 0;

            setUsers([...users, user])
            console.log(users);
        }


    }

    //#endregion

    //#region UseEffect()   
    useEffect(() => {
            getAll();


        }, [])


    //#endregion

    //#region Commented Code
    // useEffect(() => {
    //     console.log("filterDatafilterData", checkedFilter)
    // }, [checkedFilter])
    //#endregion

    //#region getAll
    const getAll = () => {

        var res = axios.get(`https://localhost:44358/api/register`)
            .then((res) => {
                setUsers(res.data);
            }).catch((err) => {
                console.log(err);
            });

    }
    //#endregion

    //#region SendStateData
    const SendStateData = () => {
        console.log('data', users);
        alert("SendStateData");
        const filterData = users.filter(list => {
            return (
                list.Id == 0
            )
        });
        console.log(filterData);
        if(filterData!=null)
        {
            var res = axios.post(`https://localhost:44358/api/register/BulkRegister`, filterData)
            .then((result) => {
                getAll();
            }).catch((e) => {
                console.log(e);
            })

        console.log(filterData);
        }
        else{
            alert("can't send null data");
        }
       
    }
    //#endregion

    //#region DeleteUser
    const deleteUser = (email) => {
        setUsers(users.filter((user) => user.Email !== email))
        var del = users.filter((user) => user.Email == email)
        console.log(del[0].Id);
        axios.delete("https://localhost:44358/api/register/" + del[0].Id)
            .then((d) => {
                alert('data deleted successfully');
            })
            .catch((e) => {
                console.log(e);
            })

    }
    //#endregion

    //#region handleChange
    const handleChange = (e) => {

        var checked = e.target.checked;
        var value = e.target.value;

        console.log(value);
        console.log(value + ',', 'checked :' + checked);
        if (checked) {
            SetCheckedArray([...checkedArray, value])

        }
        else {
            SetCheckedArray(checkedArray.filter((e) => e !== value))
        }

        console.log(checkedArray);
    }
    //#endregion

    //#region HandleSubmit and Post data

    const handleSubmit = (e) => {
        alert("handleSubmit");
        e.preventDefault();
        console.log(checkedArray);

        var finalList = [];
        checkedArray.map((email) => {
            users.map((d) => {
                if (d.Email == email) {
                   
                    finalList.push(d);
                    

                    // setUsers(...users,d)
                    // console.log(d);
                    // SetCheckedFilter(...checkedFilter,d)

                    // setCurrentUser({ Id: d.Id, Name: d.Name, Password: d.Password, Status: 'Saved' })
                    // console.log(currentUser);
                    // console.log(d.Name, d.Email);
                }
            })

        })
        if (finalList.length == 0) {
            alert("Select data");
        }
        else {
            axios.post("https://localhost:44358/api/register/BulkRegister", finalList)
                .then((d) => {
                    debugger;

                    checkedArray.map((email)=>{
                        users.map((user)=>{
                            if(user.Email==email)
                            {
                                setUsers(prevState =>{
                                    const newState = users.map((user)=>{
                                        if(user.Email == email)
                                        {
                                            return {...user,Status:"Saved"};
                                        }
                                        return user;
                                    });
                                    return newState;
                                })  
                            }
                        });
                    });
                    // users.map((user)=>{
                    // if(user.Status =="Saved")
                    // {
                    //     var value=user.Status="Saved"
                    //     setUsers(...user,value)

                    // }
                    // else if(user.Status == "SavedByUser")
                    // {
                    //     var value=user.Status="SavedByUser"
                    //     setUsers(...user,value)

                    // }
                    // else{
                    //     var value=user.Status=""
                    //     setUsers(...user,value)

                    // }
                })
                .catch((e) => {
                    console.log(e);
                })
        }
        console.log(currentUser);
        console.log(checkedFilter);
        console.log(finalList);

    }
    //#endregion
    return (
        <div className="container">

            <div className="text-center">
                <div className="flex-large">
                    <h2>Bulk Register</h2>
                    <h2>Add user</h2>
                    <UserForm addUser={addUser} />


                </div>
            </div>
            <div className="text-center">
                <div className="flex-large">
                    <h2>Users</h2>
                    <Table users={users} deleteUser={deleteUser} handleChange={handleChange} handleSubmit={handleSubmit} />

                </div>
            </div>
            <form onSubmit={event => {
                event.preventDefault()
                SendStateData()
            }}>
                <button>Send UnSaved Users</button>
            </form>
        </div>
    )
}

export default BulkApp
