module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21.
        card: undefined,
    };
    return {
        /*
            Rules
            The player start the game with 2 cards, each card has an associate point value:

            The Jack, Queen and King are worth 10 points
            An Ace is worth 1 or 11 points depending on which is most beneficial to the player

            The player can choose between two actions "21 or under" or "over 21":

            "21 or under" -> The player draws a new card if his total point value:

            Is under 21, the game continues
            Is 21, the player wins the game
            Is over 21, the player loses the game

            "over 21" -> The player draws the final card if his total point value:

            Is under 21, the player loses the game
            Is 21, the player loses the game
            Is over 21, the player wins the game
        */
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            // TODO Skilar alltaf false nema player tapar (eða player vinnur?)
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            // TODO skilar alltaf false nema player vinnur
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            // TODO
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            // TODO
        },
        getTotal: (game) => {
            // TODO
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            // TODO
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            // TODO
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            // TODO
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
        },
    };
};