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

function setLineTxt(text) {
    const index = gMeme.selectedLineIdx
    console.log(index, "index in set line txt")
    gMeme.isCreatedLine ? updateTxt(index, text) : createAnewLine(index, text)
    console.log('end of set line txt')
}

function updateTxt(index, text) {
    gMeme.lines[index].txt = text
}


function createAnewLine(index, text) {
    gMeme.isCreatedLine = true
    console.log('inside')
    // create a place to put new data
    gMeme.lines.splice(index, 0, {});
    console.log(gMeme)

    gMeme.lines[index].txt = text
    gMeme.lines[index].size = 30
    gMeme.lines[index].align = 'left'
    gMeme.lines[index].color = 'black'

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