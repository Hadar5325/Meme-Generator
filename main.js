'use strict'

function onInit(){
    renderGallery()
    renderMeme()
}

function galleryIsChosen(){
    const elImage = document.querySelector('.containter-image')
    if(elImage.classList.contains('shown'))return
    toggle()
}
