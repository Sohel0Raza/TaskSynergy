import { Link, NavLink } from 'react-router-dom';
import { deleteUser } from '../hooks/userdb';
import userPhoto from '../assets/download13.png'
import useLocalStorage from 'use-local-storage';

const Navbar = () => {
  const [loginUser, setLoginUser] = useLocalStorage("loginUser");

  const handleLogOut = () => {
    deleteUser();
    setLoginUser(null);
  };
  const navItem = (
    <>
      <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/">
        Task List
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/groupList">
        All Group
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-gray-700 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] space-y-4 p-2 shadow bg-gray-700 rounded-box w-52">
            {navItem}
          </ul>
        </div>
        <div className="flex justify-center items-center">
          <h2 className="text-xl md:text-2xl font-semibold md:ml-16">TASK <span className='text-primary hover:text-warning duration-1000'>Synergy</span></h2>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold space-x-7">{navItem}</ul>
      </div>
      <div className="navbar-end md:mr-10">
        {loginUser ? (
          <>
            <div className="flex justify-between items-center">
              <Link to="/login"><button className='hover:border-[1px] hover:border-warning p-2 rounded-md' onClick={handleLogOut}>SIGN OUT</button>
              </Link>
              <img className='h-10 w-10 rounded-full ml-2' src={userPhoto} alt="" />
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className='hover:border-[1px] hover:border-warning p-2 rounded-md'>LOGIN</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;


<div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Item 1</a></li>
      <li tabIndex={0}>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Item 3</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
