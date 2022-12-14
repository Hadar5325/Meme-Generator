'use strict'

let gElCanvas
let gCtx

function renderMeme(ev) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    drawImageOnCanvas()
}


function drawImageOnCanvas() {
    const elImage = new Image()

    const meme = getMeme()
    const idxImg = meme.selectedImgId
    const memeImage = findMemeImageById(idxImg)
    elImage.src = memeImage.url

    elImage.onload = () => {
        gCtx.drawImage(elImage, 0, 0, gElCanvas.width, gElCanvas.height)
        // drawLineOfText()
        const elInputLine = document.querySelector('.inputLine')
        elInputLine.onkeyup = function(){
            clearCanvas(gCtx)
            // addTextToCanvas(this.value, 50, 50, 400, 23)
            var maxWidth = 120;
            var x_pos = 50;
            var y_pos = 50;
            var lineHeight = 23;
            
            addLineToCanvas(this.value, x_pos , y_pos, maxWidth, lineHeight)
            setLineTxt(meme , this.value)
        }
    }
}


function clearCanvas(){
    gCtx.beginPath()
    gCtx.save()
} 

// var maxWidth = cnv1.width - 10;
// var lineHeight = 23;
// var x_pos = (cnv1.width - maxWidth) / 2;
// var y_pos = 15;




 // fix that!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function addLineToCanvas(text, x, y, maxWidth , lineHeight){
    let words = text.split(' ')
    console.log(words)
    let line = ''
    const space = ' ' 

    console.log(gCtx.measureText(words).width)
    if(gCtx.measureText(words).width > 120) {
        console.log(y)
        line = '\n'
        y+='\n' + lineHeight
        console.log(y)
    }
    for(var i=0; i<words.length; i++){
        const textLine = words[i]
        //Check the width of the text, before writing it on the canvas:
        if(gCtx.measureText(textLine).width > 120){
            console.log('yes!!!!!!!!!!!!!!!!!!!!')
            line = '\n' + words[i]
            console.log(line, "line")
            console.log(words[i], "words[i]")
            y += lineHeight
            console.log(y, "y")
        }else line += space + words[i]
    }
    gCtx.fillStyle = 'pink'
    gCtx.font = 'bold 17px arial'
    gCtx.fillText(line, x, y)
}
