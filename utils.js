'use strict'

function getRandIntInclu(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function getRandText() {
    var optionalWords = ['beutiful', 'you', 'nice', 'are', 'wow',
        'lovely', 'car', 'window', 'smile', 'happy',
        'marker', 'clock', 'table', 'image', 'Trump']


    var numOfWordsInLine = getRandIntInclu(0, optionalWords.length - 1)
    var result = '';

    for (var i = 0; i < numOfWordsInLine; i++) {
        var randNum = getRandIntInclu(0, optionalWords.length)
        result += optionalWords[randNum] + ' '
    }
    return result;
}

function getRandColor() {
    const randColor = Math.floor(Math.random() * 16777215).toString(16);
    const color = "#" + randColor;
    return color
}
