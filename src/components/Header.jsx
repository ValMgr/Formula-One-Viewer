import { Link } from "react-router-dom";

function Header(){
    return(
        <header className="App-header">
            <h1>Formula One Viewer</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/seasons">Seasons</Link>
                <Link to="/drivers">Drivers</Link>
                <Link to="/teams">Teams</Link>
            </nav>
        </header>
    )
}

export default Header;