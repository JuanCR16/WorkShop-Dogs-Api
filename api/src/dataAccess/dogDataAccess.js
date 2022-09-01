const { getData } = require('./dataAccess')


const baseURL = 'https://dog.ceo/api'

async function getAllListBreed() {
    const url = `${baseURL}/breeds/list/all`

    return getData(url)
}

async function getListImagesByBreed(breed) {
    const url = `${baseURL}/breed/${breed}/images`

    return getData(url)
}

async function getListImagesByBreedAndSubBreed(breed, subBreed) {
    const url = `${baseURL}/breed/${breed}/${subBreed}/images`

    return getData(url)
}

module.exports = {
    getListImagesByBreed,
    getListImagesByBreedAndSubBreed,
    getAllListBreed
}

