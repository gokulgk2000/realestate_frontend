

export const isAuthenticated =()=>{
   const user=localStorage.getItem("authUser")
   
if(user&&JSON.parse(user)?.userID){
    return true
}
return false
}

export const logout=()=>{

   localStorage.removeItem('authUser')
 
}
