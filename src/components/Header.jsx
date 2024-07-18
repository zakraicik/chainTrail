import React from 'react'
import logo from '../assets/logo.png'

import '../css/header.css'

const Header = () => {
  return (
    <header className='header'>
      <div className='header-row'>
        <img src={logo} alt='Logo' className='logo' />
        <input
          type='text'
          className='search-bar'
          placeholder='Search block number'
        />
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
