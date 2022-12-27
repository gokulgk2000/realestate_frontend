import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getUserById } from "../../helper/backend_helpers"


const UserContext = React.createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("authUser"))
  const [currentUser, setCurrentUser] = useState(user)
  useEffect(() => {
    if (currentUser) {
      const handleFetching = async () => {
        const res = await getUserById({ userID: currentUser.userID })
        if (res.success) {
            setCurrentUser(res.User)
        }
      }

      handleFetching()
    }
    return () => {}
  }, [currentUser])

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

UserProvider.propTypes = {
  children: PropTypes.any,
}
