import React from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
const ViewOrder = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {/* View Customer */}

      {props.isViewCustomerOpen ? (
        <Dialog
          open={props.isViewCustomerOpen}
          onClose={() => {
            props.setViewCustomerOpen(false);
          }}
          className="relative z-50 p-8"
        >
          <div className='fixed inset-0 flex items-center justify-center p-4"'>
            <Dialog.Panel className="w-full px-8 py-8 max-w-sm rounded bg-white">
              <Dialog.Title></Dialog.Title>
              <Dialog.Description>
                <div className="border-black">
                  <div>
                    <h1 className="medium text-lg">
                      ID:{" "}
                      <span className="regular">
                        {props.currentItems[props.indexForView].id}
                      </span>
                    </h1>

                    <h1 className="medium text-lg">
                      User ID:{" "}
                      <span className="regular">
                        {props.currentItems[props.indexForView].user_id}
                      </span>
                    </h1>

                    <h1 className="medium text-lg">
                      Order No:{" "}
                      <span className="regular">
                        {props.currentItems[props.indexForView].no}
                      </span>
                    </h1>

                    <h1 className="medium text-lg">
                      Status:{" "}
                      <span className="regular">
                        {props.currentItems[props.indexForView].status}
                      </span>
                    </h1>
                  </div>

                  <div className="flex gap-4 items-center py-4">
                    <button
                      className="text-white text-sm medium bg-black py-2 px-4"
                      onClick={() => {
                        props.setViewCustomerOpen(false),
                          navigate("/orders-management");
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </Dialog>
      ) : null}
    </>
  );
};

export default ViewOrder;
