import React, { useContext } from 'react'
import { MyContext } from '../MyContext';

const Cities = () => {
    const { text, setText } = useContext(MyContext);
  return (

    <div>
        {text || "NA"}
    </div>
  )
}

export default Cities