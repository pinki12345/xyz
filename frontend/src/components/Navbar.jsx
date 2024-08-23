import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from 'react';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../url';

const Navbar = () => {
  const [prompt, setPrompt] = useState('');
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user, setUser } = useContext(UserContext);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${URL}/api/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-purple-800">
      <h1 className="text-lg text-white md:text-xl font-extrabold">
        <Link to="/">ZuAi</Link>
      </h1>
      {path === '/' && (
        <div className="flex items-center space-x-2">
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 py-1 rounded-md text-gray-700"
            placeholder="Search a post"
            type="text"
          />
          <button
            onClick={() => navigate(prompt ? `?search=${prompt}` : '/')}
            className="p-2 rounded-md bg-white text-purple-800 hover:bg-gray-200"
          >
            <BsSearch />
          </button>
        </div>
      )}
      <div className="hidden md:flex items-center text-white justify-center space-x-2 md:space-x-4">
        {user ? (
          <>
            <h3>
              <Link to="/write">Write</Link>
            </h3>
            <div onClick={showMenu}>
              <p className="cursor-pointer relative">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
              Logout
            </button>
          </>
        ) : (
          <>
            <h3>
              <Link to="/login">Login</Link>
            </h3>
            <h3>
              <Link to="/register">Register</Link>
            </h3>
          </>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
