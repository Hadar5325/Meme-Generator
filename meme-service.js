'use strict'

let gMeme

_createMeme()

function _createMeme() {
    gMeme = {
        selectedImgId: 2,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                aligh: 'left',
                color: 'red'
            },
            {
                txt: 'Line number 2',
                size: 20,
                aligh: 'left',
                color: 'red'
            },
            // {
            //     txt: 'Line 3',
            //     size: 20,
            //     aligh: 'left',
            //     color: 'red'
            // }, {
            //     txt: 'Line 4',
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
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}
function setImg(idImg) {
    gMeme.selectedImgId = idImg
}
function setLine(numLine){
    gMeme.selectedLineIdx = numLine 
}