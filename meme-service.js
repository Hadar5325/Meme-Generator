'use strict'

let gMeme

_createMeme()

function _createMeme() {
    gMeme = {
        selectedImgId: 2,
        selectedLineIdx: 0,
        isCreatedLine: false,
        lines: [
            // {
            // txt: '',
            // size: 0,
            // align: 'left',
            // color: 'black',
            // pos: {
            //     xStart: gLines[0].xStartLine1,
            //     xEnd: 0,
            //     yStart: gLines[0].yStartLine1,
            //     yEnd: 0
            // }
            // },
            // {
            //     txt: 'Line2',
            //     size: 20,
            //     align: 'left',
            //     color: 'green',
            //     pos: {
            //         xStart: gLines[1].xStartLine1,
            //         xEnd: 0,
            //         yStart: gLines[1].yStartLine1,
            //         yEnd: 0
            //     }
            // },
            // {
            //     txt: 'Line3',
            //     size: 10,
            //     align: 'center',
            //     color: 'green'

            // },
            //    {
            //     txt: 'Line4',
            //     size: 20,
            //     align: 'right',
            //     color: 'orange'
            // }, 
            // // {
            // //     txt: 'Line 5',
            // //     size: 20,
            // //     aligh: 'left',
            // //     color: 'red'
            // // }
        ]
    }
}

function getMeme() {
    return gMeme
}

function setLineTxt(text, pickedColor, pickedAlign, pickedFont, pickedStrokeColor) {
    const index = gMeme.selectedLineIdx
    console.log(index, "index in set line txt")
    gMeme.isCreatedLine ? updateTxt(index, text) : createAnewLine(index, text, pickedColor, pickedAlign, pickedFont ,pickedStrokeColor)
    console.log('end of set line txt')
}

function updateTxt(index, text) {
    gMeme.lines[index].txt = text
}


function createAnewLine(index, text, pickedColor, pickedAlign, pickedFont,pickedStrokeColor) {
    gMeme.isCreatedLine = true
    console.log('inside')
    // create a place to put new data
    gMeme.lines.splice(index, 0, {});
    console.log(gMeme)

    gMeme.lines[index].txt = text
    gMeme.lines[index].size = pickedFont
    gMeme.lines[index].align = pickedAlign
    gMeme.lines[index].color = pickedColor
    gMeme.lines[index].strokeColor = pickedStrokeColor

    console.log(gMeme)
}



function setImg(idImg) {
    gMeme.selectedImgId = idImg
}
function setLine(numLine) {
    gMeme.selectedLineIdx = numLine
}

function setPosLines(height, width, lineIdx) {
    gMeme.lines[0].pos.yEnd = height
    gMeme.lines[1].pos.xEnd = width
}

function setSelectedLineIdx(newIndex) {
    console.log(newIndex)
    gMeme.selectedLineIdx = newIndex
    console.log(gMeme)
}


function setPosOfNewLine(fontCol, fontSize, fontAlign, indexLine) {

    gMeme.selectedLineIdx = indexLine
    gMeme.lines[indexLine].size = fontSize
    gMeme.lines[indexLine].color = fontCol
    gMeme.lines[indexLine].align = fontAlign
    console.log(gMeme)
}

function deleteLine() {
    gMeme.lines.pop()

    if(gMeme.selectedLineIdx) gMeme.selectedLineIdx--
    gMeme.isCreatedLine = false

}

function updateNewTxtLine(){
    gMeme.selectedLineIdx++
    gMeme.isCreatedLine = false
}

function updateSizeFont(newFont){
    if(!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].size = newFont
}

function updateColor(newColor){
    if(!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].color = newColor
}
function updateStrokeColor(newColor){
    if(!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = newColor
    console.log(gMeme)
}


function setAlignLeft(){
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
}
function setAlignCenter(){
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    console.log(gMeme)

}
function setAlignRight(){
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'

}