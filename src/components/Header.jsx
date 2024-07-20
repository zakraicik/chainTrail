import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import '../css/header.css'

const Header = ({ search }) => {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  return (
    <header className='header'>
      <div className='header-row'>
        <img src={logo} alt='Logo' className='logo' />
        <div className='search-bar-container'>
          <input
            type='text'
            className='search-bar'
            placeholder='Block number or hash'
            value={inputValue}
            onChange={handleInputChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className='search-icon'
            onClick={() => search(inputValue)}
          />
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
