import { Link, NavLink } from 'react-router-dom';
import { deleteUser } from '../components/userdb';
import useUser from '../components/useUser';

const Navbar = () => {
  const [user, setUser] = useUser()
  const handleLogOut = () => {
    deleteUser();
    setUser(null);
  };
  const navItem = (
    <>
      <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/">
        Task List
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/groupList">
        All Group
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/dashboard/selectClass">
        Dashboard
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

          <h2 className="text-xl md:text-2xl font-semibold uppercase">TaskSynergy</h2>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold space-x-7">{navItem}</ul>
      </div>

      <div className="navbar-end md:mr-10">
        {user ? (
          <>
            <div className="flex justify-between items-center">
              <Link to="/login"><button className='hover:border-[1px] hover:border-warning p-2 rounded-md' onClick={handleLogOut}>SIGN OUT</button>
              </Link>
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
