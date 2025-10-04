import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function NavBar() {
    return (
        <header>
            <a className="logo" href="/">
                <img src="/loko.png" alt="logo" style={{ marginTop: "5px", width: "125px", height: "25px", marginLeft: "10px" }} />
            </a>
            <nav className="nav">
                <ul className="nav__links">
                    <li>
                        <CustomLink to="/blackjack">Blackjack</CustomLink> {/* Active, allows for the highlight feature */}
                    </li>
                    <li>
                        <CustomLink to="/btd">Beat the Deck</CustomLink>
                    </li>
                </ul>
            </nav>
            <ul className="accountStuff">
                <li>
                    <CustomLink to="/account" >Account</CustomLink>
                </li>
            </ul>
        </header>

    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active": ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}