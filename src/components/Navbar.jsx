import React, { useState, useRef, useEffect } from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarRef = useRef(null);

  const handleSearchIconClick = () => {
    setShowSearchBar(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSearchBar(false);
      setSearchQuery("");
    }
  };

  const handleClickOutside = (e) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(e.target) &&
      searchQuery.trim() === ""
    ) {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center mb-5">
      <nav className="flex w-full screen-max-width">
        <button className="cursor-pointer focus:outline-none">
          <img src={appleImg} alt="Apple" width={14} height={18} />
        </button>

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-black hover:text-white transition-all"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          {showSearchBar ? (
            <div ref={searchBarRef} style={{ height: "15px" }}>
              {" "}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyDown={handleSearchInputKeyDown}
                className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none w-32 h-6 text-black"
              />
            </div>
          ) : (
            <button
              onClick={handleSearchIconClick}
              className="cursor-pointer focus:outline-none"
            >
              <img src={searchImg} alt="search" width={18} height={18} />
            </button>
          )}
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
