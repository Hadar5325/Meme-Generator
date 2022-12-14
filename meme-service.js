'use strict'

let gMeme
let gImgs

_createMeme()
_createImages()

function _createMeme(){
    gMeme = {
        selectedImgId : 5,
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
        id:5,
        url: 'meme-images-sqr/5.jpg',
        keywords: ['funny', 'cat']
    },]
}

function getMeme() {
    return gMeme
}
function getImage(){
    return gImgs
}

function findMemeImageById(idxImg){
    return gImgs.find(item => (idxImg === item.id));
}

function setLineTxt(txt){
    gMeme.txt = txt
}