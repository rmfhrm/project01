import React from 'react';
import { Link } from 'react-router-dom';
// 호랑이 머리 아이콘을 가져와.
import { GiTigerHead } from "react-icons/gi";
import '../App.css';

export default function Header({title}) {
    return(
        <header className="header">
          {/* 헤더 왼쪽 부분: 제목과 네비게이션 메뉴 */}
          <div className="header-left">
            <div className="header-title-container">
              {/* 아이콘과 함께 제목을 표시. */}
              <h3 className="header-title"><GiTigerHead className="title-icon" />{title}</h3>
            </div>
            <div className='nav'>
              {/* Link 컴포넌트로 메뉴를 만들어. 클릭하면 페이지 이동. */}
              <Link to="/" className="nav-link">자유 게시판</Link>
              <Link to="/notice" className="nav-link">공지사항</Link>
            </div>
          </div>
          
          {/* 헤더 오른쪽 부분: 로그인 및 회원가입 버튼 */}
          <div className="auth-buttons">
            <button className="auth-button login">로그인</button>
            <button className="auth-button signup">회원가입</button>
          </div>
        </header>
    )
}
