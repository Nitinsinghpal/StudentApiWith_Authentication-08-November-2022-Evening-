import React from 'react'

const Table = (props) => (
  <form onSubmit={props.handleSubmit} >
    <table className='table table-striped table-bordered table-striped table-active'>
      <thead> 
        <tr>
          <th>Check</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{console.log(props.users)}
        {props.users.length > 0 ? (
          props.users.map((user) => (

            <tr key={user.Email}>
              {user.Id == 0 && user.Status !=='Saved' && user.Status !=='SavedByUser'? (
                <td className='text-center'>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isChecked"
                    // checked={props.isChecked}
                    id="exampleCheck1"
                    onChange={props.handleChange}
                    value={user.Email}
                  // {[user.Id,user.Email,user.Name,user.Password]}
                  // { firstName: first, age, city = "Paris" } = person;
                  />

                </td>
              ) : (
                <td className='text-center'>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checkbox"
                    // checked={loginForm.isChecked}
                    // // id="exampleCheck1"
                    // onChange={changeHandler}
                    // value={loginForm.isChecked}
                    disabled
                  />


                </td>

              )}


              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Password}</td>
              <td className='text-primary'>{user.Status}</td>

              <td>
                <button
                  onClick={() => props.deleteUser(user.Email)}
                  className="btn btn-danger">Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No Users</td>
          </tr>
        )}

      </tbody>
    </table>
    <button>Send</button>
  </form>
)

export default Table