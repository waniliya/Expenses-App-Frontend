import React, {useState, useEffect} from 'react';
//import { useParams} from 'react-router-dom';
import { useDispatch} from "react-redux";
import Navbar from '../components/Navbar';
import ExpenseTotal from '../components/TotalExpenses';
import axios from 'axios';
import { getMe } from '../features/authSlice';
import "./Layout.css";


const Layout = (children) => {
  //const [income, setIncome] = useState("");
  //const [msg, setMsg] = useState("");
  //const navigate = useNavigate();
  //const {user} = useSelector((state) => state.auth);
 // const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch]);


  /*useEffect(()=> {
    const getIncome = async () =>{
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`);
        setIncome(response.data.income)
      } catch (error) {
        if (error.response){
          setMsg(error.response.data.msg);
        }
      }
      
    };
    getIncome();
  },[id]);*/ //run unmounted

  const [record, setRecord] = useState([]);
 

  useEffect(()=> {
    getRecord();
  },[]); //run unmounted

  const getRecord = async () =>{
    const response = await axios.get('http://localhost:5000/record');
    setRecord(response.data);
  };
  

 
  /*console.log(record.reduce((a,v)=> a=a+v.amount,0));*/

  const totalLoan = record.reduce((total, response) => {
    if(response.category==='Loan'){
      total += response.amount;
    }
    return total;
		
	}, 0);

  const totalFood = record.reduce((total, response) => {
    if(response.category==='Food & Drinks'){
      total += response.amount;
    }
    return total;
		
	}, 0);

  const totalEnt = record.reduce((total, response) => {
    if(response.category==='Entertainment'){
      total += response.amount;
    }
    return total;
		
	}, 0);

  const totalTrans = record.reduce((total, response) => {
    if(response.category==='Transportation'){
      total += response.amount;
    }
    return total;
		
	}, 0);
  
  const totalBill = record.reduce((total, response) => {
    if(response.category==='Bills'){
      total += response.amount;
    }
    return total;
		
	}, 0);
  const totalHouse = record.reduce((total, response) => {
    if(response.category==='Housing'){
      total += response.amount;
    }
    return total;
		
	}, 0);
  const totalCharity = record.reduce((total, response) => {
    if(response.category==='Charity'){
      total += response.amount;
    }
    return total;
		
	}, 0);
  const totalShop = record.reduce((total, response) => {
    if(response.category==='Shopping'){
      total += response.amount;
    }
    return total;
		
	}, 0);
  const totalGas = record.reduce((total, response) => {
    if(response.category==='Gas'){
      total += response.amount;
    }
    return total;
		
	}, 0);
  
  /*const filtered = record.filter(obj => {
      if(obj.category === 'Bills') {
        return obj.amount;
      }
   
    
  });

  console.log(filtered);*/
 

  
  return (
    <React.Fragment>
        <Navbar/>
        <div className="container-fluid">
        <h4 className="text-center mt-2 mb-2" id="stext"><strong>Your Total Spending: </strong><ExpenseTotal/></h4>
        <p className="text-center mt-2 mb-2" id="stext"><i>"You must gain control over your money or the lack of it will forever control you." - Dave Ramsey</i></p>
        <div className="container text-center mt-3 bg-light rounded border-opacity-25" >
          
        <div className="row rounded" id="panel">
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-bank"></i></strong></h5>
         <p><strong>Loan</strong></p>
         <p>RM {totalLoan}</p>
        </div>
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-cup-straw"></i></strong></h5>
         <p><strong>Food & Drinks</strong></p>
         <p>RM {totalFood}</p>
        </div>
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-joystick"></i></strong></h5>
         <p><strong>Entertainment</strong></p>
         <p>RM {totalEnt}</p>
        </div>
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-train-front"></i></strong></h5>
         <p><strong>Transportation</strong></p>
         <p>RM {totalTrans}</p>
        </div>
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-receipt"></i></strong></h5>
         <p><strong>Bills</strong></p>
         <p>RM {totalBill}</p>
        </div>
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-house"></i></strong></h5>
         <p><strong>Housing</strong></p>
         <p>RM {totalHouse}</p>
        </div>
        <div className="col mt-3"> 
         <h5><strong><i className="bi bi-box2-heart"></i></strong></h5>
         <p><strong>Charity</strong></p>
         <p>RM {totalCharity}</p>
        </div>
        <div className="col mt-3"> 
        <h5><strong><i className="bi bi-cart"></i></strong></h5>
        <p><strong>Shopping</strong></p>
        <p>RM {totalShop}</p>
        </div>
        <div className="col mt-3"> 
        <h5><strong><i className="bi bi-fuel-pump"></i></strong></h5>
        <p><strong>Gas</strong></p>
        <p>RM {totalGas}</p>
        </div>
        </div>
         </div>
    </div>
        
    </React.Fragment>
  )
}

export default Layout