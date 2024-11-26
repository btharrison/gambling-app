    //const [probability, setProbability] = useState(null);

    // const cardValueFunc = useCallback((currentCard) => {
    //     let value = 0
    //         if(currentCard.value === 'A')
    //         {
    //             value += 11;                        // Adding 11, to main count. If player busts on 11, then 
    //         }
    //         else if ((currentCard.value === 'J') || (currentCard.value === 'Q') || (currentCard.value === 'K')){
    //             value += 10;                        // Adding value of face card
    //         }  
    //         else
    //         {
    //             value += parseInt(currentCard.value);      // converting string to int, to add value of numbered card
    //         }
    //         return value;
    // }, []);

    // const totalWinningCards = useCallback((currentCards, playerCount) =>  {
    //     let cardCount = 0;
    //     for(let card of currentCards) {
    //         let cardNum = cardValueFunc(card);
    //         if((playerCount + cardNum) <= 21)
    //         {
    //             cardCount++;
    //         }
    //     }
    //     return cardCount;
    // }, [cardValueFunc]);

    // const calculateOdds = useCallback(() => {
    //     //const currentPlayer = playerHand;
    //     //const dealerShown = [dealerHand[0]];  // grabbing the hidden card to put back in temp deck
    //     let currentCards = [...deck, dealerHand[1]];
    //     const playerCount = calculateHand(playerHand);
    //     let numCards = totalWinningCards(currentCards, playerCount);

    //     let probablity = numCards / currentCards.length;            // Perecentage for player to hit <= 21

    //     setProbability(probablity);
    // }, [deck, dealerHand, playerHand, totalWinningCards]);