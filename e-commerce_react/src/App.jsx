import React, { useState } from 'react'

const App = () => {

  const [number, setnumber] = useState(5)

  const [array, setarray] = useState([1,2,3,4,6,5,8])

  const increment =()=>{
    setnumber((prev)=>prev+1)
  }
  const decrement=()=>{
    setnumber((prev)=>prev-1)
  }

  const deleteitem =()=>{
    setarray(()=>{
        return array.filter((elem,index)=> index !== array.length-1)
        
    })
  }
  



  return (
    <div>
      <h1>hello guys</h1>
     
      <button onClick={increment}>+</button>
        <h1>{number}</h1>
      <button onClick={decrement}>-</button>
      <h1>{array}</h1>
      <div>
        {
          array.map((elem,index)=>{
            return <li>{elem}</li>
          })
        }
      </div>

      
        {/* {
          array.map((elem,index)=>{
           const last = length(array)

          })
        } */}

          
        
      
      <button onClick={deleteitem}>del</button>
    </div>
  )
}

export default App