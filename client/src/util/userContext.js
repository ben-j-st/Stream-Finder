import React, { createContext, useState } from 'react'

export const UserContext = createContext()


const initialState = {
	firstName: "Ben",
    lastName: "",
    email: "",
    search: "",
    isLoggedOn: false,
    lastSearch: "",
    isAdmin: false,
    searchData: []
}

export function UserProvider(props) {
	const [user, setUser] = useState(initialState)

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{props.children}
		</UserContext.Provider>
	)
}