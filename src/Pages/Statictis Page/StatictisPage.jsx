import React from "react";
import Sidebar from "../../components/Sidebar";
import { Icon } from "@iconify/react";
import { useState, useTransition } from "react";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import { AuthContext } from "../../context/AuthContext";
import ReactPaginate from "react-paginate";
import Exporting from "../../components/Exporting";

const StatictisPage = () => {
  /* Data */
  let [isSelectToExportOpen, setSelectToExportOpen] = useState(false);

  const { ordersReport } = useContext(UsersContext);
  /* Transition */
  const [isPending, startTransition] = useTransition();

  /* Dialog Opening check */
  const [enabled, setEnabled] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [isViewCustomerOpen, setViewCustomerOpen] = useState(false);

  const [data, setData] = useState(ordersReport);
  const [filterVal, setFilterVal] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  /*  const [openModal,setOpenModal] = useState(false) */
  const [copyOfData, setCopy] = useState(ordersReport);
  const [statusOption, setStatusOption] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* Get Orders */
  const [getAllOrders, setAllOrders] = useState("");
  const [changeOnAPI, setChangeOnAPI] = useState(false);
  const { token } = useContext(AuthContext);

  /* Search By Status Handling */

  const statusOptionHandling = (e) => {
    setStatusOption(e.target.value);

    if (e.target.value === "all") {
      setCopy(ordersReport);
    } else {
      if (e.target.value === "completed") {
        startTransition(() => {
          const filterResult = ordersReport.filter((item) =>
            item.status.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setCopy(filterResult);
          console.log(filterResult);
        });
      } else if (e.target.value === "pending") {
        startTransition(() => {
          const filterResult = ordersReport.filter((item) =>
            item.status.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setCopy(filterResult);
          console.log(filterResult);
        });
      }
    }
  };

  /* Date Time Select Handling */
  const fromDateHandle = (e) => {
    setFromDate(e.target.value);
  };

  const toDateHandle = (e) => {
    setToDate(e.target.value);
  };

  const filteredItemsHandlign = () => {
    if (statusOption == "all") {
      const filteredItems = ordersReport.filter((item) => {
        const itemDateRow = new Date(item.datetime);
        const itemDate = itemDateRow.toISOString().slice(0, 10);
        console.log(itemDate);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      setCopy(filteredItems);
    } else {
      const filteredItems = copyOfData.filter((item) => {
        const itemDateRow = new Date(item.datetime);
        const itemDate = itemDateRow.toISOString().slice(0, 10);
        console.log(itemDate);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      setCopy(filteredItems);
    }
  };

  /* Pagination */
  let itemsPerPage = 10;
  const items = copyOfData;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const [pageNum, setPageNum] = useState(0);

  const handlePageClick = (event) => {
    setPageNum(event.selected);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <div
      className={
        isSelectToExportOpen
          ? "flex gap-10 px-16 blur-md"
          : "flex gap-10 px-16 bg-white"
      }
    >
      <Sidebar />

      <div className="w-full">
        <h1 className="text-lg medium py-4 blue">
          Hello <span className="extra-bold blue">Hussein</span>, Welcome Back !
        </h1>

        <h1 className="text-xl extra-bold py-4">Statictis</h1>

        <div className="cards py-4 flex gap-16">
          <div className="inline-flex flex-col items-center justify-center w-44 h-44 gap-1 rounded bg-black text-white shadow-lg hover:-translate-y-4 transition-all">
            <Icon icon="ph:users-bold" height="50" width="50" />
            <p className="extra-bold text-xl">3000</p>
            <p className="text-lg medium">Customer</p>
          </div>

          <div className="inline-flex flex-col items-center justify-center w-44 h-44 gap-1 rounded bg-black text-white shadow-lg hover:-translate-y-4 transition-all">
            <Icon icon="ph:package-fill" height="50" width="50" />
            <p className="extra-bold text-xl">3000</p>
            <p className="text-lg medium">Order</p>
          </div>

          <div className="inline-flex flex-col items-center justify-center w-44 h-44 gap-1 rounded bg-black text-white shadow-lg hover:-translate-y-4 transition-all">
            <Icon
              icon="mdi:package-variant-closed-check"
              height="50"
              width="50"
            />
            <p className="extra-bold text-xl">3000</p>
            <p className="text-lg medium">Completed</p>
          </div>
        </div>

        <hr className="my-10" />

        {/* Reports */}
        <div>
          <div className="search py-4">
            <h1 className="text-xl extra-bold pb-8">Statictis Report</h1>
            <div className="flex">
              <div className="xl:w-3/4 ">
                <div className="input-group flex w-full mb-4 gap-8">
                  <div className="flex items-center gap-2">
                    <label htmlFor="from">From:</label>
                    <input
                      type="date"
                      name="from"
                      className="px-4 py-2 border rounded gray bg-white"
                      value={fromDate}
                      onChange={fromDateHandle}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label htmlFor="to">To:</label>
                    <input
                      type="date"
                      name="to"
                      className="px-4 py-2 border rounded gray bg-white"
                      value={toDate}
                      onChange={toDateHandle}
                    />
                  </div>

                  <button
                    className="px-4 bg-blue text-white rounded"
                    onClick={filteredItemsHandlign}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-3 py-4">
              <h1 className="medium">Status: </h1>
              <div className="form-check form-check-inline">
                <select
                  className="bg-white"
                  name=""
                  id=""
                  value={statusOption}
                  onChange={statusOptionHandling}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="checking">Checking</option>
                  <option value="ordered">Ordered</option>
                  <option value="received">Received</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
            <Exporting
              isSelectToExportOpen={isSelectToExportOpen}
              setSelectToExportOpen={() => {
                setSelectToExportOpen(!isSelectToExportOpen);
              }}
            />

            {/* New Table */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Order No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Details
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Datetime
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems &&
                    currentItems.map((item, i) => {
                      return (
                        <>
                          <tr
                            key={i}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {i + 1}
                            </th>
                            <td className="px-6 py-4 text-center">
                              {item.ordernum}
                            </td>
                            <td className="px-6 py-4">{item.username}</td>
                            <td className="px-6 py-4">{item.phone}</td>
                            <td className="px-6 py-4">{item.status}</td>
                            <td className="px-6 py-4">{item.details}</td>
                            <td className="px-6 py-4">{item.datetime}</td>
                          </tr>
                        </>
                      );
                    })}
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
      </div>
    </div>
  );
};

export default StatictisPage;
