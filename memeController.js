'use strict'

let gElCanvas
let gCtx

_setting()

function _setting() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    gCtx.font = '30px serif';
}

function renderMeme() {

    const currMeme = getMeme()
    const idMeme = currMeme.selectedImgId

    // const txtMeme = currMeme.lines[0].txt
    // const txtMeme2 = currMeme.lines[1].txt
    console.log(currMeme.lines)
    const linesToShow = currMeme.lines.map(lineObj => lineObj.txt)
    console.log(linesToShow)

    const urlMeme = getImgById(idMeme)
    renderImageOnCanvas(urlMeme, linesToShow)
}

function renderImageOnCanvas(urlMeme, linesToShow) {
    const elImage = new Image()
    elImage.src = urlMeme

    elImage.onload = () => {
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)
        lineOfTextOnCanvas(linesToShow)
    }
}

function lineOfTextOnCanvas(linesToShow) {
    if (linesToShow.length > 2) {

        let newLines = linesToShow.slice()
        const twoFirstLines = newLines.splice(0, 2)
        linesMoreThan2(newLines)
        linesToShow = twoFirstLines
    }
    switch (linesToShow.length) {
        case 1:
            gCtx.fillText(linesToShow[0], 10, 50);
            break;
        case 2:
            gCtx.fillText(linesToShow[0], 10, 50);
            gCtx.fillText(linesToShow[1], 10, 350);
            break;
    }
}
function linesMoreThan2(linesToShow) {
    let counter = 0
    for (let i = 0; i < linesToShow.length; i++) {
        gCtx.fillText(linesToShow[i], 10, 200 + counter);
        counter += 25
    }
}

function onTextInput(text) {
    setLineTxt(text.value)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}


function clearCanvas() {
    gCtx.beginPath()
    gCtx.save()
}

// Buttons increse font + decrease font
function onIncreaseFont() {
    const arr = gCtx.font.split('px')
    // the number in the arr
    let numOfFont = +arr[0] + 5
    if (numOfFont > 70) return
    gCtx.font = `${numOfFont}px serif`;
}

function onChangeFont(value) {
    const symbol = value.innerText
    const arr = gCtx.font.split('px')
    let numOfFont = symbol === '+' ? +arr[0] + 5 : +arr[0] - 5
    console.log(numOfFont)
    if (numOfFont >= 70 || numOfFont <= 10) return
    gCtx.font = `${numOfFont}px serif`;
}

//Change color of text 
var elInput = document.querySelector('.colorInput')
elInput.addEventListener('input', function () {
    const color = elInput.value;
    gCtx.fillStyle = color
}, false);


// Switch lines 
function onSwitchLines() {

}




// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_canvas_textalign




// var maxWidth = cnv1.width - 10;
// var lineHeight = 23;
// var x_pos = (cnv1.width - maxWidth) / 2;
// var y_pos = 15;

// function drawImageOnCanvas() {
//     const elImage = new Image()

//     const meme = getMeme()
//     const idxImg = meme.selectedImgId
//     const memeImage = getImgById(idxImg)
//     console.log(memeImage)
//     elImage.src = memeImage.url

//     elImage.onload = () => {
//         gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)
//         // drawLineOfText()
//         const elInputLine = document.querySelector('.inputLine')
//         elInputLine.onkeyup = function(){
//             clearCanvas(gCtx)
//             // addTextToCanvas(this.value, 50, 50, 400, 23)
//             var maxWidth = 120;
//             var x_pos = 50;
//             var y_pos = 50;
//             var lineHeight = 23;

//             addLineToCanvas(this.value, x_pos , y_pos, maxWidth, lineHeight)
//             setLineTxt(meme , this.value)
//         }
//     }
// }

// // fix that!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// function addLineToCanvas(text, x, y, maxWidth, lineHeight) {
//     let words = text.split(' ')
//     console.log(words)
//     let line = ''
//     const space = ' '

//     console.log(gCtx.measureText(words).width)
//     if (gCtx.measureText(words).width > 120) {
//         console.log(y)
//         line = '\n'
//         y += '\n' + lineHeight
//         console.log(y)
//     }
//     for (var i = 0; i < words.length; i++) {
//         const textLine = words[i]
//         //Check the width of the text, before writing it on the canvas:
//         if (gCtx.measureText(textLine).width > 120) {
//             console.log('yes!!!!!!!!!!!!!!!!!!!!')
//             line = '\n' + words[i]
//             console.log(line, "line")
//             console.log(words[i], "words[i]")
//             y += lineHeight
//             console.log(y, "y")
//         } else line += space + words[i]
//     }
//     gCtx.fillStyle = 'pink'
//     gCtx.font = 'bold 17px arial'
//     gCtx.fillText(line, x, y)
// }
