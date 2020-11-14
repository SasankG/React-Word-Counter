import * as React from "react";

const Navbar: React.FC = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <a className="navbar-brand" href="#">React - Counter</a>
                <a className="navbar-text" href = "https://github.com/SasankG">Sasank Ganapathiraju</a>
            </nav>
        </div>
    )
}

export default Navbar;

