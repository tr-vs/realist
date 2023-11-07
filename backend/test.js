const fetch = require('node-fetch');

const getTopThings = async (code) => {
    const result = await fetch('https://api.spotify.com/v1/me/top/artists?limit=10', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${code}`,
        },
    })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    const y = data.items.map((x) => x.name)
                    console.log(y);
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.send(error);
        });
};

getTopThings("BQDP-e99NM6ZlghVC2VHNiDGZdJ4xiQvIBu5NFvM2NAvbH5SWkAcSVhypDi2WKXCHXJkUwOCpx5NsLML-ASjawteMk_jw9wzb-Teol5aZmYWP0YaKeaFiuKZLwXjGUbbKsylSqIjzd4GwvcTVdQ8QArLOXUt_HfzxviHtHAXfry5Xn3Phn6TXaruKiO-c-5fyU7BKAnmWQIzTY-isg")