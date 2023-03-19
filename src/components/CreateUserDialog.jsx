import React from 'react'
import { Dialog , Switch  } from '@headlessui/react'



const CreateUserDialog = (props) => {
  return (
    <>
{/* Create Dialoge */}
{props.isOpen ? (
        <Dialog
          open={props.isOpen}
          onClose={() => props.setIsOpen(false)}
          className="relative z-50 p-8"
        >
          <div className='fixed inset-0 flex items-center justify-center p-4"'>
            <Dialog.Panel className="w-full px-8 py-8 max-w-sm rounded bg-white">
              <Dialog.Title>Create New User</Dialog.Title>
              <Dialog.Description>
                <div className="border-black">
                  <form action="#" onSubmit={props.formik.handleSubmit}>
                    <label htmlFor="name" className="text-sm">
                      Name
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="text"
                      name="name"
                      id="name"
                      value={props.formik.values.name}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />
                    {props.formik.errors.name && props.formik.touched.name ? (
                      <h1 className="text-sm text-red-500">
                        Must be 4 or more chars
                      </h1>
                    ) : null}

                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="text"
                      name="email"
                      id="email"
                      value={props.formik.values.email}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />
                    {props.formik.errors.email && props.formik.touched.email ? (
                      <h1 className="text-sm text-red-500">Enter Email</h1>
                    ) : null}

                    <label htmlFor="phone" className="text-sm">
                      Phone
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="text"
                      name="phone"
                      id="phone"
                      value={props.formik.values.phone}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />
                    {props.formik.errors.phone && props.formik.touched.phone ? (
                      <h1 className="text-sm text-red-500">
                        Must be 11 or more digit
                      </h1>
                    ) : null}

                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="password"
                      name="password"
                      id="password"
                      value={props.formik.values.password}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />
                    {props.formik.errors.password && props.formik.touched.password ? (
                      <h1 className="text-sm text-red-500">
                        Must be 4 or more chars
                      </h1>
                    ) : null}
                    {/* switch */}
                    <div className="pt-4 flex items-center">
                      <label htmlFor="status" className="text-sm pr-4">
                        Status
                      </label>
                      <Switch
                        checked={props.enabled}
                        onChange={props.setEnabled}
                        className={`${
                          props.enabled ? "bg-black" : "bg-gray-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span className="sr-only">Enable notifications</span>
                        <span
                          className={`${
                            props.enabled ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>

                    <div className="flex gap-4 items-center py-4 px-4">
                      <button
                        type="submit"
                        name="create"
                        className="text-white text-sm medium bg-black py-2 px-4"
                        onClick={() => {
                          props.formik.values.requestType = "POST";
                        }}
                      >
                        Create
                      </button>
                      <button
                        className="text-white text-sm medium gray py-2 px-4"
                        onClick={() => props.setIsOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      ) : null}

</>

  )
}

export default CreateUserDialog
