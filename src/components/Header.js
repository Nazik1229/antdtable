import React from 'react'
import { Link  } from 'react-router-dom' 

export default function Header() {
  return (
    <>
      <header>
        <div className='container'>
          <div className='header_nav'>
            <ul className='header_left'>
              <Link to='/header'> NOMAD </Link>
            </ul>          
            <ul className='header_right'>
                <Link to='/students'>Студенты</Link>
                <Link to='/info'>Информация</Link>
                <Link to='/contacts'>Контакты</Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
