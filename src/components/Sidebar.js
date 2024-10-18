import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers } from 'react-icons/fa'; 
import toggleImage from '../img/nomad.PNG';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { t, i18n } = useTranslation(); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div>
                <div className="toggle-icon" onClick={toggleSidebar}>
                    <img src={toggleImage} alt="Toggle Sidebar"/>
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/">
                            <FaHome />
                            {isOpen && <span>{t('welcome')}</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/students">
                            <FaUsers />
                            {isOpen && <span>{t('students1')}</span>}
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                {isOpen && (
                    <div className="language-switcher">
                        <button onClick={() => changeLanguage('en')}>EN</button>
                        <button onClick={() => changeLanguage('ru')}>RU</button>
                        <button onClick={() => changeLanguage('kg')}>KG</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;





