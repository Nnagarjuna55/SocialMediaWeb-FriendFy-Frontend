
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { format } from 'timeago.js';
// import { Link } from 'react-router-dom';
// import { request } from '../../util/request';
// import { AiFillLike, AiOutlineComment, AiOutlineDelete, AiOutlineLike } from 'react-icons/ai';
// import Comment from '../comment/Comment';
// import person from '../../assets/na.jpeg';

// const Post = ({ post, setUserPosts }) => {
//   const { user, token } = useSelector((state) => state.auth);
//   const [authorDetails, setAuthorDetails] = useState(null);
//   const [showComments, setShowComments] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id));
//   const [likeCount, setLikeCount] = useState(post?.likes.length || 0); // Initialize like count
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editContent, setEditContent] = useState(post?.desc);

//   // New state variables for reviews and ratings
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

//   useEffect(() => {
//     if (post.userId) {
//       fetchDetails();
//     }
//     fetchReviews();
//     fetchAverageRating();
//   }, [post.userId, post._id]);

//   const fetchDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:5001/user/find/${post.userId}`);
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data = await response.json();
//       setAuthorDetails(data);
//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const data = await request(`/comment/${post._id}`, 'GET');
//         setComments(data);
//       } catch (error) {
//         console.error('Error fetching comments:', error);
//       }
//     };
//     fetchComments();
//   }, [post._id]);

//   const fetchReviews = async () => {
//     try {
//       const data = await request(`/post/${post._id}/reviews`, 'GET');
//       setReviews(data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//     }
//   };

//   const fetchAverageRating = async () => {
//     try {
//       const data = await request(`/post/${post._id}/average-rating`, 'GET');
//       setAverageRating(data.averageRating);
//     } catch (error) {
//       console.error('Error fetching average rating:', error);
//     }
//   };

//   const handleLike = async () => {
//     const headers = { 'Authorization': `Bearer ${token}` };
//     try {
//       await request(`/post/likePost/${post._id}`, "PUT", headers);
//       setIsLiked(true);
//       setLikeCount(prevCount => prevCount + 1); // Increment like count
//     } catch (error) {
//       console.error('Error liking the post:', error);
//     }
//   };


//   const handleDislike = async () => {
//     const headers = { 'Authorization': `Bearer ${token}` };
//     try {
//       await request(`/post/dislikePost/${post._id}`, "PUT", headers);
//       setIsLiked(false);
//       setLikeCount(prevCount => prevCount - 1); // Decrement like count
//     } catch (error) {
//       console.error('Error disliking the post:', error);
//     }
//   };

//   const handleComment = async (e) => {
//     e.preventDefault();
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     };
//     try {
//       const data = await request('/comment', 'POST', headers, { text: commentText, postId: post._id });
//       setComments(prev => [data, ...prev]);
//       setCommentText("");
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };



//   const handleDeletePost = async (postId) => {
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         };
//         try {
//           //Sends a request to delete the post from the server.
//           const res = await request(`/post/deletePost/${postId}`, 'DELETE', headers);
//           console.log("gggggggg", res);
//           if (res.message === "Post has been deleted") {
//             window.location.reload()

//           }
//           if (setUserPosts) {
//             //Updates the parent component's posts list if setUserPosts is provided.
//             setUserPosts(prevPosts => prevPosts.filter(p => p._id !== postId));

//           }
//         } catch (error) {
//           console.error('Error deleting post:', error);
//         }
//       };

//   const handleSaveEdit = async () => {
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         };
//         try {
//           //Sends a request to update the post's content on the server.
//           const res = await request(`/post/updatePost/${post._id}`, 'PUT', headers, { desc: editContent });
//           console.log("Edited", res);
//           if (res) {
//             window.location.reload()

//           }
//           if (setUserPosts) {
//             //Updates the parent component's posts list if setUserPosts is provided.
//             setUserPosts(prevPosts =>
//               prevPosts.map(p => (p._id === post._id ? res : p))
//             );
//           }
//           setIsEditing(false);
//         } catch (error) {
//           console.error('Error updating post:', error);
//         }
//       };


//       const handleReviewSubmit = async (e) => {
//         e.preventDefault();
//         const headers = {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         };
//         try {
//           await request(`/post/${post._id}/review`, 'POST', headers, newReview);
//           setNewReview({ rating: 0, comment: '' });
//           fetchReviews();
//           fetchAverageRating();
//         } catch (error) {
//           console.error('Error submitting review:', error);
//         }
//       };


//   return (
//     <div className="w-full max-w-lg mx-auto flex flex-col border border-blue-300 rounded-2xl overflow-hidden mt-8 relative bg-white shadow-lg">
//       <div className="py-4 px-6 flex items-center justify-between border-b border-blue-300">
//         <Link to={`/profile/${post.userId}`} className="flex items-center gap-2 text-inherit">
//           <img
//             src={authorDetails?.profilePic ? `http://localhost:5001/images/${authorDetails.profilePic}` : person}
//             alt="Author"
//             className="h-12 w-12 object-cover rounded-full border border-gray-300"
//           />
//           <div className="flex flex-col gap-1">
//             <span className="font-bold text-lg">{authorDetails?.username}</span>
//             <span className="text-sm text-gray-700">{format(post?.createdAt)}</span>
//           </div>
//         </Link>
//         {user._id === post.userId && (
//           <div className="flex items-center gap-2">
//             <AiOutlineDelete
//               className="text-gray-600 cursor-pointer hover:text-gray-800"
//               onClick={() => setShowDeleteModal(prev => !prev)}
//             />
//             {showDeleteModal && (
//               <span
//                 className="absolute right-4 top-12 w-32 h-12 bg-gray-200 text-gray-800 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-300"
//                 onClick={() => handleDeletePost(post._id)}
//               >
//                 Delete post
//               </span>
//             )}
//             <button
//               className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//               onClick={() => setIsEditing(true)}
//             >
//               Edit
//             </button>
//           </div>
//         )}
//       </div>
//       {isEditing ? (
//         <div className="p-6">
//           <textarea
//             value={editContent}
//             onChange={(e) => setEditContent(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-md resize-none"
//             rows="4"
//           />
//           <div className="flex gap-2 mt-4">
//             <button
//               className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//               onClick={handleSaveEdit}
//             >
//               Save
//             </button>
//             <button
//               className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
//               onClick={() => setIsEditing(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <p className="p-4 text-gray-600 text-lg leading-relaxed">{post?.desc}</p>
//           {post.mediaType === "image" && post.imageUrl && (
//             <div className="w-full h-64 bg-gray-200">
//               <img
//                 src={`http://localhost:5001/images/${post.imageUrl}`}
//                 alt="Post"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           )}
//           {post.mediaType === "video" && post.videoUrl && (
//             <div className="w-full h-64 bg-gray-200">
//               <video controls className="w-full h-full object-cover">
//                 <source src={`http://localhost:5001/videos/${post.videoUrl}`} type="video/mp4" />
//               </video>
//             </div>
//           )}

//           <div className="py-4 px-6 flex justify-between items-center border-t border-gray-300">
//             <div className="flex items-center gap-2">
//               <span
//                 className="flex items-center gap-2 text-blue-600 cursor-pointer"
//                 onClick={isLiked ? handleDislike : handleLike}
//               >
//                 {isLiked ? (
//                   <>
//                     Liked <AiFillLike />
//                   </>
//                 ) : (
//                   <>
//                     Like <AiOutlineLike />
//                   </>
//                 )}
//               </span>
//               <span className="text-gray-700">{likeCount} Likes</span> {/* Display updated like count */}
//             </div>
//             <span
//               className="flex items-center gap-2 text-blue-600 cursor-pointer"
//               onClick={() => setShowComments(prev => !prev)}
//             >
//               <AiOutlineComment />
//               {comments.length} Comments
//             </span>
//           </div>
//           {showComments && (
//             <div className="px-6 py-4 border-t border-gray-300">
//               {comments.map((comment) => (
//                 <Comment key={comment._id} comment={comment} />
//               ))}
//               <form onSubmit={handleComment} className="flex gap-2 mt-4">
//                 <input
//                   type="text"
//                   placeholder="Add a comment..."
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                 >
//                   Comment
//                 </button>
//               </form>
//             </div>
//           )}
//           {/* Reviews and Rating Section */}
//           <div className="py-4 px-6 border-t border-blue-300">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold">Reviews</h3>
//               <span className="text-sm text-gray-600">Average Rating: {averageRating.toFixed(1)}/5</span>
//             </div>
//             {reviews.map((review, index) => (
//               <div key={index} className="mt-4">
//                 <div className="flex justify-between items-center">
//                   <p className="font-bold">{review.reviewer}</p>
//                   <span className="text-sm text-gray-600">{review.rating}/5</span>
//                 </div>
//                 <p className="text-gray-600">{review.comment}</p>
//               </div>
//             ))}
//             <form className="mt-4" onSubmit={handleReviewSubmit}>
//               <div className="flex gap-2 items-center">
//                 <input
//                   type="number"
//                   min="1"
//                   max="5"
//                   value={newReview.rating}
//                   onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
//                   className="w-16 p-2 border border-gray-300 rounded-md"
//                   placeholder="Rating (1-5)"
//                 />
//                 <input
//                   type="text"
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
//                   className="w-full p-2 border border-gray-300 rounded-md"
//                   placeholder="Write a review..."
//                 />
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Post;



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { request } from '../../util/request';
import { AiFillLike, AiOutlineComment, AiOutlineDelete, AiOutlineLike, AiOutlineStar } from 'react-icons/ai';
import Comment from '../comment/Comment';
import person from '../../assets/na.jpeg';

const Post = ({ post, setUserPosts }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id));
  const [likeCount, setLikeCount] = useState(post?.likes.length || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post?.desc);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  useEffect(() => {
    if (post.userId) {
      fetchDetails();
    }
    fetchReviews();
    fetchAverageRating();
  }, [post.userId, post._id]);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5001/user/find/${post.userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setAuthorDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${post._id}`, 'GET');
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [post._id]);

  const fetchReviews = async () => {
    try {
      const data = await request(`/post/${post._id}/reviews`, 'GET');
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const data = await request(`/post/${post._id}/average-rating`, 'GET');
      setAverageRating(data.averageRating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleLike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/likePost/${post._id}`, "PUT", headers);
      setIsLiked(true);
      setLikeCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const handleDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/dislikePost/${post._id}`, "PUT", headers);
      setIsLiked(false);
      setLikeCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('Error disliking the post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const data = await request('/comment', 'POST', headers, { text: commentText, postId: post._id });
      setComments(prev => [data, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const res = await request(`/post/deletePost/${postId}`, 'DELETE', headers);
      console.log("gggggggg", res);
      if (res.message === "Post has been deleted") {
        window.location.reload();
      }
      if (setUserPosts) {
        setUserPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSaveEdit = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const res = await request(`/post/updatePost/${post._id}`, 'PUT', headers, { desc: editContent });
      console.log("Edited", res);
      if (res) {
        window.location.reload();
      }
      if (setUserPosts) {
        setUserPosts(prevPosts =>
          prevPosts.map(p => (p._id === post._id ? res : p))
        );
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      await request(`/post/${post._id}/review`, 'POST', headers, newReview);
      setNewReview({ rating: 0, comment: '' });
      fetchReviews();
      fetchAverageRating();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col border border-blue-300 rounded-2xl overflow-hidden mt-8 relative bg-white shadow-lg">
      <div className="py-4 px-6 flex items-center justify-between border-b border-blue-300">
        <Link to={`/profile/${post.userId}`} className="flex items-center gap-2 text-inherit">
          <img
            src={authorDetails?.profilePic ? `http://localhost:5001/images/${authorDetails.profilePic}` : person}
            alt="Author"
            className="h-12 w-12 object-cover rounded-full border border-gray-300"
          />
          <div className="flex flex-col gap-1">
            <span className="font-bold text-lg">{authorDetails?.username}</span>
            <span className="text-sm text-gray-700">{format(post?.createdAt)}</span>
          </div>
        </Link>
        {user._id === post.userId && (
          <div className="flex items-center gap-2">
            <AiOutlineDelete
              className="text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => setShowDeleteModal(prev => !prev)}
            />
            {showDeleteModal && (
              <span
                className="absolute right-4 top-12 w-32 h-12 bg-gray-200 text-gray-800 flex justify-center items-center rounded-md cursor-pointer transition-colors duration-150 hover:bg-gray-300"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete post
              </span>
            )}
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="p-6">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows="4"
          />
          <div className="flex gap-2 mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="p-4 text-gray-600 text-lg leading-relaxed">
            {post?.desc.split(urlRegex).map((part, index) => {
              // If part is a URL, render it as a clickable link
              if (urlRegex.test(part)) {
                return (
                  <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {part}
                  </a>
                );
              }
              // Otherwise, render the part as text
              return <span key={index}>{part}</span>;
            })}
          </p>
          {/* <p className="p-4 text-gray-600 text-lg leading-relaxed">{post?.desc}</p> */}
          {post.mediaType === "image" && post.imageUrl && (
            <div className="w-full h-64 bg-gray-200">
              <img
                src={`http://localhost:5001/images/${post.imageUrl}`}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {post.mediaType === "video" && post.videoUrl && (
            <div className="w-full h-64 bg-gray-200">
              <video controls className="w-full h-full object-cover">
                <source src={`http://localhost:5001/videos/${post.videoUrl}`} type="video/mp4" />
              </video>
            </div>
          )}

          <div className="py-4 px-6 flex justify-between items-center border-t border-gray-300">
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-2 text-blue-600 cursor-pointer"
                onClick={isLiked ? handleDislike : handleLike}
              >
                {isLiked ? (
                  <>
                    Liked <AiFillLike />
                  </>
                ) : (
                  <>
                    Like <AiOutlineLike />
                  </>
                )}
              </span>
              <span className="text-gray-700">{likeCount} Likes</span>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="flex items-center gap-2 text-blue-600 cursor-pointer"
                onClick={() => setShowComments(prev => !prev)}
              >
                <AiOutlineComment />
                {comments.length} Comments
              </span>
              <span
                className="flex items-center gap-2 text-blue-600 cursor-pointer"
                onClick={() => setShowReviews(prev => !prev)}
              >
                <AiOutlineStar />
                Reviews
              </span>
            </div>
          </div>
          {showComments && (
            <div className="px-6 py-4 border-t border-gray-300">
              {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
              <form onSubmit={handleComment} className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Comment
                </button>
              </form>
            </div>
          )}
          {showReviews && (
            <div className="px-6 py-4 border-t border-blue-300">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <span className="text-sm text-gray-600">Average Rating: {averageRating.toFixed(1)}/5</span>
              </div>
              {reviews.map((review, index) => (
                <div key={index} className="mt-4">
                  <img
                    src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
                    alt="Profile"
                    className="w-12 h-12 object-cover rounded-full border border-gray-300"
                  />
                  <p className="font-semibold text-lg">{user.username}</p> {/* Display the user's name */}
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{review.reviewer}</p>
                    <span className="text-sm text-gray-600">{review.rating}/5</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>

                </div>

              ))}
              <form className="mt-4" onSubmit={handleReviewSubmit}>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="w-16 p-2 border border-gray-300 rounded-md"
                    placeholder="Rating (1-5)"
                  />
                  <input
                    type="text"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Write a review..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;

