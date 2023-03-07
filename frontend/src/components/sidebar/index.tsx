import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';

import style from './style.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { 
    faBars, 
    faCalculator,
    faHouse,
    faListCheck
 } from '@fortawesome/free-solid-svg-icons';

type props = {
    children: ReactNode
}

const Sidebar = ({children}: props) => {
    const menuItem = [
        {
            path: "/",
            name: "Home",
            icon: <FontAwesomeIcon icon={faHouse} />
        },
        {
            path: "/calculator",
            name: "Calculadora",
            icon: <FontAwesomeIcon icon={faCalculator} />
        },
        {
            path: "/todo",
            name: "To-do",
            icon: <FontAwesomeIcon icon={faListCheck} />
        },
        {
            path: "/stopwatch",
            name: "Cronômetro",
            icon: <FontAwesomeIcon icon={faClock} />
        }
    ];

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    return (
        <div className="container">
            <div style={{width: isOpen ? "200px" : "50px"}} className={style.sidebar}>
                <div className={style.top_section}>
                        <h1 style={{display: isOpen ? "block" : "none"}} className={style.title}>Tools</h1>
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} 
                          className={style.hamburger} onClick={toggle}>
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                </div>
                {
                    menuItem.map((item,index) => (
                        <NavLink to={item.path} key={index} className={style.link}>
                            <div className={style.icons}>{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}}
                              className={style.link_text}>{item.name}
                            </div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;