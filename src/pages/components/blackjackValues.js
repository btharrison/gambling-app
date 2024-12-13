const calculateHand = (hand) => {
    let value = 0;
    let aceCount = 0;
    for(let card of hand) {
        if(card.value === 'A')
        {
            value += 11;                        // Adding 11, to main count. If player busts on 11, then 
            aceCount += 1;
        }
        else if ((card.value === 'J') || (card.value === 'Q') || (card.value === 'K')){
            value += 10;                        // Adding value of face card
        }  
        else
        {
            value += parseInt(card.value);      // converting string to int, to add value of numbered card
        }
    }
    // If the player has aces and busts, this auto adjusts the card value to lower value with ace included
    while(value > 21 && aceCount > 0){
        value -= 10;            // Removes ten, so the ace is valued as 1
        aceCount -= 1;          // removes the ace from the count
    }
    return value;               // returns the value
}

module.exports = {calculateHand};