'use strict'

function renderGallery(){
    const elGallery = document.querySelector('.gallery')
    console.log(elGallery)
    
    let txtHTML = ''
    gImgs.map(item =>{
        console.log(item)
        txtHTML += `
        <img src="./meme-images-sqr/${item.id}.jpg" alt="image${item.id}" class="image">
        `
    })
    elGallery.innerHTML = txtHTML
}