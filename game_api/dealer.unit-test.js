function newRandom(randomReturnValues) {
    let i = 0;
    return {
        randomInt: (min, max) => {
            return randomReturnValues[i++];
        },
    };
}

test('dealer should shuffle cards', () => {
    // Arrange
    const dependencies = {
        'random': () => newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
        return dependencies[name];
    });
    const deck = ['a', 'b', 'c'];

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['c', 'b', 'a']);
});

test('overridden shuffle should not shuffle cards', () => {
    // Arrange
    const dependencies = {
        'random': () => newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
        return dependencies[name];
    });
    const deck = ['a', 'b', 'c'];

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Act
    dealer.shuffle(deck);

    // Assert
    expect(deck).toEqual(['a', 'b', 'c']);
});

test('draw should return the expected card', () => {
    // Arrange
    const dependencies = {
        'random': () => newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
        return dependencies[name];
    });
    const deck = ['a', 'b', 'c'];

    dealer.shuffle(deck);

    // Act
    const card = dealer.draw(deck);

    // Assert
    expect(card).toEqual('a');
});

test('draw should return no card after deck is finished', () => {
    // Arrange
    const dependencies = {
        'random': () => newRandom([2, 1]),
    };
    const newDealer = require('./dealer.js');
    const dealer = newDealer((name) => {
        return dependencies[name];
    });
    const deck = [];

    // Act
    const card = dealer.draw(deck);

    // Assert
    expect(card).toEqual(undefined);
});