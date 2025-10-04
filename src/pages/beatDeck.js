import React, { useState, useEffect } from 'react'; // Import React hooks
import { createHoL, createDeck, shuffleSort } from './components/deck'; // Import functions to create and shuffle the deck

import '../styles/beatDeck.css'; // Importing css styles

const HoL = () => { // Higher or Lower
    const [deck, setDeck] = useState([]); // Current deck of cards
    const [playerHand, setPlayerHand] = useState([]); // Player's hand
    const [betClicked, setBetClicked] = useState(false); // When the bet button is clicked
    //const [gameStarted, setGameStarted] = useState(false); // Track if game is started
    const [gameStatus, setGameStatus] = useState(null);
    const [stackSize, setStackSize] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentCard, setCurrentCard] = useState(null)
    //const [gameState, setGameState] = useState([]);
    const [total,setTotal] = useState(0);

    const cardValueMap = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14  // or special case separately
    };

    const [cardCount, setCardCount] = useState({
        '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'J': 0, 'Q': 0, 'K': 0, 'A': 0, 'total': 0
    });

    const betX = {
        3: 30,
        6: 3,
        9: 2
    };

    const calculatePercentages = (cardValue) => {
        let higherCount = 0
        let lowerCount = 0
        let cardInt = cardValueMap[cardValue]
        if(cardValue === 'A'){
            return [1, 1]       // we play where A is highest and lowest card
        }
        for (const [key, value] of Object.entries(cardCount)) {
            // Iterating through list of seen cards and totaling cards that are higher and lower
            if(key !== 'total') {
                if(key !== 'A'){
                    if(cardValueMap[key] > cardInt) {
                        higherCount += 4 - value
                    }
                    else if (cardValueMap[key] < cardInt){
                        lowerCount += 4 - value
                    }
                }
            }    
        }
        // Adding ace count to smallest percentage
        higherCount > lowerCount ? lowerCount += (4 - cardCount['A']) : higherCount += (4-cardCount['A']);

        // Returing array of higher and lower, subtracting cards equal from the count
        return [(higherCount )/ (52 - cardCount['total']) , (lowerCount)/ (52 - cardCount['total'])]
    }

    const handleHigher = () => {
        console.log("Higher clicked")
        if(playerHand[selectedCard].suit !== 'hidden') {    // Making sure a failed card is not picked
            const newDeck = deck;
            const newCard = newDeck.pop();          // Should not worry about deck being zero, should be handled before
            // Utilizing a set for state variable, it does not update immediately so cardCount can be a little off that way. Changed to manual overide
            const updatedCardCount = {
                ...cardCount,
                [newCard.value]: (cardCount[newCard.value] || 0) + 1,
                'total': cardCount['total'] + 1
            };
            setCardCount(updatedCardCount);

            setCurrentCard(newCard)
            let gameContinue = false;
            const newPlayerHand = [...playerHand]
            
            let playerValue = newPlayerHand[selectedCard].value === 'A' ? 14 : cardValueMap[newPlayerHand[selectedCard].value];
            let newCardValue = newCard.value === 'A' ? 14 : cardValueMap[newCard.value];


            console.log(`selected card value: ${playerValue}`); 
            console.log(`dealt card value: ${newCardValue}`);
            
            if(newPlayerHand[selectedCard].value !== 'A' && playerValue > newCardValue) {  // ACE IS HIGHEST AND LOWEST CARD
                // Replacing the card in the player hand to hidden
                newPlayerHand[selectedCard].suit = 'hidden';
                newPlayerHand[selectedCard].value = 'hidden';
                newPlayerHand[selectedCard].image = `/Images/cards/hidden.png`;
            }
            else {
                // Replacing the card in the player hand to the new card
                newPlayerHand[selectedCard] = newCard;
            }
            setDeck(newDeck);
            setPlayerHand(newPlayerHand);
            console.log(updatedCardCount);  // Remove this later

            for(let i = 0; i < stackSize; i++) {
            // iterating through player hand to see if all values are not hidden, if a value that is not hidden is found, we must continue the game.
                if(newPlayerHand[i].suit !== 'hidden') {
                    gameContinue = true;
                }
            }

            // Checking if game should continue
            if(gameContinue === false) {
                setGameStatus('lose');
            }
            else if (deck.length === 0) {   // If the deck is empty the player beat the deck
                setGameStatus('won');
            }
            // else stays ongoing
        }
    };

    const handleLower = () => {
        console.log("Lower clicked")
        if(playerHand[selectedCard].suit !== 'hidden') {
            const newDeck = deck;
            const newCard = newDeck.pop();          // Should not worry about deck being zero, should be handled before, might need to double check aces
            
            const updatedCardCount = {
                ...cardCount,
                [newCard.value]: (cardCount[newCard.value] || 0) + 1,
                'total': cardCount['total'] + 1
            };
            setCardCount(updatedCardCount);

            setCurrentCard(newCard)
            let gameContinue = false;
            const newPlayerHand = [...playerHand]
            let playerValue = newPlayerHand[selectedCard].value === 'A' ? 1 : cardValueMap[newPlayerHand[selectedCard].value];
            let newCardValue = newCard.value === 'A' ? 1 : cardValueMap[newCard.value];
           
            console.log(`selected card value: ${playerValue}`); 
            console.log(`dealt card value: ${newCardValue}`);

            if(newPlayerHand[selectedCard].value !== 'A' && playerValue < newCardValue) {  // ACE IS HIGHEST AND LOWEST CARD
                // Replacing the card in the player hand to hidden
                newPlayerHand[selectedCard].suit = 'hidden';
                newPlayerHand[selectedCard].value = 'hidden';
                newPlayerHand[selectedCard].image = `/Images/cards/hidden.png`;
            }
            else {
                // Replacing the card in the player hand to the new card
                newPlayerHand[selectedCard] = newCard;
            }
            setDeck(newDeck);
            setPlayerHand(newPlayerHand);
            console.log(updatedCardCount);         // REMOVE THIS LATER

            for(let i = 0; i < stackSize; i++) {
            // iterating through player hand to see if all values are not hidden, if a value that is not hidden is found, we must continue the game.
                if(newPlayerHand[i].suit !== 'hidden') {
                    gameContinue = true;
                }
            }

            // Checking if game should continue
            if(gameContinue === false) {
                setGameStatus('lose');
            }
            else if (deck.length === 0) {   // If the deck is empty the player beat the deck
                setGameStatus('won');
            }
        }
    };

    const handleBetClick = () => {
        if(total !== 0){     // Making sure bet is not zero
            setBetClicked(true);
            initialDeal();
        }
        else {
            alert("CANNOT BET ZERO")// BET IS ZERO, HANDLE THIS
        }
    };

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

    // Using two decks, a 
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

    const resetGame = () => {
        setBetClicked(false);
        setGameStatus(null);
        setPlayerHand([]);
        setSelectedCard(null);
        setStackSize(null);
        setCurrentCard(null);
        let newCardCount = {'2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, 'J': 0, 'Q': 0, 'K': 0, 'A': 0, 'total': 0};
        setCardCount(newCardCount);
    }

    const initialDeal = () => {
        const newDeck = shuffleSort(createDeck());   // Creating a deck and sorting it
        for(let  i = 0; i < stackSize; i++) {
            const newCard = newDeck.pop();
            playerHand[i] = newCard;
            setCardCount(prev => ({
            ...prev,
            [newCard.value]: prev[newCard.value] + 1,
            'total': prev['total'] + 1
            }));
        }
        // for(let  i = 0; i < 40; i++) {
        //     newDeck.pop();
        // }
        setDeck(newDeck);       // Setting the global deck to the current deck
        setGameStatus('ongoing');   // Set game state to in progress
        setSelectedCard(null);          // Making sure selected card is empty before cards have been dealt
    };


    useEffect(() => {
        if(betClicked === true && stackSize !== null) {
            //initialDeal();
        }
    }, [gameStatus, betClicked, deck, stackSize]);

    return (
        <div className="page">
            <div className="resultLabel">
                <label>
                    {gameStatus === 'won' ? `YOU WIN ` : gameStatus === 'lose' ? `YOU LOSE ` : gameStatus === 'ongoing' ? 'CURRENT BET ' : ''}
                </label>
                <label style={{ color: gameStatus === 'won' ? '#dba100ff' : gameStatus === 'lose' ? '#b80404ff' : 'black'}}>
                    {gameStatus === 'won' ? `${total * betX[stackSize]}` : gameStatus === 'lose' ? `${total}` : gameStatus === 'ongoing' ? `${total}` : ''}
                </label>
            </div>
            <div className="percent">
                <label>
                    {stackSize !== 9 && selectedCard !== null && playerHand[selectedCard].suit !== 'hidden' && gameStatus === 'ongoing'
                    ? (() => {
                        const [higher, lower] = calculatePercentages(playerHand[selectedCard].value);
                        return `H ${(higher*100).toFixed(1)}% / L ${(lower*100).toFixed(1)}%`;
                    })()
                    : ""}
                </label>
            </div>
            <div className="gameBoard">
                <div className="cardCount2">
                { betClicked && (
                    <>
                    <label> 
                        {deck.length} CARDS LEFT
                    </label>
                    </>
                )}
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
                            src={currentCard ? currentCard.image : '/Images/cards/hidden.png'}
                            alt=''
                            className="card-image2"/>
                    </div>
                </div>
                <div className="cards">
                    {playerHand.map((card, index) => {
                        // Check how many cards should be displayed based on the length of the player's deck
                        if (stackSize === 3 || stackSize === 9 || stackSize === 6) {
                            // Show the first 3 cards normally
                            return (
                                <img
                                    key={index}
                                    src={card.image}
                                    alt={`${card.value} of ${card.suit}`}
                                    className={`card-image1 ${selectedCard === index ? 'selected-card' : ''}`}
                                    onClick={() => selectCard(index)}
                                    tabIndex="0"                // Allows image to be focussed 
                                />
                            );
                        }
                        return null
                    })}
                </div>
            </div> 
            <div className="gameButtons">
                { gameStatus === 'ongoing' && (
                    <>
                        <button className="gameButton" onClick={handleHigher}>Higher</button>
                        <button className="gameButton" onClick={handleLower}>Lower</button>
                    </>
                )}
            </div>
            <div className="betArea2">
                {!betClicked && stackSize !== null && (
                    <>
                    <button onClick={() => handleBetClick()} className="deal-button">BET</button>
                    <button className="clearButton" onClick={()=>handleChipClick(-4)}>CLEAR</button>
                    <button className="halfButton" onClick={()=>handleChipClick(-1)}>HALF</button>
                    <button className="doubleButton" onClick={()=>handleChipClick(-2)}>DOUBLE</button>
                    <button className="maxButton" onClick={()=>handleChipClick(-3)}>MAX</button>
                    <input className="betAmount" value={total} ></input> {/* Display the current total */} 
                    </>
                )}
            </div>
            <div className="chipArea2">
                {!betClicked && (
                <>
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
                    </> 
                )}
                </div>
            <div className="initializeGame">
            {!betClicked && (           // Condition that the buttons show when the betClicked state is false
                <>
                <label>SELECT NUMBER OF CARD STACKS</label>
                <div className="Buttons">
                    <button onClick={()=>generateStacks(3)} className="button">3</button>
                    <button onClick={()=>generateStacks(6)} className="button">6</button>
                    <button onClick={()=>generateStacks(9)} className="button">9</button>
                </div>
                </>
            )}
            {betClicked && (gameStatus === 'won' || gameStatus === 'lose') && (
            <div className="newGame">
                <>
                <button onClick={()=>resetGame()} className="newButton">
                New Game
                </button>
                </>
            </div>
            )}
            </div>
        </div>
    );

}

export default HoL;