import { useState } from "react";
import { createContext } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const initialToken = JSON.parse(localStorage.getItem('token'))
  const initialUserEmail = JSON.parse(localStorage.getItem('userEmail'))

  const [userEmail,setUserEmail] = useState(initialUserEmail)

  const [token, setToken] = useState(initialToken)

  const handleSetToken = t => {

    if (t) {
      setToken(t)
      /* Cookies.set('token',t,{expires: 7}) */
      localStorage.setItem('token',JSON.stringify(t))
      
    } else {
      setToken(null)
      /* Cookies.remove('token') */
      localStorage.removeItem('token')
     
    }
  }



  const handleSetUserEmail = email =>{
    if (email){
    setUserEmail(email)
    /* Cookies.set('userEmail',email,{expires: 7}) */
    localStorage.setItem('userEmail',JSON.stringify(email))
    }

    else {
      /* Cookies.remove('userEmail') */
      localStorage.removeItem('userEmail')
      setUserEmail(null)
    }
  }

  const [user,setUser] = useState('')

  const login = async (body) => {

    const res = await fetch('https://shipment.fadiramzi.dev/api/admin/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        
        
      }
    })

    const response = await res.json()
    
    if (res.ok) {
      handleSetToken(response.data.token)
      handleSetUserEmail(response.data.phone)
      console.log('hi',response.data)
      localStorage.setItem("userData", JSON.stringify(response.data));
      
    } else {
      handleSetToken(null)
      handleSetUserEmail(null)
      throw Error(response.message)
      localStorage.removeItem("userData")
    }
   
  }



  
/*   const checkLogin = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch('http://localhost:5000/v1/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token

        }
      })


      if (!res.ok) {
        handleSetToken(null)
      }
    } catch (error) {
      handleSetToken(null)
    }
  }, [token])

  const isMount = useRef(false)

  useEffect(() => {
    if (!isMount.current) {
      checkLogin()
      isMount.current = true
    }
  }, [checkLogin]) */






  const logout = () => {
    handleSetToken(null)
    handleSetUserEmail(null)
    localStorage.removeItem("userData")
  }












/* Get Users */
const [us,setUS] = useState('')
const getAllUsers = async () => {
  console.log(token)
  const res = await fetch('https://shipment.fadiramzi.dev/api/admin/v1/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })

  const response = await res.json()
  
  if (res.ok) {
    return response.data
    
  } else {
  
    throw Error(response.message)
    
  }
 
}





  return <AuthContext.Provider value={{ isAuth: !!token, login, logout, userEmail, getAllUsers,token}}>
    {children}
  </AuthContext.Provider>
}