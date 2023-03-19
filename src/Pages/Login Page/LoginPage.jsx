import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import loginimg from "../../imgs/loginimg.svg";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      phone: Yup.string()
        .required("Enter your phone number!")
        .min(10, "Enter correct phone number")
        .max(15, "cannot be more than 15 char/digit"),
      password: Yup.string()
        .required("Enter your password!")
        .min(4, "should be 4 or more chars")
        .max(255, "Passowrd is very long"),
    }),

    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/home", { replace: true });
      } catch (error) {
        alert("Wrong Phone Number or Password !");
      }
    },
  });

  return (
    <>
      <div>
        <div className="container pt-16 px-6 h-full mx-auto">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">
                      <div className="text-center">
                        <h4 className="text-xl font-semibold mt-1 mb-4 pb-1 extra-bold">
                          Login
                        </h4>
                      </div>
                      <form onSubmit={formik.handleSubmit}>
                        <div className="pt-4">
                          <label htmlFor="phone" className="text-sm">
                            UserName / Phone :
                          </label>
                          <input
                            className="block px-2 w-full h-8 py-1 text-sm"
                            type="text"
                            name="phone"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.phone && formik.touched.phone ? (
                            <h1 className="text-sm text-red-500">
                              {formik.errors.phone}
                            </h1>
                          ) : null}
                        </div>
                        <div className="pt-2 pb-4">
                          <label htmlFor="password" className="text-sm">
                            Password :
                          </label>
                          <input
                            className="block px-2 w-full h-8 py-1 text-sm"
                            type="password"
                            name="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <h1 className="text-sm text-red-500">
                              {formik.errors.password}
                            </h1>
                          ) : null}
                        </div>
                        <div className="text-center pt-1 mb-12 pb-1">
                          <button
                            className="bg-blue inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                            type="submit"
                          >
                            Log in
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none">
                    <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                      <img src={loginimg} alt="" className="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
