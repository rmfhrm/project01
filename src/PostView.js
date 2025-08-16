import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import posts from './posts';
import './App.css';
// 반응 버튼 아이콘 가져오기.
import { FaThumbsUp, FaRegComment, FaHeart } from "react-icons/fa";

function PostView() {
  // URL에서 게시글 ID 가져오기.
  const { id } = useParams();
  // 페이지 이동 함수 가져오기.
  const navigate = useNavigate();

  // ID와 일치하는 게시글 찾기.
  const post = posts.find((p) => p.id === parseInt(id));

  // 1. 댓글 목록과 새 댓글 내용 상태 관리.
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // 게시글이 없을 경우 메시지 표시.
  if (!post) {
    return <div>게시글을 찾을 수 없어.</div>;
  }

  // '목록으로' 버튼 클릭 시 뒤로 가기.
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // 2. 댓글 입력창 내용 변경 시 상태 업데이트.
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  // 3. '등록' 버튼 클릭 시 댓글 추가.
  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      // 새 댓글 데이터 객체 생성.
      const commentId = comments.length > 0 ? comments[comments.length - 1].id + 1 : 1;
      const date = new Date().toLocaleDateString('ko-KR');
      const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
      const newCommentData = {
        id: commentId,
        author: '익명',
        content: newComment,
        date: date,
        time: time
      };
      // 기존 댓글에 새 댓글 추가 후 상태 업데이트.
      setComments([...comments, newCommentData]);
      // 입력창 초기화.
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
        {/* 댓글 수 표시. */}
        <button className='reaction-button comment'>
          <FaRegComment className='reaction-icon' /> 댓글 ({comments.length})
        </button>
      </div>
      <div className='post-actions'>
        {/* '목록으로' 버튼에 클래스 추가. */}
        <button className="btn-edit">수정</button>
        <button className="btn-delete">삭제</button>
        <button onClick={handleGoBack} className="btn-list">목록으로</button>
      </div>
      {/* 4. 댓글 섹션과 UI 추가. */}
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
        {/* 5. 댓글 목록 표시. */}
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
            아직 댓글이 없어.
          </div>
        )}
      </div>
    </div>
  );
}

export default PostView;