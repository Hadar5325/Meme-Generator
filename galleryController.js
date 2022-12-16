'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.image-gallery')

    let txtHTML = ''
    gImgs.map(item => {
        txtHTML += `
        <img src="./meme-images-sqr/${item.id}.jpg" alt="image${item.id}" onclick="onImgSelect(${item.id})" class="image">
        `
    })
    elGallery.innerHTML = txtHTML
}

function onFlexible(){
    const randMeme = getRandomMeme()
}



function onImgSelect(idImg) {
    toggle()
    setImg(idImg)
    settingMemes()
    renderMeme()
}
function toggle() {
    // change from image-gallery view to meme-editor
    const elMemeCont = document.querySelector('.container-meme-editor')
    const elImageCont = document.querySelector('.containter-image')

    if (elImageCont.classList.contains('shown')) {

        elImageCont.classList.remove('shown')
        elImageCont.classList.add('hidden')

        elMemeCont.classList.remove('hidden')
        elMemeCont.classList.add('shown')
    } else {
        elImageCont.classList.remove('hidden')
        elImageCont.classList.add('shown')

        elMemeCont.classList.remove('shown')
        elMemeCont.classList.add('hidden')
    }
}