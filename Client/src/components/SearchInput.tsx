import { Search } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function SearchInput() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = React.useState(false);
  const params = useLocation();
  const searchText = params.search.slice(3);

  React.useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    const url = `/search?q=${value}`;
    navigate(url);
  };
  return (
    <div className="mt-45 focus-within:border-primary-200 group flex h-11 w-full min-w-[300px] items-center overflow-hidden rounded-lg border bg-slate-50 text-neutral-500 lg:h-12">
      <div>
        <Link
          to="/"
          className="group-focus-within:text-primary-200 s p- bg-transparent2 m-1 flex h-full items-center justify-center rounded-full p-2"
        >
          <Search size={20} />
        </Link>
      </div>
      <div className="h-full w-full">
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className="flex h-full w-full items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //when i was search page
          <div className="h-full w-full">
            <input
              type="text"
              placeholder="Search for atta dal and more."
              autoFocus
              defaultValue={searchText}
              className="h-full w-full bg-transparent outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
