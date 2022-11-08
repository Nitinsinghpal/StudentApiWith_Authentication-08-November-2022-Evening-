import React, { useState } from 'react'

function UseState() {

    const obj ={
        name:"nitin",
        age:25,
        salary:200
    }
    const ArrayOfObj =[
        {
            name:"nitin",
            age:25,
            salary:200
        },
        {
            name:"singh",
            age:45,
            salary:6465
        }
    ]
    const [temp, setTemp] = useState(obj)
    const [arr , setArr] = useState(ArrayOfObj)

    // const ChangeArray = () =>{
        // setArr(previous=>{
        //     return {
        //         ...previous,
        //         name:"Changed"
        // }

        // setArr(previos=>{
        //     return [
        //         ...arr,
        //         {...previos,name:"changed"}
        //     ]
        // })
        // console.log(arr);
        // }
    const ChangeArray = ()=>{
        alert("chbmbnbmbnm")
        debugger;
        setArr(prevState =>{
           const newState= prevState.map(obj =>{
                if(obj.name === "nitin") 
                {
                    return {...obj,name:"Nitin Singh"};
                }
                return obj;
            });
            return newState;
        });
        console.log(arr);
    }

    const change = () =>{
        debugger;
        setTemp((previousState)=>{
            return {
                ...previousState,
                name:"Nitin Singh"
            }
        })
    }

    // const ChangeArray = () =>{
    //     setArr(previous=>{
    //         return [
    //             ...previous,
    //             50
    //     ]

    //     })
    // }
  return (
    <>
    <div className='text-center'>
        <h2>{temp.name}</h2>
        <h2>{temp.age}</h2>
        <h2>{temp.salary}</h2>
        <button onClick={change}>Click to change </button>

    </div>
    <div>
        <h1>Array Of Object</h1>
        
        {arr.map((a,i)=>{
            return(
           <div key={i}>
            <h1>{a.name}</h1>
            <h1>{a.age}</h1>
            <h1>{a.salary}</h1>
            <button onClick={ChangeArray}>Click</button>
            </div>
            )
        })}
        
        
    </div>
    </>
  )
}

export default UseState





// ---------------------------------------------------------------------------------------




// import {useState} from 'react';

// const UseState = () => {
//   const initialState = [
//     {id: 1, country: 'Austria'},
//     {id: 2, country: 'Belgium'},
//     {id: 3, country: 'Canada'},
//   ];

//   const [data, setData] = useState(initialState);

//   const updateState = () => {
//     // 👇️ passing function to setData method
//     debugger;
//     setData(prevState => {
//       const newState = prevState.map(obj => {
//         // 👇️ if id equals 2, update country property
//         if (obj.id === 2) {
//           return {...obj, country: 'Denmark'};
//         }

//         // 👇️ otherwise return object as is
//         return obj;
//       });

//       return newState;
//     });
//   };

//   return (
//     <div>
//       <button onClick={updateState}>Update state</button>

//       {data.map(obj => {
//         return (
//           <div key={obj.id}>
//             <h2>id: {obj.id}</h2>
//             <h2>country: {obj.country}</h2>
//             <hr />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default UseState;

