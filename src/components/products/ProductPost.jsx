import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { request } from '../../util/request';
import { AiFillLike, AiOutlineComment, AiOutlineDelete, AiOutlineLike } from 'react-icons/ai';
import Comment from '../comment/Comment';
import person from '../../assets/na.jpeg';

const ProductPost = ({ post, setUserPosts }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [authorDetails, setAuthorDetails] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id));
  const [likeCount, setLikeCount] = useState(post?.likes.length || 0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post?.desc);

  useEffect(() => {
    if (post.userId) {
      fetchDetails();
    }
  }, [post.userId]);

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

  const handleLike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/likeProductPost/${post._id}`, "PUT", headers);
      setIsLiked(true);
      setLikeCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error liking the product post:', error);
    }
  };

  const handleDislike = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await request(`/post/dislikeProductPost/${post._id}`, "PUT", headers);
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
      const data = await request('/commentProduct', 'POST', headers, { text: commentText, postId: post._id });
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
      const res = await request(`/post/deleteProductPost/${postId}`, 'DELETE', headers);
      if (res.message === "Post has been deleted") {
        setUserPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEditPost = async (postId) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    try {
      const res = await request(`/post/editProductPost/${postId}`, 'PUT', headers, { desc: editContent });
      if (res.message === "Post has been updated") {
        setIsEditing(false);
        setEditContent("");
      }
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md mb-4">
      <div className="flex items-start gap-4 mb-4">
        <img
          src={authorDetails?.profilePic ? `http://localhost:5001/images/${authorDetails.profilePic}` : person}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full border border-gray-300"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Link to={`/profile/${post.userId}`} className="font-semibold text-lg hover:text-blue-500 transition">
              {authorDetails?.username}
            </Link>
            <span className="text-gray-500 text-sm">{format(post.createdAt)}</span>
          </div>
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-2 resize-none"
              rows="4"
            />
          ) : (
            <p className="mt-2">{post.desc}</p>
          )}
        </div>
        {user._id === post.userId && (
          <div className="flex flex-col items-end">
            <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:underline">
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
            {isEditing && (
              <button onClick={() => handleEditPost(post._id)} className="text-green-500 hover:underline mt-1">
                Save
              </button>
            )}
            <button onClick={() => setShowDeleteModal(true)} className="text-red-500 hover:underline mt-2">
              Delete
            </button>
          </div>
        )}
      </div>
      {post.mediaUrl && (
        <div className="relative w-full h-80 mb-4">
          <AiOutlineClose
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition"
            onClick={() => handleDeletePost(post._id)}
          />
          {post.mediaType === 'image' ? (
            <img
              src={`http://localhost:5001/images/${post.mediaUrl}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
              alt="Post media"
            />
          ) : (
            <video controls className="w-full h-full object-cover rounded-lg shadow-md">
              <source src={`http://localhost:5001/images/${post.mediaUrl}`} type={`video/${post.mediaUrl.split('.').pop()}`} />
            </video>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={isLiked ? handleDislike : handleLike} className="text-red-500 hover:underline">
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            <span className="ml-1">{likeCount}</span>
          </button>
          <button onClick={() => setShowComments(prev => !prev)} className="text-gray-500 hover:underline">
            <AiOutlineComment />
            <span className="ml-1">{comments.length}</span>
          </button>
        </div>
      </div>
      {showComments && (
        <div className="border-t border-gray-200 pt-4">
          {comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
          <form onSubmit={handleComment} className="flex items-center mt-4">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Comment
            </button>
          </form>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this post?</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleDeletePost(post._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPost;
