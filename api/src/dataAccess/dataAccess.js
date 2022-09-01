const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        return err;
    }
}

module.exports.getData = getData;