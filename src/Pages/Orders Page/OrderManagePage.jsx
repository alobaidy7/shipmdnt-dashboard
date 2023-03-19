import React from "react";
import Sidebar from "../../components/Sidebar";
import { Icon } from "@iconify/react";
import { useState , useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import Exporting from "../../components/Exporting";
import { AuthContext } from "../../context/AuthContext";
import UpdateOrderDialog from "./UpdateOrderDialog";
import ViewOrder from './ViewOrder';

const OrderManagePage = () => {
  const [getAllOrders, setAllOrders] = useState("");
  const [changeOnAPI, setChangeOnAPI] = useState(false);
  const { token } = useContext(AuthContext);

  const getAll = async () => {
    const res = await fetch(
      "https://shipment.fadiramzi.dev/api/admin/v1/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    if (res.ok) {
      setAllOrders(response.data);
      return response.data;
    } else {
      throw Error(
        response.message
      ); /* & setIsErrorFound({isError:true,message:response.message}) */
    }
  };

  /* Update Order */

  const PUTOrder = async (body, id) => {
    const res = await fetch(
      `https://shipment.fadiramzi.dev/api/admin/v1/orders/${currentItems[id].id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    if (res.ok) {
      setCopy(getAllOrders); // check if i remove it
      setChangeOnAPI(!changeOnAPI);
    } else {
      throw Error(
        response.message
      ); /* & setIsErrorFound({isError:true,message:response.message}) */
    }
  };

  useEffect(() => {
    getAll().then((orders) => {
      setCopy(orders);
    });
  }, [changeOnAPI]);

  const navigate = useNavigate();
  /* Data */

  let [isSelectToExportOpen, setSelectToExportOpen] = useState(false);
  /* Dialog Opening check */
  const [enabled, setEnabled] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [isUpdateOpen, setUpdateOpen] = useState(false);
  let [isViewCustomerOpen, setViewCustomerOpen] = useState(false);
  let [deleteConfirm, setDeleteConfirm] = useState(false);
  let [dialogType, setDialogType] = useState("");

  const [filterVal, setFilterVal] = useState("");
  const [searchBy, setSearchBy] = useState("userID");
  /*  const [openModal,setOpenModal] = useState(false) */
  const [copyOfData, setCopy] = useState("");
  const [statusOption, setStatusOption] = useState("all");


  /* Validation with Formik */
  const formik = useFormik({
    initialValues: {
      status: "",
      enabled: enabled,
      desc: "",
      tax: "",
      price: "",
    },

    onSubmit: (values) => {
      updateOrderDone();
    },
  });

  /* Search Handling */
  const handleFilter = (e) => {
    if (e.target.value == "" && statusOption === "all") {
      setCopy(getAllOrders);
    } 
    
    else {
      if (statusOption === "all") {
        if (searchBy == "orderNo") {
          const filterResult = getAllOrders.filter((item) =>
            item.no.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setCopy(filterResult);
        } else if (searchBy == "userID") {
          const filterResult = getAllOrders.filter((item) =>
            item.user_id == e.target.value
          );
          setCopy(filterResult);
        }
      } else if (statusOption != "all") {
        if (searchBy == "orderNo") {
          const filterResult = copyOfData.filter((item) =>
            item.no.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setCopy(filterResult);
        } else if (searchBy == "userID") {
          const filterResult = copyOfData.filter((item) =>
            item.user_id.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setCopy(filterResult);
        }
      }
    }
    setFilterVal(e.target.value);
  };

  const searchByHandle = (e) => {
    setSearchBy(e.target.value);
  };

  const statusOptionHandling = (e) => {
    setStatusOption(e.target.value);

    if (e.target.value === "all") {
      setCopy(getAllOrders);
    } else {
      
        if (e.target.value=== "pending") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } else if (e.target.value=== "checking") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } 
  
      else if (e.target.value === "ordered") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } 
  
      else if (e.target.value === "received") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } 
  
      else if (e.target.value=== "shipped") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } 
      
      else if (e.target.value=== "delivered") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } 
  
      else if (e.target.value=== "canceled") {
        const filterResult = getAllOrders.filter((item) =>
          item.status.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } 
    }
  };


  const updateOpenHandling = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  const [indexForView, setIndexForView] = useState("");

  const viewOrderHandling = (i) => {
    setViewCustomerOpen(!isViewCustomerOpen);
    setDialogType("view");
    setIndexForView(i);
    navigate(`/orders-management/view/${currentItems[i].id}`);

  };

  const [tempIndex, setTempIndex] = useState("");

  /* Open Edit Dialog */
  const updateUser = (i) => {
  formik.values.desc = currentItems[i].desc
  formik.values.tax = currentItems[i].fees
  formik.values.price = currentItems[i].price
  formik.values.status = currentItems[i].status

    //setEnabled()
    setTempIndex(i);
    navigate(`/orders-management/edit/${currentItems[i].id}`);
  };


  /* Click Update button */
  const updateOrderDone = () => {
    PUTOrder(
      {
        desc: formik.values.desc,
        fees: formik.values.tax,
        price: formik.values.price,
        status: formik.values.status
      },
      tempIndex
    );

    setUpdateOpen(false)
    navigate('/orders-management')
  };

  const cancelUpdate = () => {
    setUpdateOpen(false);
    formik.values.desc = "";
    formik.values.tax = "";
    formik.values.price = "";
    navigate('/orders-management')
  };


  /* Pagination */
  let itemsPerPage = 10;
  const items = copyOfData;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const [pageNum, setPageNum] = useState(0);

  const handlePageClick = (event) => {
    setPageNum(event.selected);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* Update Dialoge */}
      <UpdateOrderDialog
        isUpdateOpen={isUpdateOpen}
        setUpdateOpen={setUpdateOpen}
        formik={formik}
        enabled={enabled}
        setEnabled={setEnabled}
        cancelUpdate={cancelUpdate}
        tempIndex={tempIndex}
        currentItems={currentItems}
      />

      {/* Deletion Confirmation */}
     

      {/* View Customer */}
      <ViewOrder
        isViewCustomerOpen={isViewCustomerOpen}
        setViewCustomerOpen={setViewCustomerOpen}
        currentItems={currentItems}
        indexForView={indexForView}
        dialogType={dialogType}
        setDialogType={setDialogType}
      />

      <div
        className={
          isOpen |
          isUpdateOpen |
          deleteConfirm |
          isViewCustomerOpen |
          isSelectToExportOpen
            ? "flex gap-10 px-16 blur-lg"
            : "flex gap-10 px-16 bg-white"
        }
      >
        <Sidebar />

        <div className="w-full">
          <div className="">
            <h1 className="text-xl extra-bold py-4">Orders Management</h1>
          </div>

          <div className="search py-4">
            <h1 className="text-lg medium pb-4">Search for Order</h1>
            <div className="flex">
              <div className="xl:w-3/4">
                <div className="input-group relative flex flex-wrap items-stretch w-96 mb-4">
                  <input
                    type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon3"
                    value={filterVal}
                    onInput={(e) => handleFilter(e)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-start items-center gap-3 mb-4">
              <h1 className="medium">Search by: </h1>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="userID"
                  checked={searchBy == "userID"}
                  onChange={searchByHandle}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="inlineRadio20"
                >
                  User ID
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="orderNo"
                  checked={searchBy == "orderNo"}
                  onChange={searchByHandle}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="inlineRadio20"
                >
                  Order Number
                </label>
              </div>


              <div className="flex justify-start gap-3 py-2">
              <h1 className="medium">Status: </h1>
              <div className="form-check form-check-inline">
                <select
                  name=""
                  id=""
                  value={statusOption}
                  onChange={statusOptionHandling}
                >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="checking">Checking</option>
                    <option value="ordered">Ordered</option>
                    <option value="received">Received</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
            </div>

            
            <Exporting
              isSelectToExportOpen={isSelectToExportOpen}
              setSelectToExportOpen={() => {
                setSelectToExportOpen(!isSelectToExportOpen);
              }}
            />
          </div>

          {/* New Table */}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Order Number
                </th>
                <th scope="col" className="px-6 py-3">
                    User ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Order Status
                </th>
                <th scope="col" className="px-8 py-3">
                    Action
                </th>
                
            </tr>
        </thead>
        <tbody>
        {
        currentItems &&
        currentItems.map((item,i) =>{
               return(<>
            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.id}
                </th>
                <td className="px-6 py-4">
                {item.no}
                </td>
                <td className="px-6 py-4">
                {item.user_id}
                </td>
                <td className="px-6 py-4">
                {item.status}
                </td>
                <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                                    <Icon
                                      className="cursor-pointer"
                                      icon="system-uicons:pen"
                                      color="#929292"
                                      width="25"
                                      height="25"
                                      onClick={() => {
                                        updateOpenHandling(), updateUser(i);
                                      }}
                                    />

                                    <Icon
                                      className="cursor-pointer"
                                      icon="system-uicons:eye"
                                      color="#929292"
                                      width="25"
                                      height="25"
                                      onClick={() => {
                                        viewOrderHandling(i);
                                      }}
                                    />
                                  </div>
                </td>
            </tr>
            </>
               )})}
        </tbody>
    </table>
</div>
          <ReactPaginate
            className="flex items-center gap-5 -translate-x-32 justify-center p-4"
            pageClassName="px-3 py-1.5"
            activeClassName="bg-black page-number hover:cursor-pointer text-md page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 rounded text-white hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </>
  );
};

export default OrderManagePage;
