'use strict'

function renderGallery(){
    const elGallery = document.querySelector('.gallery')
    console.log(elGallery)
    
    let txtHTML = ''
    gImgs.map(item =>{
        txtHTML += `
        <img src="./meme-images-sqr/${item.id}.jpg" alt="image${item.id}" onclick="onImgSelect(${item.id})" class="image">
        `
    })
    elGallery.innerHTML = txtHTML
}

function onImgSelect(idxImg){
    setImg(idxImg)
    renderMeme()
}
