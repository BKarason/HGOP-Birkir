const deckConstructor = require('./deck.js');

test('deck should consist of 52 cards', () => {
    // Arrange, Act
    const deck = deckConstructor();

    // Assert
    expect(deck.length).toEqual(52);
});