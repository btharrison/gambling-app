import { calculateHand } from './components/blackjackValues'; // Import function to calculate hand value
import { createDeck, shuffleSort } from './components/deck'; // Import functions to create and shuffle the deck
import React, { useState, useEffect, useCallback } from 'react'; // Import React hooks

import '../styles/Blackjack.css'; // Import CSS styles

const Blackjack = () => {
    // State variables to manage deck, hands, game status, and player turn
    const [deck, setDeck] = useState([]); // Current deck of cards
    const [playerHand, setPlayerHand] = useState([]); // Player's hand
    const [dealerHand, setDealerHand] = useState([]); // Dealer's hand
    const [gameStatus, setGameStatus] = useState('ongoing'); // Tracks game outcome: 'win', 'lose', 'bust', etc.
    const [playerTurn, setPlayerTurn] = useState(true); // Boolean for player's turn
    const [gameStarted, setGameStarted] = useState(false); // Track if game is started
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
    
    // Function to start a new round with a fresh deck if necessary
    const startNewRound = useCallback(() => {
        // Check if deck has enough cards; if not, shuffle a new deck MIGHT NOT NEED THIS
        const currentDeck = [...deck];
        if(currentDeck.length < 4) {
            const newDeck = shuffleSort(createDeck()); // Create and shuffle new deck
            setDeck(newDeck);
            startNewRound(newDeck); // Restart round with new deck
            return;
        }
        // Initialize hands for the player and dealer
        const newPlayerHand = [];
        const newDealerHand = [];

        // Deal initial cards: player-dealer-player-dealer
        newPlayerHand.push(currentDeck.pop());
        newDealerHand.push(currentDeck.pop());
        newPlayerHand.push(currentDeck.pop());
        newDealerHand.push(currentDeck.pop());

        setPlayerHand(newPlayerHand); // Set player's hand state
        setDealerHand(newDealerHand); // Set dealer's hand state
    }, []);

    // Function to start a new game when the "Start Game" button is pressed
    const startNewGame = useCallback(() => {
        setGameStatus('ongoing'); // Reset game status
        setPlayerTurn(true); // Set player's turn to true
        startNewRound();
    }, [startNewRound]);

    // Effect to triggers the game start when gameStarted changes to true
    useEffect(() => {
            if (gameStarted !== false){
                if(deck.length <= 4) {     
                    const newDeck = shuffleSort(createDeck())  // If deck is empty on bet then create a new deck
                    const updateDeck = [...newDeck, deck];
                    setDeck(updateDeck);
                }
                startNewGame(); // Call startNewGame if game is started
            }
    }, [gameStarted, startNewGame]);                    // ERROR BECAUSE I DID NOT HAVE GAME START HERE, DONT REMOVE IF USING

    // Function for when the player chooses to Hit
    const hit = () => {
        if(playerTurn && gameStatus === 'ongoing'){
            const newDeck = [...deck];                                  // Clone deck to avoid potential problems
            const dealtCard = newDeck.pop();                            // Pop the top card off, and use for deal
            const updatedPlayerHand = [...playerHand, dealtCard];       // Append the new card to the playerHand Array
            setPlayerHand(updatedPlayerHand);                           // Update player hand state
            setDeck(newDeck);                                           // Update deck state

            const currentValue = calculateHand(updatedPlayerHand);      // Calculate new hand value
            if(currentValue > 21) {                                     // If player busts, end game
                setGameStatus('bust');                                  // set status to bust
                setPlayerTurn(false);                                   // end player's turn
            }
            else {
                //calculateOdds();
            }
        }
    };

    // Function for when the player chooses to "Stand" (end their turn)
    const stand = () => {
        if(playerTurn) {                    
            setPlayerTurn(false); // Switch to dealer's turn
            dealerTurn(); // Call dealer's play logic
        }
    }

    // Function for the dealer's turn, where they draw cards until reaching 17 or higher
    const dealerTurn = () => {
        let updatedDealerHand = [...dealerHand];
        let newDeck = [...deck];

        while(calculateHand(updatedDealerHand) <= 16){
            updatedDealerHand.push(newDeck.pop()); // Dealer draws until 17 or higher
        }
        setDealerHand(updatedDealerHand); // Update dealer's hand

        const dealerValue = calculateHand(updatedDealerHand); // Dealer's final hand value
        const playerValue = calculateHand(playerHand); // Player's final hand value

        // Determine game outcome based on hand values
        if(dealerValue > 21 || (playerValue > dealerValue)){
            setGameStatus('win');
        }
        else if (playerValue === dealerValue){
            setGameStatus('push');
        }
        else {
            setGameStatus('lose');
        }
        setDeck(newDeck); // Update deck
    };

    const handleNewRoundOrLeave = (leave) => {  // Handle starting a new round or leaving the game
        if (leave) {
            //setGameStarted(false); // End the game if leaving
            // CHANGE THIS CODE< THE LOGIC IS NOT GOOD RIGHT NOW
            setGameStarted(false);
            //setDeck([]); // Clear deck
            setDeck(deck);
            setPlayerHand([]); // Clear player hand
            setDealerHand([]); // Clear dealer hand
            setGameStatus('ongoing'); // Reset game status, DO NOT CHANGE, changed to wait, and made loading after start game spasm 
            setPlayerTurn(true); // Reset player turn
        }
    };   

    return (
        <div className="container">
            {/* Main game board container */}
            <div className="game-board">
                {/* Game title */}
                    <div className="dealer-container">
                        <div className="dealer-table">
                            {/* Dealer's hand section */}
                            <div className="dealer-area">
                            <div className="mainDeck">
                                    <div className="card1"><img
                                        src={'/Images/cards/hidden.png'}
                                        alt=''
                                        className="card-image"
                                    /></div>
                                    <div className="card2">
                                        <img
                                            src={'/Images/cards/hidden.png'}
                                            alt=''
                                            className="card-image"
                                        />
                                    </div>
                                    <div className="card3">
                                        <img
                                            src={'/Images/cards/hidden.png'}
                                            alt=''
                                            className="card-image"
                                        />
                                    </div>
                                    <div className="card4">
                                        <img
                                            src={'/Images/cards/hidden.png'}
                                            alt=''
                                            className="card-image"
                                        />
                                    </div>
                                </div>
                                    <div className="chipArea">
                                        <div className="chip1" onClick={()=>handleChipClick(1)}><img
                                            src={'/Images/chips/chip1.png'}
                                            alt=''
                                            className="chip-image"
                                        /></div>
                                        <div className="chip5" onClick={()=>handleChipClick(5)}><img
                                            src={'/Images/chips/chip5.png'}
                                            alt=''
                                            className="chip-image"
                                        /></div>
                                        <div className="chip10" onClick={()=>handleChipClick(10)}><img
                                            src={'/Images/chips/chip10.png'}
                                            alt=''
                                            className="chip-image"
                                        /></div>
                                        <div className="chip100" onClick={()=>handleChipClick(100)}><img
                                            src={'/Images/chips/chip100.png'}
                                            alt=''
                                            className="chip-image"
                                        /></div>
                                </div>
                            { gameStarted !== false && (
                                <div className="groupDealer">
                                    <h2 className="dealerSubtitle">
                                        <span className="circle">
                                        {" "}
                                        {!playerTurn ? (
                                            calculateHand(dealerHand)       // If its dealer turn, show running count
                                        ) : (
                                            dealerHand[0] ? calculateHand([dealerHand[0]]) : '' 
                                        )}
                                        </span>
                                    </h2>
                                    <div className="hand-text dealer-hand">
                                        {dealerHand.map((card, index) => 
                                            // Show dealer's first card or all cards if player's turn has ended
                                            index === 0 || !playerTurn ? (
                                                <img
                                                    key={index}
                                                    src={card.image}
                                                    alt={`${card.value} of ${card.suit}`}
                                                    className="card-image"
                                                />
                                            ) : (
                                                // Hide other cards while it's the player's turn
                                                <img
                                                    key={index}
                                                    src={'/Images/cards/hidden.png'}
                                                    alt=''
                                                    className="card-image"
                                                />
                                            )
                                        )}
                                    </div>
                                </div> 
                            )}    
                            {/** The <>  fixed adjacent error issue */}
                            </div>
    
                            {/* Player's hand section */}
                            <div className="player-area">
                                {gameStarted !== false && (
                                    <>
                                        <div className="hand-text player-hand">
                                            {playerHand.map((card, index) => (
                                                // Display each card in the player's hand
                                                <img
                                                    key={index}
                                                    src={card.image}
                                                    alt={`${card.value} of ${card.suit}`}
                                                    className={`card-image ${index === 0 ? 'first-card' : 'subsequent-card'}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="playerInfoArea">
                                            <h2 className="subtitle mt">
                                                <span className="circle">{calculateHand(playerHand)}</span>
                                            </h2>
                                            <h2 className="amountBet">{total}</h2>
                                            <img
                                                    src={'/Images/chipbet.png'}
                                                    alt=''
                                                    className="chipBet"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* Deck card count display */}
                            
                                <div className="cardCount">
                                <label>
                                    {deck.length}
                                </label>
                                </div>
                        </div>
                    </div>
                    
            </div>
                {/* {probability !== null && (
                    <div>
                        <h2>Current Probability: { probability}%</h2>
                    </div>
                )} */}
            {/* Action buttons - Hit and Stand */}
            { gameStatus === 'ongoing' && playerTurn && gameStarted ? (
                <div className="button-group">
                    <button onClick={hit} className="action-button hit-button">Hit</button>
                    <button onClick={stand} className="action-button stand-button">Stand</button>
                </div>
            ) : !gameStarted ? ( 
                <div className="end-game-display">
                        <div className="betArea">
                            <button onClick={() => setGameStarted(true)} className="deal-button">BET</button>
                            <button className="clearButton" onClick={()=>handleChipClick(-4)}>CLEAR</button>
                            <button className="halfButton" onClick={()=>handleChipClick(-1)}>HALF</button>
                            <button className="doubleButton" onClick={()=>handleChipClick(-2)}>DOUBLE</button>
                            <button className="maxButton" onClick={()=>handleChipClick(-3)}>MAX</button>
                            <input className="betAmount" value={total} ></input> {/* Display the current total */}
                        </div>
                    </div>
            ) : (
              // Display game result and buttons to start a new round or leave the game after the game ends
                    <div className="end-game-display">
                        <h2 className="game-status">
                            {gameStatus === 'win' ? 'You Win!' : gameStatus === 'lose' ? 'You Lose!' : gameStatus === 'bust' ? 'You Busted' : 'It\'s a Push!'}
                        </h2>
                        <div className="button-group">
                            {/* <button onClick={() => handleNewRoundOrLeave(false)} className="new-round-button">New Round</button> */}
                            <button onClick={() => handleNewRoundOrLeave(true)} className="leave-game-button">Ok</button>
                        </div>
                    </div>
            )}
        </div>
    );    
}

export default Blackjack;
