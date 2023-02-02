import React, { useContext, useEffect, useState } from "react"

import { getUserById } from "../../helper/backend_helpers"


const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("authUser"))
  const [currentUser, setCurrentUser] = useState(user)

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}


