import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'

const ErrorMessage = (props) => {


   


  return (
<>
    {/* Select to Export */}




{props.isErrorFound.isError?( <Dialog open={props.isErrorFound.isError} onClose={() => {props.setIsErrorFound({isError:false, message: ''})}} className="relative z-50 p-8">
<div className='fixed inset-0 flex items-center justify-center p-4"'>
<Dialog.Panel className="w-full px-8 py-8 max-w-sm rounded bg-white">
  <Dialog.Title>Error</Dialog.Title>
  <Dialog.Description>
    <div className='border-black'>
      
      <div className='flex gap-6 my-4'>
      
      <p>{props.isErrorFound.message}</p>

      </div>

      
      <div className='flex gap-4 items-center py-4'>
        <button className='gray text-sm medium py-2 px-4' onClick={() => {props.setIsErrorFound({isError:false,message:''})}}>OK</button>
      </div>
      
     

    </div>

  </Dialog.Description>

  

 
</Dialog.Panel>
</div>

</Dialog>):null}





    
    
    </>
  
  )
}


export default ErrorMessage