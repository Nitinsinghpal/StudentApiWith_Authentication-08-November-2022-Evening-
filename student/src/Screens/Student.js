import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { json } from 'react-router-dom';

function Student() {
    const initValues = {
        StudentId:0,
        StudentName:"",
        StudentAge:0,
        StudentAdhaarNo:0,
        StudentClassId:0,
        GuardianId:0,
        GStudentId:0,
        FatherName:"",
        FatherOccupation:"",
        FatherSalary:0,
        MotherName:"",
        MotherOccupation:""
    };
    const[student, setStudents] = useState(null);
    const[studentForm, setStudentForm] = useState(initValues);

    const changeHandler =((event)=>{
        setStudentForm({
            ...studentForm,
            [event.target.name]:event.target.value
        });
    })

    useEffect(()=>{
        getAll();
    },[])


    function editClick(item) {
        console.log(item);
        console.log(studentForm);
        setStudentForm(item);
        // setEmployeeForm({
        //   ...item,
        //   department: item.department._id,
        //   designation: item.designation._id,
        // });
      }

      const updateClick = () => {
        alert("updateClick");
        console.log(studentForm);
        axios.put("https://localhost:44358/api/student",studentForm)
        .then((d)=>{
           getAll();
        }).catch((e)=>{
            alert("something went wrong");
        });
      };  

      function deleteClick(id){
        alert(id);
        axios.delete("https://localhost:44358/api/student/"+id)
        .then((d)=>{    
            getAll(); 
        }).catch((e)=>{
            alert(json.stringify(e));
        });
      }
    function getAll(){
        axios.get("https://localhost:44358/api/student").then((d)=>{
            setStudents(d.data);
            console.log(d.data)
            //alert(json.Stringify(d.data.data));
        }).catch((e)=>{
            alert('No data found');
        })
    }

    function renderStudent(){
        let studentRows=[];
        student?.map((items)=>{
            studentRows.push(
                <tr>
                    <td>{items.StudentName}</td>
                    <td>{items.StudentAge}</td>
                    <td>{items.StudentAdhaarNo}</td>
                    <td>{items.FatherName}</td>

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
                        <button className='btn btn-danger p-2 m-2' onClick={()=>deleteClick(items.StudentId)}>Delete</button>
                    </td>
                </tr>
            )
        });
        return studentRows;
    }

    const saveClick = () =>{
        
        console.log(studentForm);
        axios.post("https://localhost:44358/api/student",studentForm).then((d)=>{
            console.log(d.data);
           getAll();
        }).catch((e)=>{
            alert("something went wrong with api");
        });
    };


  return (
    <div>
        <h2 className='text-primary text-center'>
            Student Form
        </h2>
        <div className='row p-3 m-3'>
            <div className='col-9 text-left'>
                <h2 className='text-left'>Student List</h2>
            </div>
            <div className='col-3'>
                <button className='btn btn-info' data-toggle="modal" data-target="#newModal">New Student</button>
            </div>
        </div>
        <div className='col-9 p-4 m-4'>
            <table className='table table-striped table-bordered table-striped table-active'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Adhaar No</th>
                        <th>Father Name</th>
                        
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {renderStudent()}
                </tbody>
            </table>
        </div>

        {/* SAVE */}

        <div className='modal' id='newModal' role="dialog">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3 className='modal-title  m-2 p-2 text-primary '>Add New Student</h3>
                            <button type='button' className='close' data-dismiss="modal" aria-label='close'>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Name</label>
                                <input id='txtName'
                                    placeholder='enter name'
                                    type='text'
                                    name='StudentName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.StudentName}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Age</label>
                                <input id='txtAge'
                                    placeholder='enter age'
                                    type='text'
                                    name='StudentAge'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.StudentAge}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Student AdhaarNo</label>
                                <input id='txtAge'
                                    placeholder='enter adhaar no'
                                    type='text'
                                    name='StudentAdhaarNo'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.StudentAdhaarNo}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Name</label>
                                <input id='txtAge'
                                    placeholder='Enter Father Name'
                                    type='text'
                                    name='FatherName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.FatherName}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Occupation</label>
                                <input id='txtAge'
                                    placeholder='Enter Father Occupation'
                                    type='text'
                                    name='FatherOccupation'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.FatherOccupation}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father FatherSalary</label>
                                <input id='txtAge'
                                    placeholder='Enter Father Salary'
                                    type='text'
                                    name='FatherSalary'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.FatherSalary}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Mother Name</label>
                                <input id='txtAge'
                                    placeholder='Enter Mother Name'
                                    type='text'
                                    name='MotherName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.MotherName}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Mother Occupation</label>
                                <input id='txtAge'
                                    placeholder='Enter Mother Occupation'
                                    type='text'
                                    name='MotherOccupation'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.MotherOccupation}
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


        {/* Edit */}


        <form>
            <div className='modal' id='editModal' role="dialog">
                <div className='modal-dialog'>
                    <div className='modal-content'> 
                        <div className='modal-header'>
                            <h3 className='modal-title text-primary m-2 p-2'> Edit Student</h3>
                            <button type='button' className='close' data-dismiss="modal" aria-label='close'>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Student Name</label>
                                <input id='txtName'
                                    placeholder='enter Student Name'
                                    type='text'
                                    name='StudentName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.StudentName}
                                />
                            </div>
                           
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Age</label>
                                <input id='txtAge'
                                    placeholder='enter age'
                                    type='text'
                                    name='StudentAge'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.StudentAge}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Student AdhaarNo</label>
                                <input id='txtAge'
                                    placeholder='enter adhaar no'
                                    type='text'
                                    name='StudentAdhaarNo'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.StudentAdhaarNo}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Class Id</label>
                                <input id='txtAge'
                                    placeholder='enter StudentClassId'
                                    type='text'
                                    name='StudentClassId'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.StudentClassId}
                                />
                            </div>
                           
                            
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Name</label>
                                <input id='txtAge'
                                    placeholder='enter Father Name'
                                    type='text'
                                    name='FatherName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.FatherName}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Occupation</label>
                                <input id='txtAge'
                                    placeholder='enter Father Occupation'
                                    type='text'
                                    name='FatherOccupation'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.FatherOccupation}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Salary</label>
                                <input id='txtAge'
                                    placeholder='enter Father Salary'
                                    type='text'
                                    name='FatherSalary'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.FatherSalary}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Mother Name</label>
                                <input id='txtAge'
                                    placeholder='enter Mother Name'
                                    type='text'
                                    name='MotherName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.MotherName}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Mother Occupation</label>
                                <input id='txtAge'
                                    placeholder='enter Mother Occupation'
                                    type='text'
                                    name='MotherOccupation'
                                    className='form-control'
                                    onChange={changeHandler}
                                    value={studentForm.MotherOccupation}
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
        </form>



{/* ----------------------------------------------------------------------------------------------------------------------------------- */}
       
       {/* #EDIT */}


       {/* <form>

        <div className='modal' id='editModal' role="dialog">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3 className='modal-title  m-2 p-2 text-primary '>Edit Student</h3>
                            <button type='button' className='close' data-dismiss="modal" aria-label='close'>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Name</label>
                                <input id='txtName'
                                    placeholder='enter name'
                                    type='text'
                                    name='name'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.StudentName}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Age</label>
                                <input id='txtAge'
                                    placeholder='enter age'
                                    type='text'
                                    name='StudentAge'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.StudentAge}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Student AdhaarNo</label>
                                <input id='txtAge'
                                    placeholder='enter adhaar no'
                                    type='text'
                                    name='StudentAdhaarNo'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.StudentAdhaarNo}
                                />
                            </div>
                            <div className='form-group row p-2 m-2'>
                                <label htmlFor='txtName'>Father Name</label>
                                <input id='txtAge'
                                    placeholder='enter Father Name'
                                    type='text'
                                    name='FatherName'
                                    className='form-control'
                                    onChange={changeHandler}
                                    values={studentForm.FatherName}
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
        </form>     */}
{/* ---------------------------------------------------------------------------------------------------------------------------------------------------             */}
    </div>
  )
}

export default Student