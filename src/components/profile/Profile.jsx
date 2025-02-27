// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
// import { useParams } from 'react-router-dom';
// import { request } from '../../util/request';
// import { updateUserProfile } from '../../redux/authSlice'; // Import updateUser action
// import coverPicture from '../../assets/italy.jpg';
// import profilePicture from '../../assets/na.jpeg';
// import Share from '../share/Share';
// import Post from '../post/Post';

// const Profile = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch(); // Initialize useDispatch
//     const { user, token } = useSelector((state) => state.auth);
//     const [userPosts, setUserPosts] = useState([]);
//     const [isFollowed, setIsFollowed] = useState(false);
//     const [profileDetails, setProfileDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const BACKEND_URL = `http://localhost:5001/images/`;

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await request(`/post/find/userposts/${id}`, 'GET');
//                 setUserPosts(response);
//             } catch (error) {
//                 setError('Error fetching posts');
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         const fetchUserData = async () => {
//             try {
//                 const response = await request(`/user/find/${id}`, 'GET', {
//                     'Authorization': `Bearer ${token}`
//                 });
//                 setProfileDetails(response);
//                 setIsFollowed(response.followers.includes(user._id));
//                 if (id === user._id) {
//                     dispatch(updateUserProfile(response)); // Update Redux store
//                     console.log("response", response);

//                 }
//             } catch (error) {
//                 setError('Error fetching user data');
//                 console.error('Error fetching user data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//         fetchUserData();
//     }, [id, user._id, token, dispatch]);

//     const handleFollow = async () => {
//         try {
//             const headers = {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             };

//             if (isFollowed) {
//                 await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
//             } else {
//                 await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
//             }

//             setIsFollowed(prev => !prev);
//         } catch (error) {
//             setError('Error handling follow/unfollow');
//             console.error('Error handling follow/unfollow:', error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="w-full max-w-5xl mx-auto py-6 px-4">
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="relative">
//                 <img
//                     src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
//                     className="w-full h-72 object-cover"
//                     alt="Cover"
//                 />
//                 <img
//                     src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
//                     className="w-36 h-36 rounded-full object-cover absolute top-56 left-1/2 transform -translate-x-1/2 border-4 border-white"
//                     alt="Profile"
//                 />
//             </div>
//             <div className="text-center mt-20">
//                 <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
//                 {id !== user._id && (
//                     <button
//                         className={`mt-4 px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
//                         onClick={handleFollow}
//                     >
//                         {isFollowed ? 'Unfollow' : 'Follow'}
//                     </button>
//                 )}
//                 {id === user._id && <Share />}
//             </div>
//             <div className="mt-8">
//                 {userPosts.length > 0 ? (
//                     userPosts.map(post => (
//                         <Post key={post._id} post={post} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No posts available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Profile;




// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { request } from '../../util/request';
// import { updateUserProfile } from '../../redux/authSlice';
// import coverPicture from '../../assets/italy.jpg';
// import profilePicture from '../../assets/na.jpeg';
// import Share from '../share/Share';
// import Post from '../post/Post';
// import Message from '../message/Message'; // Import Message component

// const Profile = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const { user, token } = useSelector((state) => state.auth);
//     const [userPosts, setUserPosts] = useState([]);
//     const [isFollowed, setIsFollowed] = useState(false);
//     const [profileDetails, setProfileDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showMessage, setShowMessage] = useState(false); // State to handle message modal visibility
//     const BACKEND_URL = `http://localhost:5001/images/`;

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await request(`/post/find/userposts/${id}`, 'GET');
//                 setUserPosts(response);
//             } catch (error) {
//                 setError('Error fetching posts');
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         const fetchUserData = async () => {
//             try {
//                 const response = await request(`/user/find/${id}`, 'GET', {
//                     'Authorization': `Bearer ${token}`
//                 });
//                 setProfileDetails(response);
//                 setIsFollowed(response.followers.includes(user._id));
//                 if (id === user._id) {
//                     dispatch(updateUserProfile(response));
//                 }
//             } catch (error) {
//                 setError('Error fetching user data');
//                 console.error('Error fetching user data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//         fetchUserData();
//     }, [id, user._id, token, dispatch]);

//     const handleFollow = async () => {
//         try {
//             const headers = {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             };

//             if (isFollowed) {
//                 await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
//             } else {
//                 await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
//             }

//             setIsFollowed(prev => !prev);
//         } catch (error) {
//             setError('Error handling follow/unfollow');
//             console.error('Error handling follow/unfollow:', error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="w-full max-w-5xl mx-auto py-6 px-4">
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="relative">
//                 <img
//                     src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
//                     className="w-full h-72 object-cover"
//                     alt="Cover"
//                 />
//                 <img
//                     src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
//                     className="w-36 h-36 rounded-full object-cover absolute top-56 left-1/2 transform -translate-x-1/2 border-4 border-white"
//                     alt="Profile"
//                 />
//             </div>
//             <div className="text-center mt-20">
//                 <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
//                 {id !== user._id && (
//                     <div className="flex justify-center space-x-4 mt-4">
//                         <button
//                             className={`px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
//                             onClick={handleFollow}
//                         >
//                             {isFollowed ? 'Unfollow' : 'Follow'}
//                         </button>
//                         <button
//                             className="px-6 py-2 rounded-full text-white bg-green-500 hover:bg-opacity-80"
//                             onClick={() => setShowMessage(true)} // Open the message modal
//                         >
//                             Message
//                         </button>
//                     </div>
//                 )}
//                 {id === user._id && <Share />}
//             </div>
//             <div className="mt-8">
//                 {userPosts.length > 0 ? (
//                     userPosts.map(post => (
//                         <Post key={post._id} post={post} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No posts available</p>
//                 )}
//             </div>

//             {showMessage && (
//                 <Message
//                     recipientId={id}
//                     onClose={() => setShowMessage(false)} // Close the message modal
//                 />
//             )}
//         </div>
//     );
// };

// export default Profile;




// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { request } from '../../util/request';
// import { updateUserProfile } from '../../redux/authSlice';
// import coverPicture from '../../assets/italy.jpg';
// import profilePicture from '../../assets/na.jpeg';
// import Share from '../share/Share';
// import Post from '../post/Post';
// import Message from '../message/Message'; // Import Message component

// const Profile = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const { user, token } = useSelector((state) => state.auth);
//     const [userPosts, setUserPosts] = useState([]);
//     const [isFollowed, setIsFollowed] = useState(false);
//     const [profileDetails, setProfileDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showMessage, setShowMessage] = useState(false); // State to handle message box visibility
//     const BACKEND_URL = `http://localhost:5001/images/`;

//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await request(`/post/find/userposts/${id}`, 'GET');
//                 setUserPosts(response);
//             } catch (error) {
//                 setError('Error fetching posts');
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         const fetchUserData = async () => {
//             try {
//                 const response = await request(`/user/find/${id}`, 'GET', {
//                     'Authorization': `Bearer ${token}`
//                 });
//                 setProfileDetails(response);
//                 setIsFollowed(response.followers.includes(user._id));
//                 if (id === user._id) {
//                     dispatch(updateUserProfile(response));
//                 }
//             } catch (error) {
//                 setError('Error fetching user data');
//                 console.error('Error fetching user data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//         fetchUserData();
//     }, [id, user._id, token, dispatch]);

//     const handleFollow = async () => {
//         try {
//             const headers = {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             };

//             if (isFollowed) {
//                 await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
//             } else {
//                 await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
//             }

//             setIsFollowed(prev => !prev);
//         } catch (error) {
//             setError('Error handling follow/unfollow');
//             console.error('Error handling follow/unfollow:', error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="w-full max-w-5xl mx-auto py-6 px-4">
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="relative">
//                 <img
//                     src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
//                     className="w-full h-72 object-cover"
//                     alt="Cover"
//                 />
//                 <img
//                     src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
//                     className="w-36 h-36 rounded-full object-cover absolute top-56 left-1/2 transform -translate-x-1/2 border-4 border-white"
//                     alt="Profile"
//                 />
//             </div>
//             <div className="text-center mt-20">
//                 <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
//                 {id !== user._id && (
//                     <div className="flex justify-center space-x-4 mt-4">
//                         <button
//                             className={`px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
//                             onClick={handleFollow}
//                         >
//                             {isFollowed ? 'Unfollow' : 'Follow'}
//                         </button>
//                         <button
//                             className="px-6 py-2 rounded-full text-white bg-green-500 hover:bg-opacity-80"
//                             onClick={() => setShowMessage(true)} // Open the message box
//                         >
//                             Message
//                         </button>
//                     </div>
//                 )}
//                 {id === user._id && <Share />}
//             </div>
//             <div className="mt-8">
//                 {userPosts.length > 0 ? (
//                     userPosts.map(post => (
//                         <Post key={post._id} post={post} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No posts available</p>
//                 )}
//             </div>

//             {showMessage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-4 rounded-lg shadow-lg w-96">
//                         <button
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//                             onClick={() => setShowMessage(false)} // Close the message box
//                         >
//                             &#x2715;
//                         </button>
//                         <Message
//                             recipientId={id}
//                             onClose={() => setShowMessage(false)} // Close the message box after sending the message
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { request } from '../../util/request';
// import { updateUserProfile } from '../../redux/authSlice';
// import coverPicture from '../../assets/italy.jpg';
// import profilePicture from '../../assets/na.jpeg';
// import Share from '../share/Share';
// import Post from '../post/Post';
// import Message from '../message/Message'; // Import Message component

// const Profile = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const { user, token } = useSelector((state) => state.auth);
//     const [userPosts, setUserPosts] = useState([]);
//     const [isFollowed, setIsFollowed] = useState(false);
//     const [profileDetails, setProfileDetails] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showMessage, setShowMessage] = useState(false); // State to handle message box visibility
//     const BACKEND_URL = `http://localhost:5001/images/`;

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [postsResponse, userResponse] = await Promise.all([
//                     request(`/post/find/userposts/${id}`, 'GET'),
//                     request(`/user/find/${id}`, 'GET', {
//                         'Authorization': `Bearer ${token}`
//                     })
//                 ]);
                
//                 setUserPosts(postsResponse);
//                 setProfileDetails(userResponse);
//                 setIsFollowed(userResponse.followers.includes(user._id));

//                 if (id === user._id) {
//                     dispatch(updateUserProfile(userResponse));
//                 }
//             } catch (error) {
//                 setError('Error fetching data');
//                 console.error('Error fetching data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [id, user._id, token, dispatch]);

//     const handleFollow = async () => {
//         try {
//             const headers = {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json'
//             };

//             if (isFollowed) {
//                 await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
//             } else {
//                 await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
//             }

//             setIsFollowed(prev => !prev);
//         } catch (error) {
//             setError('Error handling follow/unfollow');
//             console.error('Error handling follow/unfollow:', error);
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <div className="w-full max-w-5xl mx-auto py-6 px-4">
//             {error && <p className="text-red-500">{error}</p>}
//             <div className="relative">
//                 <img
//                     src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
//                     className="w-full h-72 object-cover"
//                     alt="Cover"
//                 />
//                 <img
//                     src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
//                     className="w-36 h-36 rounded-full object-cover absolute top-56 left-1/2 transform -translate-x-1/2 border-4 border-white"
//                     alt="Profile"
//                 />
//             </div>
//             <div className="text-center mt-20">
//                 <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
//                 <p className="text-gray-600 mt-2">{profileDetails.followers?.length} Followers</p> {/* Display followers count */}
//                 {id !== user._id && (
//                     <div className="flex justify-center space-x-4 mt-4">
//                         <button
//                             className={`px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
//                             onClick={handleFollow}
//                         >
//                             {isFollowed ? 'Unfollow' : 'Follow'}
//                         </button>
//                         <button
//                             className="px-6 py-2 rounded-full text-white bg-green-500 hover:bg-opacity-80"
//                             onClick={() => setShowMessage(true)} // Open the message box
//                         >
//                             Message
//                         </button>
//                     </div>
//                 )}
//                 {id === user._id && <Share />}
//             </div>
//             <div className="mt-8">
//                 {userPosts.length > 0 ? (
//                     userPosts.map(post => (
//                         <Post key={post._id} post={post} />
//                     ))
//                 ) : (
//                     <p className="text-center text-gray-500">No posts available</p>
//                 )}
//             </div>

//             {showMessage && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-4 rounded-lg shadow-lg w-96 relative">
//                         <button
//                             className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//                             onClick={() => setShowMessage(false)} // Close the message box
//                         >
//                             &#x2715;
//                         </button>
//                         <Message
//                             recipientId={id}
//                             onClose={() => setShowMessage(false)} // Close the message box after sending the message
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { request } from '../../util/request';
import { updateUserProfile } from '../../redux/authSlice';
import coverPicture from '../../assets/italy.jpg';
import profilePicture from '../../assets/na.jpeg';
import Share from '../share/Share';
import Post from '../post/Post';
import Message from '../message/Message';

const Profile = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [userPosts, setUserPosts] = useState([]);
    const [isFollowed, setIsFollowed] = useState(false);
    const [profileDetails, setProfileDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const BACKEND_URL = `http://localhost:5001/images/`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [postsResponse, userResponse] = await Promise.all([
                    request(`/post/find/userposts/${id}`, 'GET'),
                    request(`/user/find/${id}`, 'GET', {
                        'Authorization': `Bearer ${token}`
                    })
                ]);
                
                setUserPosts(postsResponse);
                setProfileDetails(userResponse);
                setIsFollowed(userResponse.followers.includes(user._id));

                if (id === user._id) {
                    dispatch(updateUserProfile(userResponse));
                }
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user._id, token, dispatch]);

    const handleFollow = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            if (isFollowed) {
                await request(`/user/unfollow/${id}`, 'PUT', headers, { userId: user._id });
            } else {
                await request(`/user/follow/${id}`, 'PUT', headers, { userId: user._id });
            }

            setIsFollowed(prev => !prev);
        } catch (error) {
            setError('Error handling follow/unfollow');
            console.error('Error handling follow/unfollow:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-full max-w-5xl mx-auto py-6 px-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="relative">
                <img
                    src={profileDetails.coverPic ? `${BACKEND_URL}${profileDetails.coverPic}` : coverPicture}
                    className="w-full h-72 object-cover"
                    alt="Cover"
                />
                <img
                    src={profileDetails.profilePic ? `${BACKEND_URL}${profileDetails.profilePic}` : profilePicture}
                    className="w-36 h-36 rounded-full object-cover absolute top-56 left-1/2 transform -translate-x-1/2 border-4 border-white"
                    alt="Profile"
                />
            </div>
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">{profileDetails.username}</h2>
                <p className="text-gray-600 mt-2">{profileDetails.followers?.length} Followers</p>
                {id !== user._id && (
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            className={`px-6 py-2 rounded-full text-white ${isFollowed ? 'bg-red-500' : 'bg-blue-500'} hover:bg-opacity-80`}
                            onClick={handleFollow}
                        >
                            {isFollowed ? 'Unfollow' : 'Follow'}
                        </button>
                        <button
                            className="px-6 py-2 rounded-full text-white bg-green-500 hover:bg-opacity-80"
                            onClick={() => setShowMessage(true)} // Show the message box
                        >
                            Message
                        </button>
                    </div>
                )}
                {id === user._id && <Share />}
            </div>
            <div className="mt-8">
                {userPosts.length > 0 ? (
                    userPosts.map(post => (
                        <Post key={post._id} post={post} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No posts available</p>
                )}
            </div>

            {showMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowMessage(false)} // Close the message box
                        >
                            &#x2715;
                        </button>
                        <Message
                            recipientId={id}
                            onClose={() => setShowMessage(false)} // Close the message box after sending the message
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
