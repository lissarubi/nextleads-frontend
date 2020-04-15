import React from 'react'
import { Link } from 'react-router-dom'
import '../global.css'
import darkmode from 'darkmode-js'


export default function Header(){

    function toggleMenu(e){
        const navlinks = document.querySelector('div.navlinks')
        navlinks.classList.toggle('active')
    }
    return(
        <header>
            <nav>
                <Link to="#" className="toggle-button" id="button" onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </Link>
                <div className="navlinks">
                    <Link to="/"><div className="li">Next</div></Link>
                </div>
                <div className="themeBox">
                </div>
            </nav>
        </header>
    )
}
