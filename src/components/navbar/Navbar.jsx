// import React, { useState } from 'react';
// import { AiOutlineSearch, AiFillBell, AiFillMessage, AiFillHome } from 'react-icons/ai';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import person from '../../assets/na.jpeg'; // Ensure this path is correct and the image exists
// import Search from '../search/Search'; // Ensure Search component is correctly imported
// import { logout } from '../../redux/authSlice'; // Import the logout action

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const toggleModal = () => setShowModal((prev) => !prev);

//   const handleLogout = () => {
//     // Dispatch the logout action
//     dispatch(logout());
//     // Clear local storage
//     localStorage.clear();
//     // Redirect to the login page
//     navigate('/auth');
//   };

//   return (
//     <div className="h-16 w-full bg-blue-600 shadow-md">
//       <div className="h-full w-full px-6 flex justify-between items-center">
//         <div className="flex items-center">
//           <AiFillHome className="h-10 w-10 mr-3 text-white" />
//           <Link to="/">
//             <h3 className="text-white text-2xl font-semibold tracking-wide">Friendify</h3>
//           </Link>
//         </div>

//         <div className="flex items-center gap-4 relative">
//           <button
//             onClick={() => setShowSearch((prev) => !prev)}
//             className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
//           >
//             <AiOutlineSearch className="text-lg" />
//           </button>
//           {showSearch && (
//             <div className="absolute top-16 right-0 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
//               <Search />
//             </div>
//           )}

//           <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300">
//             <AiFillBell className="text-lg" />
//           </button>

//           <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300">
//             <AiFillMessage className="text-lg" />
//           </button>

//           <img
//             // src={user?.profilePicture || person}
//             src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
//             className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 border-white shadow-md hover:border-blue-300 transition-colors duration-300"
//             onClick={toggleModal}
//             alt="Profile"
//           />

//           {showModal && (
//             <div className="absolute right-0 top-16 bg-white p-3 w-48 flex flex-col gap-2 text-sm capitalize shadow-lg rounded-lg z-10">
//               <span
//                 onClick={handleLogout}
//                 className="text-blue-700 hover:text-blue-900 cursor-pointer"
//               >
//                 Logout
//               </span>
//               <Link to={`/updateProfile/${user._id}`} className="text-blue-700 hover:text-blue-900">
//                 Update Profile
//               </Link>
//               <Link to="/settings" className="text-blue-700 hover:text-blue-900">
//                 Settings
//               </Link>
//               <Link to="/help" className="text-blue-700 hover:text-blue-900">
//                 Help & Support
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



// import React, { useState } from 'react';
// import { AiOutlineSearch, AiFillBell, AiFillMessage, AiFillHome } from 'react-icons/ai';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import person from '../../assets/na.jpeg'; // Ensure this path is correct and the image exists
// import Search from '../search/Search'; // Ensure Search component is correctly imported
// import { logout } from '../../redux/authSlice'; // Import the logout action
// import Notification from '../notification/Notification'; // Ensure this path is correct
// import { RiUserSearchFill } from "react-icons/ri";

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false); // State for notifications dropdown
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const toggleModal = () => setShowModal((prev) => !prev);
//   const toggleNotifications = () => setShowNotifications((prev) => !prev); // Toggle notifications dropdown

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate('/auth');
//   };

//   return (
//     <div className="h-20 w-full bg-blue-600 shadow-md">
//       <div className="h-full w-full px-6 flex justify-between items-center">
//         <div className="flex items-center">
//           <AiFillHome className="h-10 w-10 mr-3 text-white" />
//           <Link to="/">
//             <h3 className="text-white text-2xl font-semibold tracking-wide">Friendify</h3>
//           </Link>
//         </div>

//         <div className="flex items-center gap-4 relative">
//           <button
//             onClick={() => setShowSearch((prev) => !prev)}
//             className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
//           >
//             <RiUserSearchFill className="text-lg" />
//           </button>
//           {showSearch && (
//             <div className="absolute top-16 right-0 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
//               <Search />
//             </div>
//           )}

//           <button
//             onClick={toggleNotifications}
//             className="relative p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
//           >
//             <AiFillBell className="text-lg" />
//             {/* Optional: Badge to show unread notifications count */}
//             <span className="absolute top-0 right-0 block h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//           </button>

//           {showNotifications && (
//             <div className="absolute top-16 right-0 w-96 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
//               <Notification />
//             </div>
//           )}

//           <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300">
//             <AiFillMessage className="text-lg" />
//           </button>

//           <img
//             src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
//             className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 border-white shadow-md hover:border-blue-300 transition-colors duration-300"
//             onClick={toggleModal}
//             alt="Profile"
//           />

//           {showModal && (
//             <div className="absolute right-0 top-16 bg-white p-3 w-48 flex flex-col gap-2 text-sm capitalize shadow-lg rounded-lg z-10">
//               <span
//                 onClick={handleLogout}
//                 className="text-blue-700 hover:text-blue-900 cursor-pointer"
//               >
//                 Logout
//               </span>
//               <Link to={`/updateProfile/${user._id}`} className="text-blue-700 hover:text-blue-900">
//                 Update Profile
//               </Link>
//               <Link to="/settings" className="text-blue-700 hover:text-blue-900">
//                 Settings
//               </Link>
//               <Link to="/help" className="text-blue-700 hover:text-blue-900">
//                 Help & Support
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



// import React, { useState } from 'react';
// import { AiOutlineSearch, AiFillBell, AiFillMessage, AiFillHome } from 'react-icons/ai';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import person from '../../assets/na.jpeg'; // Ensure this path is correct and the image exists
// import Search from '../search/Search'; // Ensure Search component is correctly imported
// import { logout } from '../../redux/authSlice'; // Import the logout action
// import Notification from '../notification/Notification'; // Ensure this path is correct
// import { RiUserSearchFill } from "react-icons/ri";

// const Navbar = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [showNotifications, setShowNotifications] = useState(false); // State for notifications dropdown
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const toggleModal = () => setShowModal((prev) => !prev);
//   const toggleNotifications = () => setShowNotifications((prev) => !prev); // Toggle notifications dropdown

//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     navigate('/auth');
//   };

//   return (
//     <div className="h-20 w-full bg-blue-300 shadow-md">
//       <div className="h-full w-full px-6 flex justify-between items-center">
//         <div className="flex items-center">
//           <AiFillHome className="h-10 w-10 mr-3 text-white" />
//           <Link to="/">
//             <h3 className="text-white text-2xl font-semibold tracking-wide">Friendify</h3>
//           </Link>
//         </div>

//         <div className="flex items-center gap-4 relative">
//           <button
//             onClick={() => setShowSearch((prev) => !prev)}
//             className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
//           >
//             <RiUserSearchFill className="text-lg" />
//           </button>
//           {showSearch && (
//             <div className="absolute top-16 right-0 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
//               <Search />
//             </div>
//           )}

//           <div className="relative">
//             <button
//               onClick={toggleNotifications}
//               className="relative p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
//             >
//               <AiFillBell className="text-lg" />
//               {/* Optional: Badge to show unread notifications count */}
//               <span className="absolute top-0 right-0 block h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
//             </button>

//             {showNotifications && (
//               <div className="absolute top-16 right-0 w-96 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
//                 <Notification />
//               </div>
//             )}
//           </div>

//           <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300">
//             <AiFillMessage className="text-lg" />
//           </button>

//           <img
//             src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
//             className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 border-white shadow-md hover:border-blue-300 transition-colors duration-300"
//             onClick={toggleModal}
//             alt="Profile"
//           />

//           {showModal && (
//             <div className="absolute right-0 top-16 bg-white p-3 w-48 flex flex-col gap-2 text-sm capitalize shadow-lg rounded-lg z-10">
//               <span
//                 onClick={handleLogout}
//                 className="text-blue-700 hover:text-blue-900 cursor-pointer"
//               >
//                 Logout
//               </span>
//               <Link to={`/updateProfile/${user._id}`} className="text-blue-700 hover:text-blue-900">
//                 Update Profile
//               </Link>
//               <Link to="/settings" className="text-blue-700 hover:text-blue-900">
//                 Settings
//               </Link>
//               <Link to="/help" className="text-blue-700 hover:text-blue-900">
//                 Help & Support
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState } from 'react';
import { AiOutlineSearch, AiFillBell, AiFillMessage, AiFillHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import person from '../../assets/na.jpeg'; // Ensure this path is correct and the image exists
import Search from '../search/Search'; // Ensure Search component is correctly imported
import { logout } from '../../redux/authSlice'; // Import the logout action
import Notification from '../notification/Notification'; // Ensure this path is correct
import { RiUserSearchFill } from "react-icons/ri";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State for notifications dropdown
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleModal = () => setShowModal((prev) => !prev);
  const toggleNotifications = () => setShowNotifications((prev) => !prev); // Toggle notifications dropdown

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate('/auth');
  };

  return (
    <div className="h-20 w-full bg-blue-300 shadow-md">
      <div className="h-full w-full px-6 flex justify-between items-center">
        <div className="flex items-center">
          <AiFillHome className="h-10 w-10 mr-3 text-white" />
          <Link to="/">
            <h3 className="text-white text-2xl font-semibold tracking-wide">Friendify</h3>
          </Link>
        </div>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowSearch((prev) => !prev)}
            className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
          >
            <RiUserSearchFill className="text-lg" />
          </button>
          {showSearch && (
            <div className="absolute top-16 right-0 w-80 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
              <Search />
            </div>
          )}

          <div className="relative">
            <button
              onClick={toggleNotifications}
              className="relative p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300"
            >
              <AiFillBell className="text-lg" />
              {/* Optional: Badge to show unread notifications count */}
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute top-16 right-0 w-96 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                <Notification />
              </div>
            )}
          </div>

          <button className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-400 transition-colors duration-300">
            <AiFillMessage className="text-lg" />
          </button>

          <img
            src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
            className="h-12 w-12 rounded-full object-cover cursor-pointer border-2 border-white shadow-md hover:border-blue-300 transition-colors duration-300"
            onClick={toggleModal}
            alt="Profile"
          />

          {showModal && (
            <div className="absolute right-0 top-16 bg-white p-3 w-48 flex flex-col gap-2 text-sm capitalize shadow-lg rounded-lg z-10">
              <span
                onClick={handleLogout}
                className="text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                Logout
              </span>
              <Link to={`/updateProfile/${user._id}`} className="text-blue-700 hover:text-blue-900">
                Update Profile
              </Link>
              <Link to="/settings" className="text-blue-700 hover:text-blue-900">
                Settings
              </Link>
              <Link to="/help" className="text-blue-700 hover:text-blue-900">
                Help & Support
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;