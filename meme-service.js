'use strict'

let gMeme
let gImgs

_createMeme()
_createImages()

function _createMeme(){
    gMeme = {
        selectedImgId : 2,
        selectedLineIdx : 0, 
        lines : [
            {
                txt : 'I sometimes eat Falafel',
                size : 20,
                aligh: 'left',
                color: 'red'
            }
        ]
    }
} 

function _createImages(){
    gImgs = [{
        id:1,
        url: 'meme-images-sqr/1.jpg',
        keywords: ['funny', 'cat']
    },{
        id:2,
        url: 'meme-images-sqr/2.jpg',
        keywords: ['funny', 'cat']
    },]
}

function getMeme() {
    return gMeme
}
function getImage(){
    return gImgs
}

function setLineTxt(text){
    gMeme.lines[0].txt = text
}
function setImg(idImg){
    gMeme.selectedImgId = idImg
}

function getImgById(idImg){
    let reqImage =  gImgs.find(item => idImg === item.id)
    return reqImage.url
}