import React from 'react'

const Notification = (props) => {
  return (
    <>
    {props.notifications &&
        props.notifications.map((notification, i) => {
          return (
            <>
            <div  className='rounded w-96 bg-white hover:bg-gray-400 hover:cursor-pointer
              transition ease-in-out duration-200 text-black px-4 py-4 text-md flex gap-4 items-center'>
            <h1 className='extra-bold'>{notification.id}.</h1>
                <div>
                  <h1 className='extra-bold'>{notification.title}</h1>
                  <p className='mb-2 text-sm'>{notification.content}</p>
                  <span className='bg-blue text-white text-sm rounded-full py-0.5 px-2'>{notification.status}</span>
                </div>   
            </div>
            <hr />
            </>
          );
        })
    }
 </>
  )
}

export default Notification