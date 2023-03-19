import React from "react";
import { Icon } from "@iconify/react";
import userImg from "../imgs/user.jpg";
import { Popover } from "@headlessui/react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Notification from "./Notification";
import { UsersContext } from "../context/UsersContext";

const LoggedNavbar = () => {
  const { isAuth, userEmail } = useContext(AuthContext);
  const { notifications } = useContext(UsersContext);

  return (
    <>
      <div className="navbar py-6 px-16 bg-white flex justify-between items-center">
        <NavLink id="home" to="/home">
          <a href="##" className="text-xl extra-bold">
            SHIPMENT DASHBOARD
          </a>
        </NavLink>

        <Popover className="relative">
          <Popover.Button className="outline-none">
            <div className="flex items-center gap-3 hover:cursor-pointer text-left bg-gray-200 hover:bg-gray-300 transition ease-in-out duration-200 px-4 py-2 rounded-full">
              <img
                src={/* isAuth?user.image:'' */ userImg}
                alt=""
                className="w-10 rounded-full"
              />
              <div>
                <h3 className="text-md medium">Hussein Dhia</h3>
                <span className="text-sm blue">system</span>
              </div>

              {/*         <Icon icon="clarity:notification-line" width='25' height='25' color="#929292" />  */}
              <Icon
                icon="system-uicons:chevron-down"
                width="34"
                height="34"
                color="#929292"
              />
            </div>
          </Popover.Button>

          <Popover.Panel className="absolute z-10 translate-y-1 -translate-x-1/3 shadow-md">
            <div className="flex flex-col">
              <Notification notifications={notifications} />

              <div className="w-96 bg-white blue px-4 py-4 text-sm flex justify-center gap-4 rounded">
                <a href="#">Show All Notifications</a>
              </div>
            </div>
          </Popover.Panel>
        </Popover>
      </div>
      <Outlet />
    </>
  );
};

export default LoggedNavbar;
