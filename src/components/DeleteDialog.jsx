import React from 'react'
import { Dialog } from '@headlessui/react'

const DeleteDialog = (props) => {
  return (
    
    <>
     {/* Deletion Confirmation */}
     
     {props.deleteConfirm ? (
        <Dialog
          open={props.deleteConfirm}
          onClose={() => props.setDeleteConfirm(false)}
          className="relative z-50 p-8"
        >
          <div className='fixed inset-0 flex items-center justify-center p-4"'>
            <Dialog.Panel className="w-full px-8 py-8 max-w-sm rounded bg-white">
              <Dialog.Title>Delete User</Dialog.Title>
              <Dialog.Description>
                <div className="flex gap-4 items-center py-4 px-4">
                  <button
                    className="text-white text-sm medium bg-black py-2 px-4"
                    onClick={() => {
                      props.deleteUser();
                      props.setDeleteConfirm(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="text-white text-sm medium gray py-2 px-4"
                    onClick={() => {
                      props.setDeleteConfirm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      ) : null}
    </>

  )
}

export default DeleteDialog