import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
// import { SidebarData } from "./SideBarData";
import "../../App.css";
import { IconContext } from "react-icons";
import { useGetListOfFlowMaps } from "./SideBarData";
import { useShowSelectedFlow } from "../Utils/RestoreTheView";
import { useDispatch, useSelector } from "react-redux";
import { useReactFlow } from "react-flow-renderer";
import { set_edges, set_nodes } from "../../Redux/EngeNodeSlice/NodeEdgeStore";

function LeftBarForMaps() {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
 
  const showSidebar = () => setSidebar(!sidebar);
  const SidebarData = useGetListOfFlowMaps();
  const hookForShowFlowMap  = useShowSelectedFlow();

  const showClickedFlow =(item)=>{
  console.log("showCLickeFlow is Called")
    // const  className =  e.target.className;
    // console.log(className);
    console.log(">>>>>>>>>>>>>>className<<<<<<<<<<<<<<");
  hookForShowFlowMap(item);
  }

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick = {()=>{showClickedFlow(item.title)}}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default LeftBarForMaps ;
// export default {ReRendorTheVIew};