'use strict'

let gElCanvas
let gCtx
let gLines
let gAlignPos
let gheight
let gPickedColor = null
let gPickedAlign = null
let gPickedFont = null
let gPickedStrokeColor = null

let gCounterSticker = 0
const SPACE_COUNTER = 60
const BLACK_COLOR = '#000000'

settingMemes()

const arr = { 0: 50, 1: 250, 2: 350 }

function settingMemes() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    gCtx.font = '30px arial';

    gAlignPos = {
        leftPos: 0 + gElCanvas.width / 10,
        centerPos: gElCanvas.width / 2,
        rightPos: gElCanvas.width - gElCanvas.width / 10
    }
    gheight = {
        0: 0 + gElCanvas.height / 10,
        1: gElCanvas.height / 2,
        2: gElCanvas.height - gElCanvas.height / 10
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
    }
}

function linesOnCanvas(lines, currMeme) {
    let alignPos
    switch (lines.length) {
        case 0:
            break;
        case 1:
            alignPos = getColorFontAndAlign(currMeme, 0)
            gCtx.fillText(lines[0], alignPos, arr[0])
            gCtx.strokeText(lines[0], alignPos, arr[0])
            break;

        case 2:
            alignPos = getColorFontAndAlign(currMeme, 0)
            gCtx.fillText(lines[0], alignPos, arr[0])
            gCtx.strokeText(lines[0], alignPos, arr[0])

            alignPos = getColorFontAndAlign(currMeme, 1)
            gCtx.fillText(lines[1], alignPos, arr[2])

            gCtx.strokeText(lines[1], alignPos, arr[2])

            break;
        default:

            alignPos = getColorFontAndAlign(currMeme, 0)
            gCtx.fillText(lines[0], alignPos, arr[0])
            gCtx.strokeText(lines[0], alignPos, arr[0])


            alignPos = getColorFontAndAlign(currMeme, lines.length - 1)
            gCtx.fillText(lines[1], alignPos, arr[2])
            gCtx.strokeText(lines[1], alignPos, arr[2])

            for (var i = 0; i < lines.length; i++) {
                if (i === 0 || i === 1) continue
                alignPos = getColorFontAndAlign(currMeme, i)
                gCtx.fillText(lines[i], alignPos, arr[1])
                gCtx.strokeText(lines[i], alignPos, arr[1]);
            }
    }
}


function getColorFontAndAlign(currMeme, index) {

    const sizeTxt = currMeme.lines[index].size
    const align = currMeme.lines[index].align
    const color = currMeme.lines[index].color
    const strokeColor = currMeme.lines[index].strokeColor

    gCtx.font = `${sizeTxt}px serif`
    gCtx.fillStyle = `${color}`
    gCtx.textAlign = `${align}`
    gCtx.strokeStyle = `${strokeColor}`


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
    const symbol = value.innerText.includes('+')

    const arr = gCtx.font.split('px')
    let fontSize = symbol ? +arr[0] + 5 : +arr[0] - 5

    if (fontSize >= 70 || fontSize <= 10) return

    if (checkChoosingFontBeforeOpeningLineData(fontSize)) return

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
    const color = elInputColor.value;
    if (checkChoosingColorBeforeOpeningLineData(elInputLine, color)) return

    updateColor(color)

    gCtx.fillStyle = color
    renderMeme()
}, false);


function showAndHiddenInputColorFont() {
    const elPaint = document.querySelector('.paint-icon')
    elPaint.classList.add('.shown')

    const elInput = document.querySelector('.hidden-icon')
    elInput.classList.remove('.hidden-icon-color')
}

function showAndHiddenInputStrokeFont() {
    const elStroke = document.querySelector('.stroke-icon')
    elStroke.classList.add('.shown')

    const elInput = document.querySelector('.hidden-icon')
    elInput.classList.remove('hidden-icon-storoke')
}

function checkChoosingColorBeforeOpeningLineData(elInput, color) {
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') {
        gPickedColor = color
        return true
    }
    return false
}

// STORKE COLOR

//Change stroke-color of text 
var elInputStrokeColor = document.querySelector('.strokeColorInput')
elInputStrokeColor.addEventListener('input', function () {
    const elInputLine = document.querySelector('.input-line')
    const color = elInputStrokeColor.value;
    if (checkChoosingStrokeColorBeforeOpeningLineData(elInputLine, color)) return

    updateStrokeColor(color)

    gCtx.strokeStyle = color

    renderMeme()
}, false);

function checkChoosingStrokeColorBeforeOpeningLineData(elInput, strokeColor) {
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') {
        gPickedStrokeColor = strokeColor
        return true
    }
    return false
}


function onTextInput(text) {

    let pickedColor = gPickedColor ? gPickedColor : 'black'
    let pickedAlign = gPickedAlign ? gPickedAlign : 'left'
    let pickedFont = gPickedFont ? gPickedFont : 35
    let pickedStrokeColor = gPickedStrokeColor ? gPickedStrokeColor : 'black'

    setLineTxt(text.value, pickedColor, pickedAlign, pickedFont, pickedStrokeColor)
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
    gPickedFont = null
    gPickedStrokeColor = null
    const elInput = document.querySelector('.input-line')
    if (elInput.value === '' && elInput.getAttribute('placeholder') === 'Text line') return
    elInput.value = ''


    const elColorInput = document.querySelector('.colorInput')
    elColorInput.value = BLACK_COLOR

    const elColorStrokeInput = document.querySelector('.strokeColorInput')
    elColorStrokeInput.value = BLACK_COLOR

    updateNewTxtLine()
}

function onDeleteLine() {
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

    const align = 'center'
    if (checkChoosingAlignBeforeOpeningLineData(align)) return

    setAlignCenter()
    renderMeme()
}
function onAlignRight() {

    const align = 'right'
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

function onDownLoadImg(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}


function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

// CallBack func will run on success load of the img
function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    // After we read the file
    reader.onload = (event) => {
        let img = new Image() // Create a new html img element
        img.src = event.target.result // Set the img src to the img file we read
        // Run the callBack func, To render the img on the canvas
        img.onload = () => onImageReady(img)
    }

    reader.readAsDataURL(ev.target.files[0]) // Read the file we picked
}

function renderImg(img) {
    // Draw the img on the canvas
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

// Advance Features

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

/* Stickers */

function addIcon(data) {
    const currMeme = getMeme()
    if (!currMeme.lines.length) {
        const elImage = new Image()
        elImage.src = data.src
        elImage.onload = () => {
            gCtx.drawImage(elImage, 10, 10, 50, 50)
        }
    } else {
        const index = currMeme.selectedLineIdx
        const elImage = new Image()
        elImage.src = data.src
        const widthTxt = gCtx.measureText(gMeme.
            lines[index].txt).width
        elImage.onload = () => {
            gCtx.drawImage(elImage, widthTxt + 60, 10, 50, 50)
        }
    }
}
