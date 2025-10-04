// App.js
import NavBar from './components/navBar';
import Home from './pages/Home';
import Blackjack from './pages/Blackjack';
import Account from './pages/Account';
import HoL from './pages/beatDeck';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';


const App = () => {
    
    return (
        <>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={ <Home/> } />  
                    <Route path="/Home" element={ <Home/> } />
                    <Route path="/blackjack" element={ <Blackjack/> }/>
                    <Route path="/btd" element={ <HoL/> }/>
                    <Route path="/account" element= {<Account/> }/>
                    <Route path="/login" element= {<Login/> }/>
                </Routes>
            </div>
        </>
    )

};

export default App;
