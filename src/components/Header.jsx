import React from 'react';
import { Link } from 'react-router-dom';
import { GiTigerHead } from "react-icons/gi";
import '../App.css';

export default function Header({title}) {
    return(
        <header className="header">
          <div className="header-title-container">
            <h3 className="header-title"><GiTigerHead className="title-icon" />{title}</h3>
          </div>
          <div className='nav'>
            {/* 메뉴 추가 */}
            <Link to="/" className="nav-link">일반 게시판</Link>
            <Link to="/notice" className="nav-link">공지사항</Link>
          </div>
        </header>
    )
}