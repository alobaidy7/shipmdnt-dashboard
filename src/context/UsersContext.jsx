import React from 'react'
import { createContext } from 'react'
import { useState,useEffect } from 'react'

const UsersContext = createContext()



const UsersContextProvider = ({children}) =>{
  
  /* Notifications */

  const notifications = [
    {
       id:1,
       title:"notey 1",
       content:"this is the content of notification",
       status:"checking",
       created_at:'1901/12/2',
       created_by:'system',
    },
 
    {
       id:2,
       title:"notey 2",
       content:"this is the content of notification",
       status:"checking",
       created_at:'1901/12/2',
       created_by:'system',
    },
 
    {
       id:3,
       title:"notey 3",
       content:"this is the content of notification",
       status:"checking",
       created_at:'1901/12/2',
       created_by:'system',
    },
   ]



   /* Users */
  const users = [
    {

      id:1,
      
      name:"Fadi Ramzi",
      
      username:"fadi",
      
      email:"fadi@email.com",
      
      phone:"+9647713123456",
      
      status:"active"
      
      },
      
      {
      
          id:2,
          
          name:"Hussein",
          
          username:"hussd",
          
          email:"hussein@email.com",
          
          phone:"+9647713324156",
          
          status:"active"
          
          },
      
          {
      
              id:3,
              
              name:"Ahmed",
              
              username:"ahmed",
              
              email:"ahmed@email.com",
              
              phone:"+9647713123456",
              
              status:"active"
              
              },

              {
      
                id:2,
                
                name:"Hussein",
                
                username:"hussd",
                
                email:"hussein@email.com",
                
                phone:"+9647713324156",
                
                status:"active"
                
                },

                {
      
                  id:2,
                  
                  name:"Hussein",
                  
                  username:"hussd",
                  
                  email:"hussein@email.com",
                  
                  phone:"+9647713324156",
                  
                  status:"active"
                  
                  },

                  {
      
                    id:2,
                    
                    name:"Hussein",
                    
                    username:"hussd",
                    
                    email:"hussein@email.com",
                    
                    phone:"+9647713324156",
                    
                    status:"active"
                    
                    },

                    {
      
                      id:2,
                      
                      name:"Hussein",
                      
                      username:"hussd",
                      
                      email:"hussein@email.com",
                      
                      phone:"+9647713324156",
                      
                      status:"active"
                      
                      },

                      {
      
                        id:2,
                        
                        name:"Hussein",
                        
                        username:"hussd",
                        
                        email:"hussein@email.com",
                        
                        phone:"+9647713324156",
                        
                        status:"active"
                        
                        },

                        {
      
                          id:2,
                          
                          name:"Hussein",
                          
                          username:"hussd",
                          
                          email:"hussein@email.com",
                          
                          phone:"+9647713324156",
                          
                          status:"active"
                          
                          },
  ]





  const orders = [
    {

        order_number:1,
        
        name:"Fadi Ramzi",
        
        phone:"07713123456",
        
        status:"completed"
        
        },

        {

            order_number:2,
            
            name:"Hussein Dhia",
            
            phone:"078401234569",
            
            status:"pending"
            
            },

            {

                order_number:3,
                
                full_name:"Ahmed Mohammed",
                
                phone:"+964123456789",
                
                status:"completed"
                
                },

                {

                    order_number:4,
                    
                    full_name:"Mohammed Ali",
                    
                    phone:"079012354212",
                    
                    status:"pending"
                    
                    }
]




const customers = [
  {
    id: 1,

    name: "Fadi Ramzi",

    username: "fadi",

    email: "fadi@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 2,

    name: "Hussein",

    username: "hussd",

    email: "hussein@email.com",

    phone: "+9647713324156",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },

  {
    id: 3,

    name: "Ahmed",

    username: "ahmed",

    email: "ahmed@email.com",

    phone: "+9647713123456",

    status: "active",
  },


 
];






const ordersReport = [
  {
    ordernum: '1',	
    username: 'hussein',
    phone:'12345678901',	
    status: 'checking',
    details: 'no details',
    datetime: '2023-01-03'
  },

  {
    ordernum: '2',	
    username: 'ali',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2023-01-27'
  },

  {
    ordernum: '3',	
    username: 'jasim',
    phone:'12345678901',	
    status: 'checking',
    details: 'details',
    datetime: '2023-01-19'
  },

  {
    ordernum: '4',	
    username: 'fadi',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '5',	
    username: 'ahmed',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },


  {
    ordernum: '6',	
    username: 'abbas',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '7',	
    username: 'kadhim',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '8',	
    username: 'abdullah',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '9',	
    username: 'salam',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '3',	
    username: 'jasim',
    phone:'12345678901',	
    status: 'checking',
    details: 'details',
    datetime: '2023-01-19'
  },

  {
    ordernum: '4',	
    username: 'fadi',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '5',	
    username: 'ahmed',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },


  {
    ordernum: '6',	
    username: 'abbas',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },

  {
    ordernum: '7',	
    username: 'kadhim',
    phone:'12345678901',	
    status: 'pending',
    details: 'any details',
    datetime: '2022-12-01'
  },


]



/* Get Users */
const getAllUsers = async () => {

  const res = await fetch('Https://shipment.fadiramzi.dev/api/admin/v1/auth/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const response = await res.json()
    
  if (res.ok) {
    handleSetToken(response.data.token)
    handleSetUserEmail(response.data.email)
    console.log('hi',response.data)
    localStorage.setItem("userData", JSON.stringify(response.data));
    
  } else {
    handleSetToken(null)
    handleSetUserEmail(null)
    throw Error(response.message)
    localStorage.removeItem("userData")
  }
}




/* Get Specific User */
const getSpecificUser = async () => {

  const res = await fetch('Https://shipment.fadiramzi.dev/api/admin/v1/auth/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const response = await res.json()
    
  if (res.ok) {
    handleSetToken(response.data.token)
    handleSetUserEmail(response.data.email)
    console.log('hi',response.data)
    localStorage.setItem("userData", JSON.stringify(response.data));
    
  } else {
    handleSetToken(null)
    handleSetUserEmail(null)
    throw Error(response.message)
    localStorage.removeItem("userData")
  }
}


















/* Create User */
const createNewUser = async (body) => {

  const res = await fetch('Https://shipment.fadiramzi.dev/api/admin/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const response = await res.json()
    
    if (res.ok) {
      handleSetToken(response.data.token)
      handleSetUserEmail(response.data.email)
      console.log('hi',response.data)
      localStorage.setItem("userData", JSON.stringify(response.data));
      
    } else {
      handleSetToken(null)
      handleSetUserEmail(null)
      throw Error(response.message)
      localStorage.removeItem("userData")
    }
   
  }





  return(
    <UsersContext.Provider value = {{users,orders,customers,ordersReport,notifications}}>
      {children}
    </UsersContext.Provider>
  )
}

export {UsersContextProvider,UsersContext}