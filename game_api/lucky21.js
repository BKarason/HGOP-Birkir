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
      let sum = game.getTotal(game);

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
      let sum = game.getTotal(game);

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
        let val = +game.state.cards[i].substr(0, 2);
        
        if(val != 1) {
          if(val > 10) {
            sum += 10;
          }
          else {
            sum += val;
          }
        }
        else {
          if((sum + 11) > 21) {
            sum += 1;
          }
          else {
            sum += 11;
          }
        }
      }
      return sum;
    },
    // The value of the card that should exceed 21 if it exists
    // (integer or undefined).
    getCardValue: (game) => {
      // TODO
      if (game.state.card != undefined) {
        let val = +game.state.card.substr(0, 2);

        if(val != 1) {
          if(val > 10) {
            return 10;
          }
          else {
            return val;
          }
        }
        else {
          if((game.getGardsValue() + 11) > 21) {
            return 1;
          }
          else {
            return 11;
          }
        }
      }
      return game.state.card;
    },
    getTotal: (game) => {
      // TODO
      let cardsSum = game.getCardsValue(game);
      let card = game.getCardValue(game);
      if(card != undefined) {
        return cardsSum + card;
      }
      return cardsSum;
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
