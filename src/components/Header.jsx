import React from 'react'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import '../css/header.css'

const Header = ({ onPress }) => {
  return (
    <header className='header'>
      <div className='header-row'>
        <img src={logo} alt='Logo' className='logo' />
        <div className='search-bar-container'>
          <input
            type='text'
            className='search-bar'
            placeholder='Block number or hash'
          />
          <div onClick={onPress}>
            <FontAwesomeIcon icon={faSearch} className='search-icon' />
          </div>
        </div>
      </div>
      <div className='header-row'>
        <div className='header-text'>
          <span className='name-text'>chainTrail. </span>
          <span className='slogan-text'>A better blockchain explorer</span>
        </div>
      </div>
    </header>
  )
}

export default Header
