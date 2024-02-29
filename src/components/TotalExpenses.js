import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ExpenseTotal = () => {

	const [amountList, setAmountList] = useState([]);

	useEffect(()=> {
		getAmount();
	  },[]); //run unmounted

	const getAmount = async () =>{
		const response = await axios.get('http://localhost:5000/amount');
		setAmountList(response.data)
	  };

	const total = amountList.reduce((total, response) => {
		return (total += response.amount);
	}, 0);

	return (
		<div>
			<p><strong>RM</strong> {total}</p>
			{/*<span>Total Spending: RM{total}</span>*/}
			
		</div>
	);
};

export default ExpenseTotal;