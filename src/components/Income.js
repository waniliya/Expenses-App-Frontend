//this source code is a reference only for next improvement
import React from 'react';
import { useSelector} from "react-redux";



const Income = () => {
	
	const {user} = useSelector((state) => state.auth);

  
     
  return (
    <div><p><strong>RM</strong> {user && user.income}</p></div>
  )
}

export default Income;