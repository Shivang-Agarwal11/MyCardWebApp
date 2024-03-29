import React, { createContext, useContext, useState } from "react"


const StateContext = createContext()

export const ContextProvider = ({ children }) => {
	const [login, setLogin] = useState(() =>
		JSON.parse(localStorage.getItem("role"))
	)
	const [userData, setUserData] = useState(() =>
		JSON.parse(localStorage.getItem("userData"))
	)
	const [orgData, setOrgData] = useState(() =>
		JSON.parse(localStorage.getItem("orgData"))
	)
	const [adminData, setAdminData] = useState(() =>
		JSON.parse(localStorage.getItem("adminData"))
	)
	const [orgDetails, setOrgDetails] = useState(null)

	const [orgUser, setOrgUser] = useState(false)

	const [getUserDetails,setUserDetails]=useState(null)

	return (
		<StateContext.Provider
			value={{
				login,
				setLogin,
				userData,
				setUserData,
				orgData,
				setOrgData,
				adminData,
				setAdminData,
				orgDetails,
				setOrgDetails,
				orgUser, setOrgUser,
				getUserDetails,
				setUserDetails,
			}}>
			{children}
		</StateContext.Provider>
	)
}
export const useStateContext = () => useContext(StateContext)