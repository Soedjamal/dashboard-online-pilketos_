import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./styles/navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faBars, faUserGroup, faUsers } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [menu, setMenu] = useState(false)
    const { pathname } = useLocation()
    return (
        <>
            <FontAwesomeIcon style={{
                position: "absolute",
                top: "20",
                left: "20"
            }} onClick={() => setMenu(!menu)} icon={faBars} />

            {menu ? <div style={{
                transition: "all 0.5s ease",
                position: "absolute",
                padding: "20px 20px",
                zIndex: "1000",
                left: 0,
                height: "100vh",
                backgroundColor: "#171717",
                width: "250px",
                color: "rgb(200,200,200)"
            }} className="container">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }} className="nav-logo">
                    <h2 className="head-title">
                        Dashboard
                    </h2>
                    <FontAwesomeIcon onClick={() => setMenu(!menu)} icon={faBars} />
                </div>
                <nav style={{
                    color: "rgb(200,200,200)"
                }} className="nav-container">
                    <ul className="nav-list-container" >
                        <li style={pathname === "/" ? {
                            backgroundColor: "rgb(48, 48, 48)"
                        } : {}} className='nav-list'> <FontAwesomeIcon icon={faUserGroup} /> <Link to="/" className='nav-link'>Kandidat</Link></li>
                        <li
                            style={pathname === "/voter-cards" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faAddressCard} /> <Link to="/voter-cards" className='nav-link'>Card Voters</Link></li>
                        <li
                            style={pathname === "/voters" ? {
                                backgroundColor: "rgb(48, 48, 48)"
                            } : {}}
                            className='nav-list'> <FontAwesomeIcon icon={faUsers} /> <Link to="/voters" className='nav-link'>Voters</Link></li>
                    </ul>
                </nav>
            </div> : <div style={{
                transition: "all 0.5s ease",
                position: "absolute",
                padding: "20px 20px",
                left: "-100%",
                height: "100vh",
                backgroundColor: "#171717",
                width: "250px",
                color: "rgb(200,200,200)"
            }} className="container">
                <div className="nav-logo">
                    <h2 className="head-title">
                        Dashboard
                    </h2>
                </div>
                <nav style={{
                    color: "rgb(200,200,200)"
                }} className="nav-container">
                    <ul className="nav-list-container" >
                        <li className='nav-list'><Link to="/" className='nav-link'>Kandidat</Link></li>
                        <li className='nav-list'><Link to="/voter-cards" className='nav-link'>Card Voters</Link></li>
                        <li className='nav-list'><Link to="/voters" className='nav-link'>Voters</Link></li>
                    </ul>
                </nav>
            </div>}
        </>
    )
}

export default Navbar