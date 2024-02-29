//this source code is a reference only for next improvement

import React, {useState, useEffect} from 'react';
import { useSelector} from "react-redux";
import axios from 'axios';


const Balance = () => {
	const {user} = useSelector((state) => state.auth);
	//const { expenses, income } = useContext(AppContext);

	//calculate total expenses
	const [amountList, setAmountList] = useState([]);

	useEffect(()=> {
		getAmount();
		
	  },[]); //run unmounted

	const getAmount = async () =>{
		const response = await axios.get('http://localhost:5000/amount');
		setAmountList(response.data)
	  };

	  

	const totalExpenses = amountList.reduce((totalExpenses, response) => {
		return (totalExpenses += response.amount);
	}, 0);

	

	//

	//const alertType = totalExpenses > income ? 'alert-danger' : 'alert-success';

	return (
		<div /*class={`alert p-4 ${alertType}`}*/>
			<p><strong>RM</strong> {user && user.income - totalExpenses}</p>
		</div>
	);
};

export default Balance;