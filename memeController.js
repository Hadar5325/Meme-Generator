'use strict'

let gElCanvas
let gCtx
let gLines

settingMemes()

gLines = [{
    xStartLine0: 10,
    yStartLine0: 50
}, {
    xStartLine1: 10,
    yStartLine1: 350
}, {
    xstartLineN: 10,
    xstartLineN: 200,
}
]

function settingMemes() {
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
    const linesToShow = currMeme.lines.map(lineObj => lineObj.txt)

    const urlMeme = getImgById(idMeme)
    renderImageOnCanvas(urlMeme, linesToShow)
}

function renderImageOnCanvas(urlMeme, linesToShow) {
    const elImage = new Image()
    elImage.src = urlMeme

    elImage.onload = () => {
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)
        // lineOfTextOnCanvas(linesToShow)
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
            gCtx.fillText(linesToShow[0], gLines[0].xStartLine0, gLines[0].yStartLine0);

            const mesureCase1 = gCtx.measureText(linesToShow[0]).width
            updateGmemeMesures(mesureCase1)
            console.log(gCtx.measureText(linesToShow))
            break;


        case 2:
            gCtx.fillText(linesToShow[0], gLines[0].xStartLine0, gLines[0].yStartLine0);
            gCtx.fillText(linesToShow[1], gLines[1].xStartLine1, gLines[1].yStartLine1);
            var mesureCase2 = gCtx.measureText(linesToShow[0])
            updateGmemeMesures(mesureCase2)

            // console.log(gCtx.measureText(linesToShow[1]))
            break;
    }
}

function calculateHeight(widthOfTxt) {
    const height = widthOfTxt.actualBoundingBoxDescent + widthOfTxt.actualBoundingBoxAscent
    return height
}

function updateGmemeMesures(mesure) {
    const height = calculateHeight(mesure)
    setPosLines(height, mesure.width)
}

function linesMoreThan2(linesToShow) {
    let counter = 0
    for (let i = 0; i < linesToShow.length; i++) {
        gCtx.fillText(linesToShow[i], 10, 200 + counter);
        counter += 25
    }
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


function getRandomMeme() {
    const randIdx = getRandIntInclu(0, gImgs.length)
    var randUrlImg = getRandImg(randIdx)

    const randNumLines = getRandIntInclu(1, 2)
    const randText = getRandText()

    const randTextSize = getRandIntInclu(10, 50)
    const randColor = getRandColor()

    const randStrokeColor = getRandColor()

    const widthOfSizeOnCanvas = gCtx.measureText(randText).width
    while (widthOfSizeOnCanvas > gCtx.offsetWidth) {
        const randText = getRandText()
    }
    console.log(a)
}

function onTextInput(text) {
    console.log(text)
    setLineTxt(text.value)
    renderMeme()
}

// Start Switch ----------------------------------------------------------
 /* Switch between lines **********/

function onSwitchLines() {
    const currMeme = getMeme()
    const lenOfLines = currMeme.lines.length
    const elInput = document.querySelector(".input-line")

    let idxNextLine = currMeme.selectedLineIdx + 1
    if (idxNextLine >= lenOfLines) idxNextLine = 0

    //update service
    setSelectedLineIdx(idxNextLine)
    
    // update dom
    switchLines(currMeme, lenOfLines, elInput)
}

// Switch up ********
function onMoveLineUp() {
    const currMeme = getMeme()
    const lenOfLines = currMeme.lines.length
    const elInput = document.querySelector(".input-line")

    let idxNextLine = currMeme.selectedLineIdx - 1
    if (idxNextLine < 0) idxNextLine = 2
    //update service
    setSelectedLineIdx(idxNextLine)

    // update dom
    switchLines(currMeme, lenOfLines, elInput)
}

/* Switch down */
function onMoveLineDown() {
    onSwitchLines()
}
// The switch itself
function switchLines(currMeme, lenOfLines, elInput) {
    if (lenOfLines <= 2) {
        switch (currMeme.selectedLineIdx) {
            case 0:
                gCtx.fillText(elInput.value, 30, arr[0])
                break
            case 1:
                gCtx.fillText(elInput.value, 30, arr[1])
                break
        }
    } else {
        switch (currMeme.selectedLineIdx) {
            case 0:
                gCtx.fillText(elInput.value, 30, arr[0])
                break
            case 1:
                gCtx.fillText(elInput.value, 30, arr[1])
                break
            default:
                gCtx.fillText(elInput.value, 30, arr[2])
                break
        }
    }
}

// End Switch ----------------------------------------------------------








// Switch lines
// function onSwitchLines(data) {
//     setLine(1)
//     const currMeme = getMeme()
//     // currMeme.lines.forEach(line => {
//     //     console.log(line.txt)
//     // });
//     currMeme.lines[1].txt = 'hi!'
//     renderMeme()
//     data.focus()
// }


















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
