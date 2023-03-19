import React from "react";
import { Dialog } from "@headlessui/react";

const Exporting = (props) => {
  return (
    <>
      {/* Select to Export */}
      {props.isSelectToExportOpen ? (
        <Dialog
          open={props.isSelectToExportOpen}
          onClose={() => {
            props.setSelectToExportOpen(false), endPointBack();
          }}
          className="relative z-50 p-8"
        >
          <div className='fixed inset-0 flex items-center justify-center p-4"'>
            <Dialog.Panel className="w-full px-8 py-8 pb-1 max-w-sm rounded bg-white">
              <Dialog.Title>Select To Export</Dialog.Title>
              <Dialog.Description>
                <div className="border-black">
                  <div className="flex gap-6 my-4">
                    <button className="text-white text-sm medium py-2 px-4 bg-black rounded hover:bg-gray-600">
                      Export All
                    </button>
                    <button className="text-white text-sm medium py-2 px-4 bg-black rounded hover:bg-gray-600">
                      Export Current Page
                    </button>
                  </div>

                  <div className="flex gap-4 items-center py-4">
                    <button
                      className="gray text-sm medium py-2 px-4"
                      onClick={() => {
                        props.setSelectToExportOpen(false), endPointBack();
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

      <button
        className="bg-black hover:bg-gray-600 text-white py-2 px-4 rounded text-sm"
        onClick={() => {
          props.setSelectToExportOpen(!props.isSelectToExportOpen);
        }}
      >
        Export
      </button>
    </>
  );
};

export default Exporting;
