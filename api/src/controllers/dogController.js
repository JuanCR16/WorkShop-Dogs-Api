const { getCache, setCache } = require('../cache/redisCache');
const { getListImagesByBreedAndSubBreed, getAllListBreed, getListImagesByBreed } = require('../dataAccess/dogDataAccess')
const { queryToLowerCase } = require('../common/commons');

const dogNames = require('dog-names');

const genderEnum = {
    MALE: 'male',
    FEMALE: 'female'
}

const findAllBreed = (req, res) => {

    const cacheKey = "dog-breeds";

    (async () => {
        let data = await getCache(cacheKey);
        if (data !== null) {
            return res.json(data);
        }

        data = await getAllListBreed();
        if (data !== null) {
            await setCache(cacheKey, data);
            return res.json(data);
        }
        return res.status(500);
    })();
};

const findByBreedAndSubBreed = (req, res) => {

    const { breed, subBreed, gender } = req.query;

    const cacheKey = subBreed ? `dog-${breed}-${subBreed}-images` : `dog-${breed}-images`;
    let responseData = null;
    let dogName = '';

    (async () => {

        try {
            let data = await getCache(cacheKey);

            if (!breed) {
                return res.status(500);
            }

            if (data == null) {
                //return res.json(data);

                if (subBreed) {
                    data = await getListImagesByBreedAndSubBreed(breed, subBreed);
                } else {
                    data = await getListImagesByBreed(breed, subBreed);
                }

                await setCache(cacheKey, data);
            }

            if (gender === genderEnum.MALE) {
                dogName = dogNames.maleRandom()
            } else if (gender === genderEnum.FEMALE) {
                dogName = dogNames.femaleRandom()
            } else {
                dogName = dogNames.allRandom()
            }

            responseData = {
                breed: breed,
                subBreed: subBreed,
                image: getRandomImage(data.message),
                dogName: dogName
            }

            return res.json(responseData);
        } catch (err) {
            return res.status(500);
        }

    })();
};

const getRandomImage = (imageArray) => {
    return imageArray[(Math.random() * imageArray.length) | 0]
}

module.exports = {
    findAllBreed,
    findByBreedAndSubBreed
}