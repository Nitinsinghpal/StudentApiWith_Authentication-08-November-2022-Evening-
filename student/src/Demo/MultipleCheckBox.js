import React,{useState} from 'react'

function MultipleCheckBox() {

    const [fruitArray, SetFruitArray] = useState([])

    const handleChange = (e) =>{
        var value = e.target.value;
        var checked = e.target.checked;
        console.log(value);
        console.log(checked);
        if(checked)
        {
            SetFruitArray([
                ...fruitArray,value
            ])
        }
        else{
            SetFruitArray(fruitArray.filter((e)=> e !==value ))
        }
    }

    const handleSumit = (e) =>{
        e.preventDefault();
        console.log(fruitArray);
    }

  return (
    <div>
        <form className='form-group' onSubmit={handleSumit}>
            <label htmlFor='' > Select fruits: &nbsp;</label>
            <input type="checkbox" name="fruits" value="Apple" onChange={handleChange}/>
            <label htmlFor=''>Apple</label> 

              <input type="checkbox" name="fruits" value="Mango"  onChange={handleChange}/>
            <label htmlFor=''>Mango</label> 

            <input type="checkbox" name="fruits" value="Banana"  onChange={handleChange}/>
            <label htmlFor=''>Banana</label> 

            <input type="checkbox" name="fruits" value="Grapes"  onChange={handleChange}/>
            <label htmlFor=''>Grapes</label>     

            <input type='submit' value="Submit"/>
        </form>

    </div>
  )
}

export default MultipleCheckBox