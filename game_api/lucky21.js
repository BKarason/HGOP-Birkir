module.exports = (deck, dealer) => {
  dealer.shuffle(deck);
  const card0 = dealer.draw(deck);
  const card1 = dealer.draw(deck);
  const state = {
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
  /**
    * NEED TO CHECK FOR ACES!!!!
    * The Jack, Queen and King are worth 10 points
    * An Ace is worth 1 or 11 points depending on
    * which is most beneficial to the player
    */
    state: state,
    // Is the game over (true or false).
    isGameOver: (game) => {
      // let sum = getTotal(game);
      let sum = 0;
      for (let i = 0; i < game.state.cards.length; i++) {
        sum += +game.state.cards[i].substr(0, 2);
      }
      if (game.state.card != undefined) {
        sum += +game.state.card.substr(0, 2);
      }

      if (sum < 21 && game.state.card == undefined) {
        return false;
      }

      if (sum > 21 && game.state.card == undefined) {
        return true;
      }

      if (sum < 21 && game.state.card != undefined) {
        return true;
      }

      if (sum == 21 && game.state.card != undefined) {
        return true;
      }
      return false;
    },
    // Has the player won (true or false).
    playerWon: (game) => {
      let sum = 0;
      for (let i = 0; i < game.state.cards.length; i++) {
        sum += +game.state.cards[i].substr(0, 2);
      }
      if (game.state.card != undefined) {
        sum += +game.state.card.substr(0, 2);
      }

      if (sum == 21 && game.state.card == undefined) {
        return true;
      }
      if (sum > 21 && game.state.card != undefined) {
        return true;
      }
      if (sum < 21 && game.state.card == undefined) {
        return false;
      }
      return false;
    },
    // The highest score the cards can yield without going over 21 (integer).
    getCardsValue: (game) => {
      // TODO
      let sum = 0;
      for (let i = 0; i < game.state.cards.length; i++) {
        sum += +game.state.cards[i].substr(0, 2);
      }
      return sum;
    },
    // The value of the card that should exceed 21 if it exists
    // (integer or undefined).
    getCardValue: (game) => {
      // TODO
      if (game.state.card != undefined) {
        return +game.state.card.substr(0, 2);
      }
      return game.state.card;
    },
    getTotal: (game) => {
      // TODO
      let sum = 0;
      for (let i = 0; i < game.state.cards.length; i++) {
        sum += +game.state.cards[i].substr(0, 2);
      }
      if (game.state.card != undefined) {
        sum += +game.state.card.substr(0, 2);
      }
      return sum;
    },
    // The player's cards (array of strings).
    getCards: (game) => {
      // TODO
      return game.state.cards;
    },
    // The player's card (string or undefined).
    getCard: (game) => {
      // TODO
      return game.state.card;
    },
    // Player action (void).
    guess21OrUnder: (game) => {
      // TODO
      const sub21Card = game.state.dealer.draw(deck);
      game.state.cards.push(sub21Card);
    },
    // Player action (void).
    guessOver21: (game) => {
      // TODO
      const post21Card = game.state.dealer.draw(deck);
      game.state.card = post21Card;
    },
  };
};
