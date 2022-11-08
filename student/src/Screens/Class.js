import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { json } from 'react-router-dom';

function Class() {
    const[classs, setClass] = useState(null);
    const[classForm, setClassForm] = useState({
        ClassName:"",
        Id:0
    });
    

    const changeHandler =((event)=>{
        console.log(event.target.value)
        setClassForm({
            ...classForm,
            [event.target.name]:event.target.value
        });
        
    })

    useEffect(()=>{
        getAll();
    },[])


    function editClick(item) {
        setClassForm({
            ...item
        });
        console.log(item.ClassName)
        // setEmployeeForm({
        //   ...item,
        //   department: item.department._id,
        //   designation: item.designation._id,
        // });
      }

      const updateClick = () => {
        //alert("update");
        // var formdata = new FormData();
        // //formdata.append()
        // alert(formdata)
        axios.put("https://localhost:44358/api/class",classForm)
        .then((d)=>{
           getAll();
        }).catch((e)=>{
            alert("something went wrong");
        });
      };  

      function deleteClick(id){
        alert(id);
        axios.delete("https://localhost:44358/api/class/"+id)
        .then((d)=>{
            getAll();
        }).catch((e)=>{
            alert(json.stringify(e));
        });
      }
    function getAll(){
        
        axios.get("https://localhost:44358/api/class").then((d)=>{
            setClass(d.data);
            console.log(d.data)
            //alert(json.Stringify(d.data.data));
        }).catch((d)=>{
            alert('No data found');
        })
    }

    function renderClass(){
        let classRows=[];
        classs?.map((items)=>{
            classRows.push(
                <tr>
                    <td>{items.ClassName}</td>
                    
                    <td>
                        <button className='btn btn-info p-2 m-2'
                        data-target="#editModal"
                        data-toggle="modal"
                        onClick={() => {
                            editClick(items);
                          }}
                          
                        >
                          Edit
                        </button>
                        <button className='btn btn-danger p-2 m-2' onClick={()=>deleteClick(items.Id)}>Delete</button>
                    </td>
                </tr>
            )
        });
        return classRows;
    }

    const saveClick = () =>{
        axios.post("https://localhost:44358/api/class",classForm).then((d)=>{
           getAll();
        }).catch((e)=>{
            alert("something went wrong with api");
        });
    };


  return (
    <div>
        <h2 className='text-primary text-center'>
            Class Form
        </h2>
        <div className='row p-3 m-3'>
            <div className='col-9 text-left'>
                <h2 className='text-left'>Class List</h2>
            </div>
            <div className='col-3'>
                <button className='btn btn-info' data-toggle="modal" data-target="#newModal">New Class</button>
            </div>
        </div>
        <div className='col-9 p-4 m-4'>
            <table className='table table-striped table-bordered table-striped table-active'>
                <thead>
                    <tr>
                        <th>ClassName</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {renderClass()}
                </tbody>
            </table>
        </div>

        {/* SAVE */}

        <form>
            <div className='modal' id='newModal' role="dialog">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3 className='modal-title text-primary m-2 p-2'>New Class</h3>
                            <button type='button' className='close' data-dismiss="modal" aria-label='close'>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Class</label>
                                <input id='txtName'
                                    placeholder='enter class name'
                                    type='text'
                                    name='ClassName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={classForm.ClassName}
                                />
                            </div>
                           
                           <div className='modal-footer'>
                                <button type='button'
                                className='btn btn-primary'
                                data-dismiss="modal"
                                onClick={saveClick}
                                
                                >Save

                                </button>
                                <button type='button'
                                className='btn btn-danger'
                                data-dismiss="modal"
                                
                                >Cancel

                                </button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>


        {/* Edit */}


        <div className='modal' id='editModal' role="dialog">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3 className='modal-title text-primary m-2 p-2'>New Class</h3>
                            <button type='button' className='close' data-dismiss="modal" aria-label='close'>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Class</label>
                                <input id='txtName'
                                    placeholder='enter name'
                                    type='text'
                                    name='ClassName'
                                    
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={classForm.ClassName}

                                />
                            </div>
                          
                           <div className='modal-footer'>
                                <button type='button'
                                className='btn btn-primary'
                                data-dismiss="modal"
                                onClick={updateClick}
                                >Update

                                </button>
                                <button type='button'
                                className='btn btn-danger'
                                data-dismiss="modal"
                                
                                >Cancel

                                </button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Class