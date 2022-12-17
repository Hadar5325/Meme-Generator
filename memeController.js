'use strict'

let gElCanvas
let gCtx
let gLines
let gAlignPos
let gheight
let gPickedColor = null
let gPickedAlign = null
let gPickedFont = null
const BLACK_COLOR = '#000000'

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
const arr = { 0: 50, 1: 150, 2: 350 }

function settingMemes() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    gCtx.font = '30px serif';

    gAlignPos = {
        leftPos: 0 + gElCanvas.width / 10,
        centerPos: gElCanvas.width / 2,
        rightPos: gElCanvas.width - gElCanvas.width / 10
    }
    gheight = {
        topLine: 0 + gElCanvas.height / 10,
        middleLines: gElCanvas.height / 2,
        bottomLine: gElCanvas.height - gElCanvas.height / 10
    }
}

function renderMeme() {

    const currMeme = getMeme()
    const idMeme = currMeme.selectedImgId
    const urlMeme = getImgById(idMeme)

    const linesToShow = currMeme.lines.map(lineObj => lineObj.txt)
    renderImageOnCanvas(urlMeme, linesToShow, currMeme)
}


function renderImageOnCanvas(urlMeme, linesToShow, currMeme) {

    const elImage = new Image()
    elImage.src = urlMeme

    elImage.onload = () => {
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)
        linesOnCanvas(linesToShow, currMeme)

        // old
        // lineOfTextOnCanvas(linesToShow)
    }
}

function linesOnCanvas(lines, currMeme) {
    let alignPos
    switch (lines.length) {
        case 0:
            console.log('linesOnCanvas -memecontroller 0')
            break;
        case 1:
            console.log('linesOnCanvas -memecontroller 1 ')
            alignPos = getColorFontAndAlign(currMeme, 0)
            gCtx.fillText(lines[0], alignPos, arr[0])
            break;

        case 2:
            console.log('linesOnCanvas -memecontroller 2 ')

            alignPos = getColorFontAndAlign(currMeme, 0)
            gCtx.fillText(lines[0], alignPos, arr[0])

            alignPos = getColorFontAndAlign(currMeme, 1)
            gCtx.fillText(lines[1], alignPos, arr[2])

            break;
        default:

            console.log('linesOnCanvas -memecontroller defualt ')

            alignPos = getColorFontAndAlign(currMeme, 0)
            gCtx.fillText(lines[0], alignPos, arr[0])

            alignPos = getColorFontAndAlign(currMeme, lines.length - 1)
            gCtx.fillText(lines[lines.length - 1], alignPos, arr[2])

            for (var i = 0; i < lines.length; i++) {
                if (i === 0 || i === lines.length - 1) continue
                alignPos = getColorFontAndAlign(currMeme, i)
                gCtx.fillText(lines[i], alignPos, arr[1])
            }
    }
}


function getColorFontAndAlign(currMeme, index) {

    const sizeTxt = currMeme.lines[index].size
    const align = currMeme.lines[index].align
    const color = currMeme.lines[index].color

    gCtx.font = `${sizeTxt}px serif`
    gCtx.fillStyle = `${color}`
    gCtx.textAlign = `${align}`

    const alignToShow = alignPos(align)
    return alignToShow
}

function alignPos(align) {
    switch (align) {
        case 'left':
            return gAlignPos.leftPos

        case 'center':
            return gAlignPos.centerPos

        case 'right':
            return gAlignPos.rightPos
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
    let fontSize = symbol === '+' ? +arr[0] + 5 : +arr[0] - 5

    console.log(fontSize)

    if (fontSize >= 70 || fontSize <= 10) return

    if (checkChoosingColorBeforeOpeningLineData(fontSize)) return

    updateSizeFont(fontSize)

    gCtx.font = `${fontSize}px serif`;
    renderMeme()
}

function checkChoosingFontBeforeOpeningLineData(font) {
    const elInput = document.querySelector('.input-line')
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') {
        gPickedFont = font
        return true
    }
    return false
}





//Change color of text 
var elInputColor = document.querySelector('.colorInput')
elInputColor.addEventListener('input', function () {
    const elInputLine = document.querySelector('.input-line')
    // console.log(elInputLine.value ===)
    const color = elInputColor.value;
    if (checkChoosingColorBeforeOpeningLineData(elInputLine, color)) return

    updateColor(color)

    gCtx.fillStyle = color
    renderMeme()
}, false);


function checkChoosingColorBeforeOpeningLineData(elInput, color) {
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') {
        gPickedColor = color
        return true
    }
    return false
}



function onTextInput(text) {
    console.log(gPickedColor)
    console.log(gPickedAlign)
    console.log(gPickedFont)
    let pickedColor = gPickedColor ? gPickedColor : 'black'
    let pickedAlign = gPickedAlign    ? gPickedAlign : 'left'
    let pickedFont = gPickedFont ? gPickedFont : 35
    console.log(pickedColor, pickedAlign)
    // console.log(gCtx.color)
    // if(gCtx.color !== 'black') console.log('diff black')
    console.log(text.value)
    setLineTxt(text.value, pickedColor, pickedAlign)
    renderMeme()
}


















// Start Switch ----------------------------------------------------------
/* Switch between lines **********/

function onSwitchLines() {
    const elInput = document.querySelector(".input-line")
    elInput.value = ''

    const currMeme = getMeme()
    const lenOfLines = currMeme.lines.length

    let idxNextLine = currMeme.selectedLineIdx + 1
    if (idxNextLine >= lenOfLines) idxNextLine = 0

    //update service
    setSelectedLineIdx(idxNextLine)

    // update dom
    switchLines(currMeme, lenOfLines, elInput)
}

// Switch up ********
function onMoveLineUp() {

    const elInput = document.querySelector(".input-line")
    elInput.value = ''

    const currMeme = getMeme()
    const lenOfLines = currMeme.lines.length

    let idxNextLine = currMeme.selectedLineIdx - 1
    if (idxNextLine < 0) idxNextLine = lenOfLines - 1

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

// Text options

function onAddTxtLine() {

    gPickedColor = null
    gPickedAlign = null

    const elInput = document.querySelector('.input-line')
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') return
    elInput.value = ''


    const elColorInput = document.querySelector('.colorInput')
    elColorInput.value = BLACK_COLOR

    console.log('before update')
    updateNewTxtLine()
}

function onDeleteLine() {
    console.log('inside delete')
    const elInput = document.querySelector(".input-line")
    elInput.value = ''

    const currMeme = getMeme()
    const currIndex = currMeme.selectedLineIdx

    deleteLine(currIndex)
    renderMeme()
}


/*Start Align Text */
function onAlignLeft() {

    const align = 'left'
    if (checkChoosingAlignBeforeOpeningLineData(align)) return

    setAlignLeft()
    renderMeme()
}
function onAlignCenter() {

    const align =  'center'
    if (checkChoosingAlignBeforeOpeningLineData(align)) return

    setAlignCenter()
    renderMeme()
}
function onAlignRight() {

    const align =  'right'
    if (checkChoosingAlignBeforeOpeningLineData(align)) return

    setAlignRight()
    renderMeme()
}

function checkChoosingAlignBeforeOpeningLineData(align) {
    const elInput = document.querySelector('.input-line')
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') {
        gPickedAlign = align
        return true
    }
    return false
}


/* End Align Text*/












// Advance Feathures

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
