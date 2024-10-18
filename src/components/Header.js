import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <>
      <header>
        <div className='container'>
          <div className='header_nav'>
            <ul className='header_left'>
              <Link to='/header'> NOMAD </Link>
            </ul>          
            <ul className='header_right'>
              <Link to='/students'>{t('students1')}</Link>
              <Link to='/info'>{t('info')}</Link>
              <Link to='/contacts'>{t('contacts')}</Link>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

