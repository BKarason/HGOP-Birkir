const dealerConstructor = require('./dealer.js');

test('a new game should have 50 cards left in the deck', () => {
    // Arrange
    const context = require('./context').newContext();
    // Act
    const game = context('lucky21')(context);
    // Assert
    expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
    // Arrange
    const context = require('./context').newContext();
    // Act
    const game = context('lucky21')(context);
    // Assert
    expect(game.state.cards.length).toEqual(2);
});

test('isGameOver should return "false" on a new game', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);
    // Act
    const check = game.isGameOver(game);
    // Assert
    expect(check).toEqual(false);
});

test('isGameOver should return "false" if the cards value under 21'+
  ' after the "21 or under" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);

    // Act
    const check = game.isGameOver(game);

    // Assert
    expect(check).toEqual(false);
});

test('isGameOver should return "true" if the cards value over 21'+
  ' after the "21 or under" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);
    game.guess21OrUnder(game);

    // Act
    const check = game.isGameOver(game);

    // Assert
    expect(check).toEqual(true);
});

test('isGameOver should return "true" if the cards value under 21'+
  ' after the "over 21" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guessOver21(game);

    // Act
    const check = game.isGameOver(game);

    // Assert
    expect(check).toEqual(true);
});

test('isGameOver should return "true" if the cards value exactly 21'+
  ' after the "over 21" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '02D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guessOver21(game);

    // Act
    const check = game.isGameOver(game);

    // Assert
    expect(check).toEqual(true);
});

test('playerWon should return "false" on a new game', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    // Act
    const check = game.playerWon(game);
    // Assert
    expect(check).toEqual(false);
});

test('playerWon should return "true" if the cards value exactly 21'+
  ' after the "21 or under" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '02D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);

    // Act
    const check = game.playerWon(game);

    // Assert
    expect(check).toEqual(true);
});

test('playerWon should return "false" if the cards value under 21'+
  ' after the "21 or under" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);

    // Act
    const check = game.playerWon(game);

    // Assert
    expect(check).toEqual(false);
});

test('playerWon should return "true" if the cards value over 21'+
  ' after the "over 21" action', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);
    game.guessOver21(game);

    // Act
    const check = game.playerWon(game);

    // Assert
    expect(check).toEqual(true);
});

test('getCardsValue should return the value '+
  'of the first two cards on a new game', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    // Act
    const check = game.getCardsValue(game);

    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(check).toEqual(19);
});

test('getCardValue should return "undefined" on a new game', () => {
    // Arrange
    const context = require('./context').newContext();
    const game = context('lucky21')(context);

    // Act
    const check = game.getCardValue(game);

    // Assert
    expect(check).toEqual(undefined);
});

test('getCardValue after guessOver21 should return a value', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);
    game.guessOver21(game);

    // Act
    const check = game.getCardValue(game);

    // Assert
    expect(check).toEqual(5);
});

test('getTotal should return only the value'+
  ' of the first two cards on a new game', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    // Act
    const check = game.getTotal(game);

    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(check).toEqual(19);
});

test('getTotal after guessOver21 should return value of all cards', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);
    game.guessOver21(game);

    // Act
    const check = game.getTotal(game);

    // Assert
    expect(check).toEqual(25);
});

test('getCards should return an array'+
  ' with the first two cards on a new game', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    // Act
    const check = game.getCards(game);

    // Assert
    expect(check.length).toEqual(2);
    expect(check[0]).toEqual('10H');
    expect(check[1]).toEqual('09S');
});

test('getCard should return "undefined" on a new game', () => {
    // Arrange
    const context = require('./context').newContext();
    const game = context('lucky21')(context);

    // Act
    const check = game.getCard(game);

    // Assert
    expect(check).toEqual(undefined);
});

test('getCard after guessOver21 should return a card', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);
    game.guessOver21(game);

    // Act
    const check = game.getCard(game);

    // Assert
    expect(check).toEqual('05C');
});

test('guess21OrUnder should draw the next card', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
});

test('guessOver21 should draw the final card', () => {
    // Arrange
    const context = require('./context').newContext();

    deck = [
        '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor(context);

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    const dependencies = {
        'deck': () => deck,
        'dealer': () => dealer,
    };

    // Inject our dependencies
    const game = context('lucky21')((name) => dependencies[name]);

    game.guess21OrUnder(game);

    // Act
    game.guessOver21(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.card).toEqual('05C');
});