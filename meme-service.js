'use strict'

let gMeme

_createMeme()

function _createMeme() {
    gMeme = {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'line1',
                size: 20,
                aligh: 'left',
                color: 'red',
                pos: {
                    xStart: gLines[0].xStartLine1,
                    xEnd: 0,
                    yStart: gLines[0].yStartLine1,
                    yEnd: 0
                }
            },
            {
                txt: 'Line2',
                size: 20,
                aligh: 'left',
                color: 'red',
                pos: {
                    xStart: gLines[1].xStartLine1,
                    xEnd: 0,
                    yStart: gLines[1].yStartLine1,
                    yEnd: 0
                }
            },
            {
                txt: 'Line3',
                size: 20,
                aligh: 'left',
                color: 'red'
            
            },
               {
                txt: 'Line4',
                size: 20,
                aligh: 'left',
                color: 'red'
            }, 
            // {
            //     txt: 'Line 5',
            //     size: 20,
            //     aligh: 'left',
            //     color: 'red'
            // }
        ]
    }
}

function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    console.log(gMeme.selectedLineIdx)
    gMeme.lines[gMeme.selectedLineIdx].txt = text
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
