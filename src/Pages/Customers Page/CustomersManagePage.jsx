import React from "react";
import Sidebar from "../../components/Sidebar";
import { Icon } from "@iconify/react";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import ReactPaginate from "react-paginate";
import Exporting from "../../components/Exporting";
import { AuthContext } from "../../context/AuthContext";
import ErrorMessage from "../../components/ErrorMessage";
import CreateUserDialog from "../../components/CreateUserDialog";
import UpdateUserDialog from "../../components/UpdateUserDialog";
import DeleteDialog from "../../components/DeleteDialog";
import ViewCustomer from "../../components/ViewCustomer";
import { UsersContext } from "../../context/UsersContext";


const CustomersManagePage = () => {
  const navigate = useNavigate();
  const {customers} = useContext(UsersContext) //temp

  const [getAllCustomers, setAllCustomers] = useState("");
  const [changeOnAPI, setChangeOnAPI] = useState(false);
  const { token } = useContext(AuthContext);


  const [isErrorFound, setIsErrorFound] = useState({
    isError: false,
    message: "",
  });

  const [viewOneCustomer, setViewOneCustomer] = useState("");


  const getAll = async () => {
    const res = await fetch(
      "https://shipment.fadiramzi.dev/api/admin/v1/users",
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
      const filterResult = response.data.filter((item) =>
          item.user_type.toLowerCase().includes('customer')
        );

      setAllCustomers(filterResult);

      return response.data;
    } else {
      throw Error(
        response.message
      ); /* & setIsErrorFound({isError:true,message:response.message}) */
    }
  };

    /* Get One Customer */
    const getOneCustomer = async (id) => {
      // console.log(token)
      const res = await fetch(
        `https://shipment.fadiramzi.dev/api/admin/v1/users/${currentItems[id].id}`,
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
        setViewOneCustomer(response.data);
        return response.data;
      } else {
        throw Error(
          response.message
        ); /* & setIsErrorFound({isError:true,message:response.message}) */
      }
    };

  /* Create User */
  const POSTUser = async (body, id) => {
    const res = await fetch(
      `https://shipment.fadiramzi.dev/api/admin/v1/users`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    if (res.ok) {
      setCopy(getAllCustomers); // check if i remove it
      setChangeOnAPI(!changeOnAPI);
    } else {
      throw Error(
        response.message
      ); /*  & setIsErrorFound({isError:true,message:response.message}) */
    }
  };

  useEffect(() => {
    getAll().then((customer) => {
          const filterResult = customer.filter((item) =>
          item.user_type.toLowerCase().includes('customer')
        );
      setCopy(filterResult)
    });
  }, [changeOnAPI]);


  /* Validation with Formik */
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      phone: "",
      status: false,
      requestType: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Enter your name!")
        .min(3, "name must be 4 or more chars"),
      password: Yup.string()
        .required("Enter your password!")
        .min(4, "password must be 4 or more chars"),
      email: Yup.string().optional().email(),
      phone: Yup.string()
        .required("Enter your phone!")
        .min(11, "phone must be 10 or more number"),
    }),

    onSubmit: (values) => {
      if (formik.values.requestType == "POST") {
        setIsOpen(false), createUser();  // try catch
      } 
       else if (formik.values.requestType == "PUT") {
        setUpdateOpen(false), updateCustomerDone();
      } 
    },
  });

  /* Dialog Opening check */
  const [enabled, setEnabled] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [isUpdateOpen, setUpdateOpen] = useState(false);
  let [isViewCustomerOpen, setViewCustomerOpen] = useState(false);
  let [deleteConfirm, setDeleteConfirm] = useState(false);

  const [filterVal, setFilterVal] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  /*  const [openModal,setOpenModal] = useState(false) */
  const [copyOfData, setCopy] = useState("");
  let [isSelectToExportOpen, setSelectToExportOpen] = useState(false)


  const handleFilter = (e) => {
    setFilterVal(e.target.value);

    if (e.target.value == "") {
      setCopy(getAllCustomers);
    } else {
      if (searchBy == "name") {
        const filterResult = getAllCustomers.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } else if (searchBy == "email") {
      
        const filterResult = getAllCustomers.filter((item) =>
          item.email.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      } else {
        const filterResult = getAllCustomers.filter((item) =>
          item.phone.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setCopy(filterResult);
      }
    }
  };

  const searchByHandle = (e) => {
    setSearchBy(e.target.value);
  };

  const openModalHandling = () => {
    setIsOpen(!isOpen);
  };

  const updateOpenHandling = () => {
    setUpdateOpen(!isUpdateOpen);
  };

  const [indexForView, setIndexForView] = useState("");

  const viewCustomerHandling = (i) => {
    setViewCustomerOpen(!isViewCustomerOpen);
    setIndexForView(i);
    navigate(`/customers-management/${currentItems[i].full_name}/view`);
  };

  const createUser = () => {
   
    POSTUser(
      {
        user_type: "customer",
        name: formik.values.name,
        email: formik.values.email,
        phone: formik.values.phone,
        status: enabled == true ? 1 : 0,
        password: formik.values.password,
      },
      tempIndex
    );

    formik.values.name = "";
    formik.values.email = "";
    formik.values.phone = "";
    formik.values.password = "";

  
  };

  /* Open Edit Dialog */
  const [tempIndex, setTempIndex] = useState("");

  const updateCustomer = (i) => {
    formik.values.name = currentItems[i].name;
    formik.values.email = currentItems[i].email;
    formik.values.phone = currentItems[i].phone;
    formik.values.password = currentItems[i].password;
    setEnabled(currentItems[i].status);
    setTempIndex(i);
  };



 /* Click Update button */
 const updateCustomerDone = () => {
  formik.values.requestType = "PUT";

  PUTUser(
    {
      name: formik.values.name,
      email: formik.values.email,
      phone: formik.values.phone,
      status: enabled == true ? 1 : 0,
      password: formik.values.password,
    },
    tempIndex
  );


  formik.values.name = "";
  formik.values.email = "";
  formik.values.phone = "";
  formik.values.password = "";
};

const cancelUpdate = () => {
  formik.values.name = "";
  formik.values.email = "";
  formik.values.phone = "";
  formik.values.password = "";
  setUpdateOpen(false)
};

   /* DELETE Customer */
   const [indexForDelete, setIndexForDelete] = useState("");

   const DELETE_Customer = async (i) => {
   const res = await fetch(
      `https://shipment.fadiramzi.dev/api/admin/v1/users/${currentItems[i].id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const response = await res.json();

    if (res.ok) {
      setCopy(getAllCustomers);
      setChangeOnAPI(!changeOnAPI);
    } else {
      throw Error(
        response.message
      ); /*  & setIsErrorFound({isError:true,message:response.message}) */
    }
  };

    /* Update User */
    const PUTUser = async (body, id) => {
      const res = await fetch(
        `https://shipment.fadiramzi.dev/api/admin/v1/users/${currentItems[id].id}`,
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
        setCopy(getAllCustomers); // check if i remove it
        setChangeOnAPI(!changeOnAPI);
      } else {
        throw Error(
          response.message
        ); /* & setIsErrorFound({isError:true,message:response.message}) */
      }
    };

  const deleteUser = () => {
    DELETE_Customer(indexForDelete);

    setDeleteConfirm(false);
  };

  const confirmDeletingMessage = (i) => {
    setDeleteConfirm(true);
    console.log(indexForDelete);
    setIndexForDelete(i);
  };

    const getOneCustomerHandling = (i) => {
      getOneCustomer(i).then((user) => navigtae(`/users-management/${user.id}`));
      setIndexForView(i);
    };

/* Pagination */
 let itemsPerPage = 10
 const items = customers;
 const [itemOffset, setItemOffset] = useState(0);
 const endOffset = itemOffset + itemsPerPage;
 const currentItems = items.slice(itemOffset, endOffset);
 const pageCount = Math.ceil(items.length / itemsPerPage);
 const [pageNum,setPageNum] = useState(0)

 const handlePageClick = (event) => {
   setPageNum(event.selected)
   const newOffset = (event.selected * itemsPerPage) % items.length;
   console.log(
     `User requested page number ${event.selected}, which is offset ${newOffset}`
   );
   setItemOffset(newOffset);
 };

  return (
    <>
      {/* Create Dialoge */}
      <CreateUserDialog isOpen={isOpen} setIsOpen={setIsOpen} formik={formik} enabled={enabled} setEnabled={setEnabled}/>

      {/* Error Handling */}
      <ErrorMessage isErrorFound={isErrorFound} setIsErrorFound={setIsErrorFound}/>

      {/* Update Dialoge */}
      <UpdateUserDialog isUpdateOpen={isUpdateOpen} setIsUpdateOpen={setIsOpen} formik={formik} enabled={enabled} setEnabled={setEnabled} cancelUpdate={cancelUpdate}/>

      {/* Deletion Confirmation */}
      <DeleteDialog deleteConfirm={deleteConfirm} setDeleteConfirm={setDeleteConfirm} deleteUser={deleteUser}/>


      {/* View Customer */}
      <ViewCustomer isViewCustomerOpen={isViewCustomerOpen} setViewCustomerOpen={setViewCustomerOpen} currentItems={currentItems} indexForView={indexForView} />

      <div
        className={
          isOpen | isUpdateOpen | deleteConfirm | isViewCustomerOpen | isSelectToExportOpen
            ? "flex gap-10 px-16 blur-lg"
            : "flex gap-10 px-16"
        }
      >
        <Sidebar />

        <div className="w-full">
          <div className="createuser">
            <h1 className="text-xl extra-bold py-4">Customers Management</h1>
            <button
              className="bg-blue hover:bg-blue-600 text-white py-3 px-4 rounded medium"
              onClick={() => {
                openModalHandling();
              }}
            >
              Create New Customer
            </button>
          </div>

          <div className="search py-6">
            <h1 className="text-lg medium pb-4">Search for customers</h1>
            <div className="flex">
              <div className="mb-3 xl:w-3/4 ">
                <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
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

            <div className="flex justify-start gap-3">
              <h1 className="medium">Search by: </h1>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="name"
                  checked={searchBy == "name"}
                  onChange={searchByHandle}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="inlineRadio10"
                >
                  Full Name
                </label>
              </div>

              <div className="form-check form-check-inline">
                <input
                  className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-black checked:border-black focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="phone"
                  checked={searchBy == "phone"}
                  onChange={searchByHandle}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="inlineRadio20"
                >
                  Phone
                </label>
              </div>
            </div>

          </div>
          <Exporting isSelectToExportOpen={isSelectToExportOpen} setSelectToExportOpen={()=>{setSelectToExportOpen(!isSelectToExportOpen)}}/>
          <div className="table">
            <div className="flex flex-col">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                  <table className="min-w-full">
                      <thead className="bg-white border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            Full Name
                          </th>

                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-left"
                          >
                            Stautus
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-4 py-4 text-center"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentItems &&
                          currentItems.map((item, i) => {
                            return (
                              <tr
                                key={i}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                              >
                                {/* <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i+1}</td> */}
                                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                  {item.id}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                  {item.name}
                                </td>

                                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                  {item.email == null ? "No Email" : item.email}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                  {item.phone}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                  {item.status == 1 ? "Active" : "Disabled"}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-4 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    <Icon
                                      className="cursor-pointer"
                                      icon="system-uicons:pen"
                                      color="#929292"
                                      width="25"
                                      height="25"
                                      onClick={() => {
                                        updateOpenHandling(), updateCustomer(i);
                                      }}
                                    />
                                    <Icon
                                      className="cursor-pointer"
                                      icon="system-uicons:trash"
                                      color="#929292"
                                      width="25"
                                      height="25"
                                      onClick={() => {
                                        confirmDeletingMessage(i);
                                      }}
                                    />
                                    <Icon
                                      className="cursor-pointer"
                                      icon="system-uicons:eye"
                                      color="#929292"
                                      width="25"
                                      height="25"
                                      onClick={() => {
                                        getOneCustomerHandling(i),
                                        setViewCustomerOpen(true);
                                      }}
                                    />
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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

export default CustomersManagePage;
