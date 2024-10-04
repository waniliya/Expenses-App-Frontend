import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { getMe } from '../features/authSlice';
import axios from "axios";
import "./Dashboard.css";



const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  //const {user} = useSelector((state) => state.auth);
  const {id} = useParams();
  
 
  /* for add record purpose */
  const [nametype, setNameType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(()=> {
    const getUserById = async () => {
      try {
      const response=await axios.get(`http://localhost:5000/user/${id}`);
      console.log(response.data.uuid);

      } catch (error) {
        if (error.response){
          setMsg(error.response.data.msg);
      }
           
  }
};
  getUserById();
  },[id]);
  

  const addRecord = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/record',{
        nametype:nametype,
        category:category,
        amount:amount
      });
      window.location.reload();
      navigate("/dashboard");
    } catch (error) {
      if (error.response){
        setMsg(error.response.data.msg);
      }
    }
  };



  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);

  //display list record
  const [record, setRecord] = useState([]);

  useEffect(()=> {
    getRecord();
  },[]); //run unmounted

  const getRecord = async () =>{
    const response = await axios.get('http://localhost:5000/record');
    setRecord(response.data)
  };

  const deleteRecord = async (recordId) => {
    await axios.delete(`http://localhost:5000/record/${recordId}`);
    window.location.reload();
    getRecord();
    
  }



  return (
   
    <div id="dashboard" >
      <Layout></Layout>
    <div className="container text-center mt-3 bg-light rounded border-opacity-25 pb-3 pt-3 h-100" >
        <div className="d-flex flex-row" id="panel">
        {/* ------------------list of record-------------------*/}
        <div className="col p-2 " >
        <h5>Your Expenses record</h5>
        <div className="overflow-auto h-50 m-20 p-20">
        <ol className="list-group list-group-numbered mt-3" >
          {record.map((record,index)=>(
              <li key={record.uuid} className="list-group-item d-flex justify-content-between align-items-start rounded mb-2">
              <div className="ms-2 me-auto">
              <p><strong>Date: </strong>{new Date(record.createdAt).toLocaleDateString()}{" "}</p>
              <div className="fw-bold">{record.category}</div>
              <p>{record.nametype}</p>
              
              </div>
              <span className="badge bg-danger rounded-pill">- RM {record.amount}</span>
              <button onClick={() => deleteRecord(record.uuid)} type="submit" className="btn-close ms-1" aria-label="Close"></button>
              </li>
          ))}
          
        </ol>
        </div>
        </div>

        

        {/* ------------------------form new record------------------------*/}
        <div className="col p-2">
        <form onSubmit={addRecord}>
            <h5>Add new record</h5>
        <div className="form-floating mb-3 mt-3">
        <p className="text-center bg-warning">{msg}</p>
        <input type="text" className="form-control" id="floatingInput" value={nametype} 
                onChange={(e) => setNameType(e.target.value)} placeholder="shopping/salary/bills"/>
        <label for="floatingInput">Record's name</label>
        </div>

        <div className="form-floating mb-3">
        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" 
          value={category} onChange={(e) => setCategory(e.target.value)}>
        
        <option value="Loan" >Loan</option>
        <option value="Food & Drinks">Food & Drinks</option>
        <option value="Transportation" >Transportation</option>
        <option value="Entertainment" >Entertainment</option>
        <option value="Bills" >Bills</option>
        <option value="Housing" >Housing</option>
        <option value="Charity" >Charity</option>
        <option value="Shopping" >Shopping</option>
        <option value="Gas" >Gas / Petrol</option>
        </select>
        <label for="floatingSelect">Choose the category of expense</label>

        </div>
        <div className="form-floating">
        <input type="number" className="form-control" id="floatingInput" value={amount} 
                onChange={(e) => setAmount(e.target.value)} placeholder="Amount"/>
        <label for="floatingInput">Amount RM:</label>
        </div>
        <button type="submit" className="btn btn-primary mt-3" id="add">Add Record</button>
        
        </form>
        
        {/*<Link /*to={`/dashboard/edit/${user.uuid}`} relative="path" className="btn btn-success mt-3 ms-2">Set Income</Link>*/}

        </div>
        
        </div>
        </div>

     
        <footer className="py-3 my-4" >
          <p className="text-center text-muted">waniliya @ 2023</p>
        </footer>
     </div>
     
  )
}

export default Dashboard
