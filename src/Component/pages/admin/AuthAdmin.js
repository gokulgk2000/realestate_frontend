import { Navigate, useNavigate } from "react-router-dom"



export const isAuthAdmin =()=>{

    const admin=localStorage.getItem("authAdmin")


 if(admin&&JSON.parse(admin)?.username){
     return true
 }
 return false
 }


 
 export const logout=()=>{
   

    localStorage.removeItem('authAdmin')
    
  
   
 }
