// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { format } from 'timeago.js';
// import { Link } from 'react-router-dom';
// import { request } from '../../util/request';
// import { AiFillLike, AiOutlineComment, AiOutlineUserAdd } from 'react-icons/ai';

// const Notification = () => {
//   const { user, token } = useSelector((state) => state.auth);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!token) return; // If there's no token, don't make the request.

//       const headers = { 'Authorization': `Bearer ${token}` };
//       try {
//         const data = await request('/api/notifications', 'GET', headers);
//         console.log('Fetched Notifications:', data);  // Debugging statement
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setError('Failed to load notifications');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [token]);

//   if (loading) {
//     return <div className="w-full max-w-lg mx-auto mt-8">Loading notifications...</div>;
//   }

//   if (error) {
//     return <div className="w-full max-w-lg mx-auto mt-8">{error}</div>;
//   }

//   return (
//     <div className="w-full max-w-lg mx-auto mt-8">
//       <h2 className="text-xl font-bold mb-4">Notifications</h2>
//       {notifications.length > 0 ? (
//         notifications.map((notification) => (
//           <div key={notification._id} className="p-4 border-b border-gray-300 flex items-center">
//             <div className="mr-4">
//               {notification.type === 'like' && <AiFillLike />}
//               {notification.type === 'comment' && <AiOutlineComment />}
//               {notification.type === 'follow' && <AiOutlineUserAdd />}
//               {/* Add more icons for other types of notifications */}
//             </div>
//             <div>
//               <Link to={`/profile/${notification.senderId}`}>
//                 <strong>{notification.senderName}</strong>
//               </Link>
//               <span> {notification.message}</span>
//               <div className="text-gray-500 text-sm">{format(notification.createdAt)}</div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No notifications yet.</p>
//       )}
//     </div>
//   );
// };

// export default Notification;



// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { format } from 'timeago.js';
// import { Link } from 'react-router-dom';
// import { request } from '../../util/request';
// import { AiFillLike, AiOutlineComment, AiOutlineUserAdd } from 'react-icons/ai';

// const Notification = () => {
//   const { user, token } = useSelector((state) => state.auth);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Notification.jsx
// useEffect(() => {
//   const fetchNotifications = async () => {
//     if (!token || !user) return; // Ensure user is authenticated
  
//     const headers = { 'Authorization': `Bearer ${token}` };
//     try {
//       // URL must match the backend route
//       const data = await request('/notifications', 'GET', headers);
//       console.log('Fetched Notifications:', data);
//       setNotifications(data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//       setError('Failed to load notifications');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   fetchNotifications();
// }, [token, user._id]); // Include user._id in the dependency array

//   if (loading) {
//     return <div className="w-full max-w-lg mx-auto mt-8">Loading notifications...</div>;
//   }

//   if (error) {
//     return <div className="w-full max-w-lg mx-auto mt-8">{error}</div>;
//   }

//   return (
//     <div className="w-full max-w-lg mx-auto mt-8">
//       <h2 className="text-xl font-bold mb-4">Notifications</h2>
//       {notifications.length > 0 ? (
//         notifications.map((notification) => (
//           <div key={notification._id} className="p-4 border-b border-gray-300 flex items-center">
//             <div className="mr-4">
//               {notification.type === 'like' && <AiFillLike />}
//               {notification.type === 'comment' && <AiOutlineComment />}
//               {notification.type === 'follow' && <AiOutlineUserAdd />}
//             </div>
//             <div>
//               <Link to={`/profile/${notification.senderId}`}>
//                 <strong>{notification.senderName}</strong>
//               </Link>
//               <span> {notification.message}</span>
//               <div className="text-gray-500 text-sm">{format(notification.createdAt)}</div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No notifications yet.</p>
//       )}
//     </div>
//   );
// };

// export default Notification;



import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { request } from '../../util/request';
import { AiFillLike, AiOutlineComment, AiOutlineUserAdd, AiOutlineMessage } from 'react-icons/ai';

const Notification = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token || !user) return;

      const headers = { 'Authorization': `Bearer ${token}` };
      try {
        const data = await request('/notifications', 'GET', headers);
        console.log('Fetched Notifications:', data);
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token, user._id]);

  if (loading) {
    return <div className="w-full max-w-lg mx-auto mt-8">Loading notifications...</div>;
  }

  if (error) {
    return <div className="w-full max-w-lg mx-auto mt-8">{error}</div>;
  }

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification._id} className="p-4 border-b border-gray-300 flex items-center">
            <div className="mr-4">
              {notification.type === 'like' && <AiFillLike />}
              {notification.type === 'comment' && <AiOutlineComment />}
              {notification.type === 'follow' && <AiOutlineUserAdd />}
              {notification.type === 'message' && <AiOutlineMessage />}
            </div>
            <div>
              <Link to={`/profile/${notification.senderId}`}>
                <strong>{notification.senderName}</strong>
              </Link>
              <span> {notification.message}</span>
              <div className="text-gray-500 text-sm">{format(notification.createdAt)}</div>
            </div>
          </div>
        ))
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default Notification;
