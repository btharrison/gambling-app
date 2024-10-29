// App.js
import NavBar from './components/navBar';
import Home from './pages/Home';
import Blackjack from './pages/Blackjack';
import Account from './pages/Account';
import { Route, Routes } from 'react-router-dom';


const App = () => {
    
    return (
        <>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={ <Home/> } />  
                    <Route path="/Home" element={ <Home/> } />
                    <Route path="/Blackjack" element={ <Blackjack/> }/>
                    <Route path="/Account" element= {<Account/> }/>
                </Routes>
            </div>
        </>
    )

};

export default App;
