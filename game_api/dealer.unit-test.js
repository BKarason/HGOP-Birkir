function newRandom(randomReturnValues) {
    let i = 0;
    return {
        randomInt: (min, max) => {
            return randomReturnValues[i++];
        }
    };
}

test('dealer should shuffle cards', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});

test('overridden shuffle should not shuffle cards', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['a', 'b', 'c']);
});

test('draw should return the expected card', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = ['a', 'b', 'c'];

    dealer.shuffle(deck);

    // Act
    let card = dealer.draw(deck);

    // Assert
    expect(card).toEqual('a');
});

test('draw should return no card after deck is finished', () => {
    // Arrange
    let dependencies = {
        'random': () => newRandom([2, 1]),
    };
    let newDealer = require('./dealer.js');
    let dealer = newDealer((name) => {
        return dependencies[name];
    });
    let deck = [];

    // Act
    let card = dealer.draw(deck);

    // Assert
    expect(card).toEqual(undefined);
});