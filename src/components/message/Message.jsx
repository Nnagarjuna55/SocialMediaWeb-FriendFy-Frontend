

// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { request } from '../../util/request';
// import io from 'socket.io-client';

// const socket = io.connect("http://localhost:5001");

// const Message = ({ recipientId, onClose }) => {
//   const { user, token } = useSelector((state) => state.auth);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const data = await request(`/api/messages/${recipientId}`, 'GET', {
//           'Authorization': `Bearer ${token}`,
//         });
//         setMessages(data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();

//     socket.on('receive_message', (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       socket.off('receive_message');
//     };
//   }, [recipientId, token]);

//   const sendMessage = async () => {
//     if (text.trim() === '') return;

//     const newMessage = {
//       senderId: user._id,
//       recipientId,
//       text,
//     };

//     try {
//       const sentMessage = await request('/api/messages', 'POST', {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }, newMessage);

//       setMessages((prevMessages) => [...prevMessages, sentMessage]);
//       setText('');
//       socket.emit('send_message', sentMessage);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
//       <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-red-500 hover:text-red-700"
//         >
//           &#x2715;
//         </button>
//         <div className="messages overflow-y-auto max-h-80 mb-4 p-2">
//           {messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`message p-2 my-2 rounded-lg ${msg.senderId === user._id ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center border-t border-gray-300 pt-2">
//           <input
//             type="text"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Type your message..."
//             className="border p-2 w-full rounded"
//           />
//           <button
//             onClick={sendMessage}
//             className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Message;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../util/request';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:5001");

const Message = ({ recipientId, onClose }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await request(`/messages/${recipientId}`, 'GET', {
          'Authorization': `Bearer ${token}`,
        });
        setMessages(data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [recipientId, token]);

  const sendMessage = async () => {
    if (text.trim() === '') return;

    const newMessage = {
      senderId: user._id,
      recipientId,
      text,
    };

    try {
      const sentMessage = await request('/messages', 'POST', {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }, newMessage);

      setText('');
      socket.emit('send_message', sentMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          &#x2715;
        </button>
        <div className="messages overflow-y-auto max-h-80 mb-4 p-2">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`message p-2 my-2 rounded-lg ${msg.senderId === user._id ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex items-center border-t border-gray-300 pt-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="border p-2 w-full rounded"
          />
          <button
            onClick={sendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
