'use strict'

let gImgs
_createImages()


function _createImages() {
    gImgs = [{
        id: 1,
        url: 'meme-images-sqr/1.jpg',
        keywords: ['funny', 'cat']
    }, {
        id: 2,
        url: 'meme-images-sqr/2.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 3,
        url: 'meme-images-sqr/3.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 4,
        url: 'meme-images-sqr/4.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 5,
        url: 'meme-images-sqr/5.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 6,
        url: 'meme-images-sqr/6.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 7,
        url: 'meme-images-sqr/7.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 8,
        url: 'meme-images-sqr/8.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 9,
        url: 'meme-images-sqr/9.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 10,
        url: 'meme-images-sqr/10.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 11,
        url: 'meme-images-sqr/11.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 12,
        url: 'meme-images-sqr/12.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 13,
        url: 'meme-images-sqr/13.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 14,
        url: 'meme-images-sqr/14.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 15,
        url: 'meme-images-sqr/15.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 16,
        url: 'meme-images-sqr/16.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 17,
        url: 'meme-images-sqr/17.jpg',
        keywords: ['funny', 'cat']
    },
    {
        id: 18,
        url: 'meme-images-sqr/18.jpg',
        keywords: ['funny', 'cat']
    },

    ]
}

function getImage() {
    return gImgs
}

function getImgById(idImg) {
    let reqImage = gImgs.find(item => idImg === item.id)
    return reqImage.url
}