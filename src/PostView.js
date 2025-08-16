import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import posts from './posts';
import './App.css';
import { FaThumbsUp, FaRegComment, FaHeart } from "react-icons/fa";

function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // URL 파라미터로 받은 id와 일치하는 게시글 찾기
  const post = posts.find((p) => p.id === parseInt(id));

  // 댓글 상태 관리
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 돌아가기
  };
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      const commentId = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
      const date = new Date().toLocaleDateString('ko-KR');
      const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      const newCommentData = {
        id: commentId,
        author: '익명', // 실제로는 로그인한 사용자의 이름이 들어가야 합니다.
        content: newComment,
        date: date,
        time: time
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };
  
  return (
    <div className='post-view'>
      <h2>{post.title}</h2>
      <div className='post-meta'>
        <span>작성자: {post.author}</span>
        <span>작성일: {post.date}</span>
      </div>
      <hr />
      <div className='post-content'>
        <p>{post.content}</p>
      </div>
      <div className='post-reactions'>
        <button className='reaction-button like'>
          <FaThumbsUp className='reaction-icon' /> 추천
        </button>
        <button className='reaction-button heart'>
          <FaHeart className='reaction-icon' /> 좋아요
        </button>
        <button className='reaction-button comment'>
          <FaRegComment className='reaction-icon' /> 댓글
        </button>
      </div>
      <div className='post-actions'>
        <button onClick={handleGoBack}>목록으로</button>
      </div>
      {/* 댓글 섹션 */}
      <div className='comments-section'>
        <h3>댓글 ({comments.length})</h3>
        <div className='comment-input-area'>
          <textarea 
            placeholder='댓글을 입력하세요...'
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button onClick={handleCommentSubmit}>등록</button>
        </div>
        {comments.length > 0 ? (
          <div className='comment-list'>
            {comments.map((comment) => (
              <div key={comment.id} className='comment-item'>
                <div className='comment-meta'>
                  <span>{comment.author}</span>
                  <span>{comment.date} {comment.time}</span>
                </div>
                <div className='comment-content-text'>
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-comments'>
            아직 댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default PostView;
