import React, { useState, useEffect, useCallback } from 'react'; // Import React hooks
import { createHoL } from './components/deck'; // Import functions to create and shuffle the deck

import '../styles/hol.css'; // Importing css styles

const HoL = () => {
    const [deck, setDeck] = useState([]); // Current deck of cards
    const [playerHand, setPlayerHand] = useState([]); // Player's hand
    const [betClicked, setBetClicked] = useState(false); // When the bet button is clicked
    const [gameStarted, setGameStarted] = useState(false); // Track if game is started
    const [gameStatus, setGameStatus] = useState(null);
    const [stackSize, setStackSize] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [total,setTotal] = useState(0);

    const handleChipClick = (value) => {
        if(value === -4 ) {              // CLEAR
            setTotal(prevTotal => 0);
        }
        else if(value === -3) { // MAX BET
            setTotal(prevTotal => prevTotal);   // GONNA HAVE TO GRAB USERS BAL WHEN IMPLEMENT DB
        }
        else if(value === -2) {      // DOUBLE THE CURRENT BET
            setTotal(prevTotal=> prevTotal * 2);
        }   
        else if(value === -1) {     // Half the current bet
            setTotal(prevTotal=> {
               const newVal = prevTotal / 2;
               if(newVal < 1 && newVal !== 0)
               {
                    return 1;
               }
               else {
                    return Math.floor(newVal);
               }
            });
        }
        else {
            setTotal(prevTotal => prevTotal + value); // Add
        }
    };

    const selectCard = (value) => {
        setSelectedCard(value);
    };

    const generateStacks = (value) => {
        setSelectedCard(null);
        let size = 0;
        // Setting stackSize to selected value
        if(value === 3) {
            size = 3;
        }
        else if (value === 6) {
            size = 6;
        }
        else {      // Value == 9
            size = 9;
        }
        let newDeck = [];                           // Generating starter deck for hidden cards
        newDeck = createHoL(size);
        setStackSize(size);             // Setting state to value (not sure if this will actually be used)
        setPlayerHand(newDeck);
    };
    useEffect(() => {
    
    }, [gameStarted, gameStatus, betClicked, deck]);

    return (
        <div className="page">
            <div className="gameBoard">
                <div className="cardCount2">
                    <label>
                        {selectedCard}
                    </label>
                </div>
                <div className="deck">
                    <div className="card1"><img
                            src={'/Images/cards/hidden.png'}
                            alt=''
                            className="card-image2"/>
                    </div>
                    <div className="card2"><img
                            src={'/Images/cards/hidden.png'}
                            alt=''
                            className="card-image2"/>
                    </div>
                    <div className="card3"><img
                            src={'/Images/cards/hidden.png'}
                            alt=''
                            className="card-image2"/>
                    </div>
                    <div className="card4"><img
                            src={'/Images/cards/hidden.png'}
                            alt=''
                            className="card-image2"/>
                    </div>
                </div>
                <div className="cards">
                    {playerHand.map((card, index) => {
                        // Check how many cards should be displayed based on the length of the player's deck
                        if (stackSize === 3) {
                            // Show the first 3 cards normally
                            return (
                                <img
                                    key={index}
                                    src={card.image}
                                    alt={`${card.value} of ${card.suit}`}
                                    className="card-image1"
                                    onClick={() => selectCard(index)}
                                    tabIndex="0"                // Allows image to be focussed 
                                />
                            );
                        } else if (stackSize === 6) {
                            // Show the first 6 cards
                            return (
                                <img
                                    key={index}
                                    src={card.image}
                                    alt={`${card.value} of ${card.suit}`}
                                    className="card-image1"
                                    onClick={() => selectCard(index)}
                                    tabIndex="0"
                                />
                            );
                        } else if (stackSize === 9) {
                            // Show the first 9 cards
                            return (
                                <img
                                    key={index}
                                    src={card.image}
                                    alt={`${card.value} of ${card.suit}`}
                                    className="card-image1"
                                    onClick={() => selectCard(index)}
                                    tabIndex="0"
                                />
                            );
                        }
                    })}
                </div>
            </div> 
            <div className="betArea2">
                <button onClick={() => setBetClicked(true)} className="deal-button">BET</button>
                <button className="clearButton" onClick={()=>handleChipClick(-4)}>CLEAR</button>
                <button className="halfButton" onClick={()=>handleChipClick(-1)}>HALF</button>
                <button className="doubleButton" onClick={()=>handleChipClick(-2)}>DOUBLE</button>
                <button className="maxButton" onClick={()=>handleChipClick(-3)}>MAX</button>
                <input className="betAmount" value={total} ></input> {/* Display the current total */}
            </div>
            <div className="chipArea2">
                    <div className="chip1" onClick={()=>handleChipClick(1)}><img
                        src={"/Images/chips/chip1.png"}
                        alt=''
                        className='chip-image2'
                        />
                    </div>
                    <div className="chip5"onClick={()=>handleChipClick(5)}><img
                        src={"/Images/chips/chip5.png"}
                        alt=''
                        className='chip-image2'
                        />
                    </div>
                    <div className="chip10" onClick={()=>handleChipClick(10)}><img
                        src={"/Images/chips/chip10.png"}
                        alt=''
                        className='chip-image2'
                        />
                    </div>
                    <div className="chip100" onClick={()=>handleChipClick(100)}><img
                        src={"/Images/chips/chip100.png"}
                        alt=''
                        className='chip-image2'
                        />
                    </div>
                </div>
            <div className="initializeGame">
                <label>SELECT NUMBER OF CARD STACKS</label>
                <div className="Buttons">
                    <button onClick={()=>generateStacks(3)} className="button">3</button>
                    <button onClick={()=>generateStacks(6)} className="button">6</button>
                    <button onClick={()=>generateStacks(9)} className="button">9</button>
                </div>
            </div>
        </div>
    );

}

export default HoL;