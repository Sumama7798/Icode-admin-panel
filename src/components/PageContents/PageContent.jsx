import React from "react";
import { Link } from "react-router-dom";

const PageContent = ({ page }) => {
  return (
    
    <div className="relative overflow-hidden h-52 w-full rounded-lg group">
      <Link to={"/dashboard" + page.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
          <div className="flex justify-center items-center h-full">
            <div className="text-white transition-transform duration-500 ease-out group-hover:scale-110 ">
              {page.icon}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">{page.name}</h3>
            <p className="text-gray-200 text-sm">Explore {page.name} Page</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PageContent;