test('if random is called without parameters it should not return a number', () => {
    // Arrange
    const random = require('./random')();

    // Act
    const rand = random.randomInt();

    // Assert
    expect(rand).toEqual(NaN);
});

test('random should return a number that is greater or equal to the min value passed into it', () => {
    // Arrange
    const random = require('./random')();

    // Act
    const rand = random.randomInt(0, 10);

    // Assert
    expect(rand).toBeGreaterThanOrEqual(0);
});

test('random should return a number that is less or equal to the max value passed into it', () => {
    // Arrange
    const random = require('./random')();

    // Act
    const rand = random.randomInt(0, 10);

    // Assert
    expect(rand).toBeLessThanOrEqual(10);
});