import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdPhotos } from 'react-icons/io';
import { useSelector } from 'react-redux';
import person from '../../assets/na.jpeg';
import LiveVideo from '../liveVideo/LiveVideo'; // Import the LiveVideo component
import { request } from '../../util/request';
import { FaPhotoVideo, FaFileVideo } from 'react-icons/fa';

const Products = ({ setPosts }) => {
  const [desc, setDesc] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState("");
  const [isLiveVideo, setIsLiveVideo] = useState(false);
  const { token, user } = useSelector((state) => state.auth);

  const handleCreateProductPost = async () => {
    try {
      let filename = null;

      if (media) {
        const formData = new FormData();
        filename = crypto.randomUUID() + media.name;
        formData.append("mediaUrl", filename);
        formData.append("media", media);

        await request('/upload', 'POST', {}, formData, true);
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const body = {
        mediaUrl: filename,
        mediaType,
        desc,
      };

      await request('/postProduct', 'POST', headers, body);
      const updatedPosts = await request('/post/timelineProductPosts', 'GET', { 'Authorization': `Bearer ${token}` });
      setPosts(updatedPosts);
      resetForm();
    } catch (error) {
      console.error(error);
      alert('Failed to create post. Please try again.');
    }
  };

  const resetForm = () => {
    setDesc("");
    setMedia(null);
    setMediaType("");
    setIsLiveVideo(false);
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split('/')[0];
      if (type === 'image' || type === 'video') {
        setMedia(file);
        setMediaType(type);
        setIsLiveVideo(false);
      } else {
        alert("Only images and videos are allowed!");
      }
    }
  };

  const handleLiveVideoStop = (videoBlob) => {
    setMedia(videoBlob);
    setMediaType('video');
    setIsLiveVideo(true);
  };

  return (
    <div className="w-full flex flex-col items-center shadow-md p-6 bg-blue-200 rounded-lg">
      <div className="w-full flex items-center gap-4 border-b border-blue-200 pb-4 mb-4">
        <img
          src={user.profilePic ? `http://localhost:5001/images/${user.profilePic}` : person}
          alt="Profile"
          className="w-12 h-12 object-cover rounded-full border border-gray-300"
        />
        <p className="font-semibold text-lg">{user.username}</p>
        <input
          type="text"
          placeholder="Share your opinion"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCreateProductPost}
          className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          POST
        </button>
      </div>
      <div className="w-full flex justify-around items-center">
        <label htmlFor='media' className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500 transition">
          <FaPhotoVideo />
          <span>Photo/Video</span>
        </label>
        <button
          onClick={() => setIsLiveVideo(true)}
          className="flex items-center gap-2 text-gray-700 cursor-pointer hover:text-blue-500 transition"
        >
          <FaFileVideo />
          <span>Live Video</span>
        </button>
      </div>
      <input
        type="file"
        id="media"
        className="hidden"
        onChange={handleMediaChange}
      />
      {isLiveVideo && !media && (
        <LiveVideo onStop={handleLiveVideoStop} />
      )}
      {media && (
        <div className="relative w-full h-80 mt-4">
          <AiOutlineClose
            className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition"
            onClick={() => resetForm()}
          />
          {mediaType === "image" ? (
            <img
              src={URL.createObjectURL(media)}
              className="w-full h-full object-cover rounded-lg shadow-md"
              alt="Preview"
            />
          ) : (
            <video controls className="w-full h-full object-cover rounded-lg shadow-md">
              <source src={URL.createObjectURL(media)} type={media.type} />
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
