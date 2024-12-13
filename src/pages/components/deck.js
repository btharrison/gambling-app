const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];                        // Defining all card suits
const values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A']           // Defining all card values

// Using a nested for loop to pair suits with values to create single deck
const createDeck = () => {
    const starterDeck = [];                     // Initializng deck
    for(let suit of suits) {                     // Creating a loop to go through each suit
        for(let value of values) {               // Creating a loop to go through each value, while going through each suit
            starterDeck.push({                    // Adding card to array, with suit, value, and image location 
                suit, 
                value,
                image: `/Images/cards/${value}_of_${suit.toLowerCase()}.png`});
        }
    }
    return starterDeck;
}

const createHoL = (value) => {
    const starterDeck = [];
    for (let i = 0; i < value; i++) {
        starterDeck.push({                    // Adding card to array, with suit, value, and image location 
            suit: 'hidden', 
            value: 'hidden',
            image: `/Images/cards/hidden.png`});
    }
    return starterDeck;
}

const shuffleSort = (...decks) => {  
    // Pushing all decks into one single array
        const shuffledCards = [].concat(...decks);
    
    // Randomly sorting the combined deck using fisher-yates shuffling algorithim 
        for(let i = shuffledCards.length - 1; i > 0; i--) {
            // Generating random index from 
            let j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i],shuffledCards[j]] = [shuffledCards[j],shuffledCards[i]];
        }

    // Cutting the deck
        const middle = Math.floor(shuffledCards.length / 2);        // Finds middle
        for(let k = 0; k < middle; k++){                            // Iterates until I meet middle
            const temp = shuffledCards[k];                          // Swaps values using temp
            shuffledCards[k] = shuffledCards[k+middle];             
            shuffledCards[k+middle] = temp;
        }
    return shuffledCards;
}

module.exports= {createDeck, shuffleSort, createHoL};
