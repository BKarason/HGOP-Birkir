const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  // Arrange, Act
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  // Assert
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  // Arrange, Act
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  // Assert
  expect(game.state.cards.length).toEqual(2);
});

test('isGameOver should return "false" on a new game', () => {
  // Arrange
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  // Act
  const check = game.isGameOver(game);
  // Assert
  expect(check).toEqual(false);
});

test('isGameOver should return "false" if the cards value under 21'+
  ' after the "21 or under" action', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  game.guess21OrUnder(game);

  // Act
  const check = game.isGameOver(game);

  // Assert
  expect(check).toEqual(false);
});

test('isGameOver should return "true" if the cards value over 21'+
  ' after the "21 or under" action', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

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
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  game.guessOver21(game);

  // Act
  const check = game.isGameOver(game);

  // Assert
  expect(check).toEqual(true);
});

test('isGameOver should return "true" if the cards value exactly 21'+
  ' after the "over 21" action', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '02D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  game.guessOver21(game);

  // Act
  const check = game.isGameOver(game);

  // Assert
  expect(check).toEqual(true);
});

test('playerWon should return "false" on a new game', () => {
  // Arrange
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);
  // Act
  const check = game.playerWon(game);
  // Assert
  expect(check).toEqual(false);
});

test('playerWon should return "true" if the cards value exactly 21'+
  ' after the "21 or under" action', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '02D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  game.guess21OrUnder(game);

  // Act
  const check = game.playerWon(game);

  // Assert
  expect(check).toEqual(true);
});

test('playerWon should return "false" if the cards value under 21'+
  ' after the "21 or under" action', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  game.guess21OrUnder(game);

  // Act
  const check = game.playerWon(game);

  // Assert
  expect(check).toEqual(false);
});

test('playerWon should return "true" if the cards value over 21'+
  ' after the "over 21" action', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

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
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  // Act
  const check = game.getCardsValue(game);

  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(check).toEqual(19);
});

test('getCardValue should return "undefined" on a new game', () => {
  // Arrange
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);

  // Act
  const check = game.getCardValue(game);

  // Assert
  expect(check).toEqual(undefined);
});

test('getCardValue after guessOver21 should return a value', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

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
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  // Act
  const check = game.getTotal(game);

  // Assert
  expect(game.state.cards.length).toEqual(2);
  expect(check).toEqual(19);
});

test('getTotal after guessOver21 should return value of all cards', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

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
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  // Act
  const check = game.getCards(game);

  // Assert
  expect(check.length).toEqual(2);
  expect(check[0]).toEqual('10H');
  expect(check[1]).toEqual('09S');
});

test('getCard should return "undefined" on a new game', () => {
  // Arrange
  const deck = deckConstructor();
  const dealer = dealerConstructor();
  const game = lucky21Constructor(deck, dealer);

  // Act
  const check = game.getCard(game);

  // Assert
  expect(check).toEqual(undefined);
});

test('getCard after guessOver21 should return a card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  const game = lucky21Constructor(deck, dealer);

  game.guess21OrUnder(game);
  game.guessOver21(game);

  // Act
  const check = game.getCard(game);

  // Assert
  expect(check).toEqual('05C');
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  const game = lucky21Constructor(deck, dealer);

  // Act
  game.guess21OrUnder(game);

  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('guessOver21 should draw the final card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];
  const dealer = dealerConstructor();

  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};

  // Inject our dependencies
  const game = lucky21Constructor(deck, dealer);

  game.guess21OrUnder(game);

  // Act
  game.guessOver21(game);

  // Assert
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.card).toEqual('05C');
});
