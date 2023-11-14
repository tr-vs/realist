const {
    refreshToken,
    getTop,
    getNowPlaying,
    getUserProfilePic,
    getRecentlyPlayed,
    getTrackImage,
} = require('./spotify');

// For testing
const TOKEN =
    'BQCosd8vuV65dbOi-FKW9YsOd3EA-VGU-RzPkoeBTh79mpTvu_giXy0rYr4v6f7Tkr86C1TXGTOYA9_5L2nVoHpsz2ynswrrO2MrahkY9Q6RrAg_mC0Mka72hn7pX-zNX8HohoDi08YpvRn7d1s1e5cmYqUfxQU-o0Cjn2OcmiFBKD4f8vIl48rvLzdrXvWxsOHz99QCiOr5DJwU3w';
const REFRESH =
    'AQD8Zq9XVKjFpa58CNQYzq1-oVa_gCqN2d-n6eK5c89Zv501DQczUXPP5aK-PEdqrIJSmDzwtl7MfScC1wdD-LfBdBAuKXFfVdR1WgcQrZ88SVheDVVsnEkSIzw1J0FIi7w';

const TOKEN2 =
    'BQAvcP6gsrjCEhkxyPnp6IGuSRAkcwTbXeOnX6Lgip6LPKZAEO9KIRv-S0Ajea1VjDC8cvc5vaSAXu1vssgcUELV13yoCBQlxLF1hXYiYvZ5cYsXeA4Dj5coGgMM1NjYb11aefHuXdE33LKc_9J1jNUJskioLMLhDs2mD0Lf6Czbo0pIWBCagOMhio13d8E-GIfS2Bn-bZwS2t3N6w';
const REFRESH2 =
    'AQCBFzltIzaj9aCX00EJr4GEj2Fxf7987oHnG-0YA0Jm6RKLlQQv-bDujJf4nr6bG4V9PvS7eJNQFkZPn_-2ZEagyaKdsxSWTsatljkQjYB5JZoIvFBN8MZh_hledRWgZQc';
//getTop(TOKEN, REFRESH, 'tracks', '10', 'long_term');
getNowPlaying(TOKEN, REFRESH);
// getRecentlyPlayed(
// TOKEN, REFRESH,
//     '1'
// );

// getNowPlaying(
//  TOKEN, REFRESH
// );

// getUserProfilePic(TOKEN, REFRESH);

// refreshToken(REFRESH);
