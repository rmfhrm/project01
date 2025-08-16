import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import posts from './posts';
import './App.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <h2>자유 게시판</h2>
      <table className='list-table'>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <Link to={`/post/${post.id}`} className="post-link">
                  {post.title}
                </Link>
              </td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td><button>삭제</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          <IoIosArrowBack />
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
}

export default PostList;
