//this source code is a reference only for next improvement

import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// 5. The reduceer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
	switch(action.type) {
		case 'GET_TRANSACTIONS':
		  return {
			...state,
			loading: false,
			transactions: action.payload
		  }
		case 'DELETE_TRANSACTION':
		  return {
			...state,
			transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
		  }
		case 'ADD_TRANSACTION':
		  return {
			...state,
			transactions: [...state.transactions, action.payload]
		  }
		  case 'SET_BUDGET':
			return {
				...state,
				budget: action.payload,
			};
		case 'TRANSACTION_ERROR':
		  return {
			...state,
			error: action.payload
		  }
		default:
		  return state;
	  }
};

// 1. Sets the initial state when the app loads
const initialState = {
	budget: 2500,
	transactions: [],
	error:null,
	loading:true
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
	// 4. Sets up the app state. takes a reducer, and an initial state
	const [state, dispatch] = useReducer(AppReducer, initialState);

	async function getTransactions() {
		try {
		  const res = await axios.get('/api/v1/transactions');
	
		  dispatch({
			type: 'GET_TRANSACTIONS',
			payload: res.data.data
		  });
		} catch (err) {
		  dispatch({
			type: 'TRANSACTION_ERROR',
			payload: err.response.data.error
		  });
		}
	  }
	
	  async function deleteTransaction(id) {
		try {
		  await axios.delete(`/api/v1/transactions/${id}`);
	
		  dispatch({
			type: 'DELETE_TRANSACTION',
			payload: id
		  });
		} catch (err) {
		  dispatch({
			type: 'TRANSACTION_ERROR',
			payload: err.response.data.error
		  });
		}
	  }
	
	  async function addTransaction(transaction) {
		const config = {
		  headers: {
			'Content-Type': 'application/json'
		  }
		}
	
		try {
		  const res = await axios.post('http://localhost:5000/record', transaction, config);
	
		  dispatch({
			type: 'ADD_TRANSACTION',
			payload: res.data.data
		  });
		} catch (err) {
		  dispatch({
			type: 'TRANSACTION_ERROR',
			payload: err.response.data.error
		  });
		}
	  }

	// 5. Returns our context. Pass in the values we want to expose
	return (
		<AppContext.Provider
			value={{
				transactions: state.transactions,
    			error: state.error,
				budget: state.budget,
    			loading: state.loading,
    			getTransactions,
    			deleteTransaction,
    			addTransaction
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
};