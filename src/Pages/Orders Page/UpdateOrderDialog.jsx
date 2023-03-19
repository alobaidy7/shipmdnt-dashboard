import {React , useState} from 'react'
import { Dialog , Switch } from '@headlessui/react'


const UpdateOrderDialog = (props) => {

  const [statusOption, setStatusOption] = useState("pending");


  const statusOptionHandling = (e) => {
    setStatusOption(e.target.value);
    props.formik.values.status = e.target.value
    console.log(props.formik.values.status)
  };

  return (
    
    <>

    {/* Edit Dialog */}
    {props.isUpdateOpen ? (
        <Dialog
          open={props.isUpdateOpen}
          onClose={() => props.setUpdateOpen(false)}
          className="relative z-50 p-8"
        >
          <div className='fixed inset-0 flex items-center justify-center p-4"'>
            <Dialog.Panel className="w-full px-8 py-8 max-w-sm rounded bg-white">
              <Dialog.Title>Change Order Status</Dialog.Title>
              <Dialog.Description>
                <div className="border-black">
                  <form action="#" onSubmit={props.formik.handleSubmit}>


                    <div>
                    <label htmlFor="name" className="text-sm">
                      Desecription
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="text"
                      name="desc"
                      id="name"
                      value={props.formik.values.desc}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />




                    <label htmlFor="name" className="text-sm">
                      Price
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="number"
                      name="price"
                      id="name"
                      value={props.formik.values.price}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />






                    <label htmlFor="name" className="text-sm">
                      Fees
                    </label>
                    <input
                      className="block px-2 w-full py-1 text-sm"
                      type="number"
                      name="tax"
                      id="name"
                      value={props.formik.values.tax}
                      onChange={props.formik.handleChange}
                      onBlur={props.formik.handleBlur}
                    />

                    </div>
                    

                    <div className='flex gap-4 items-center my-4'>

                    <h1 className="">
                      Status
                    </h1>
                    
                      
                      <div className="form-check form-check-inline">
                  <select
                  name=""
                  id=""
                  value={statusOption}
                  onChange={statusOptionHandling}
                  >
                    <option value="pending">Pending</option>
                    <option value="checking">Checking</option>
                    <option value="ordered">Ordered</option>
                    <option value="received">Received</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>


                  </select>
                </div>
                        
                     
                     
                    </div>
                    

                   

                    
                   

                    <div className="flex gap-4 items-center py-4 px-4">
                      <button type='submit'
                        className="text-white text-sm medium bg-black py-2 px-4"
                        onClick={() => {
                        }}
                      >
                        Update
                      </button>
                      <button type='cancel'
                        className="text-white text-sm medium gray py-2 px-4"
                        onClick={() => {
                          props.cancelUpdate();
                        }}
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

export default UpdateOrderDialog