import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="w-full p-5">
        <div className="flex justify-between items-center md:max-w-5xl m-auto">
          <Link to={"/"}>
            <h1 className="text-4xl font-bold">
              Review<span className="text-indigo-500">Me</span>
            </h1>
          </Link>
          <div>
            <Link to={"/sign-in"}>
              <button className="py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded transition-all">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
