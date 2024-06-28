import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

export default function Forum() {
  const [selectedTopic, setSelectedTopic] = useState('Anxiety');
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserId();
    fetchDiscussions(selectedTopic); 
  }, [user,selectedTopic]); 

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      const res = await axios.get('http://localhost:5000/api/auth/user', config);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  const fetchDiscussions = async (topic) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forum/${topic}`);
      setDiscussions(res.data.data);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/forum', {
        topic: selectedTopic,
        question,
        userId: user._id,
      });
      setDiscussions([...discussions, res.data.data]); 
      setQuestion('');
    } catch (error) {
      console.error('Error posting question:', error);
    }
  };

  const handleCommentSubmit = async (discussionId, e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:5000/api/forum/${discussionId}/comments`, {
        userId: user._id,
        text: comment,
      });
      const updatedDiscussions = discussions.map(discussion => {
        if (discussion._id === discussionId) {
          const updatedComments = [...discussion.comments, res.data.data];
          return { ...discussion, comments: updatedComments };
        }
        return discussion;
      });
      setDiscussions(updatedDiscussions); 
      setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='forum-page'>
      <Sidebar handleClick={setSelectedTopic} />
      <div className='discussion-section'>
        <h2>{selectedTopic}</h2>
        <form onSubmit={handleQuestionSubmit}>
          <input
            type='text'
            placeholder='Enter your question'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type='submit'>POST</button>
        </form>
        <div>
          {discussions.map(discussion => (
            <div key={discussion._id} className='discussion'>
              <h3>{discussion.question}</h3>
              <p>Posted by {discussion.user ? discussion.user : 'Unknown'} on {formatDate(discussion.createdAt)}</p>
              <ul>
                {discussion.comments.map(comment => (
                  <li key={comment._id}>
                    {comment.text}
                    <p>Commented by {comment.user ? comment.user : 'Unknown'} on {formatDate(comment.createdAt)}</p>
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => handleCommentSubmit(discussion._id, e)}>
                <input
                  type='text'
                  placeholder='Enter your comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit'>Comment</button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
