import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

let Dashboard=()=>{
    const navigate=useNavigate();

useEffect(()=>{

   if(!localStorage.getItem("token")){
      navigate("/login",{replace:true})
   }

},[])
  
    return(
        <>
        
        <h1 className="text-slate-800 text-2xl text-center font-semibold">Welcome to Dashboard</h1>
        
        <button onClick={()=>{localStorage.clear("token");window.location.reload()}}>Logout</button>
        </>
    )
  
}
 


export default Dashboard