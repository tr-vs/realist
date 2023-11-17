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
const TOKEN3 =
    'BQBMc8MahguxLwJAwv-Safqg5l4cVvtpEBm9bWQ94ndpjc58ag9mYEoHKwot3Re-u7dXTqG9iQMWWeynzp5vtZqciQFv0oRGZipRjqLjFcH26W6xcXGjIFoLmCtoCc7WoUmog1oIfHbf2s8EsGMFG4Ty345dcucCN6nQkmfx-73FIEVzg5PmkSP5GFeoTO_xgDJABQE7zCnRU2E1ig';
const REFRESH3 =
    'AQD8N-NgVzfz70qc47yPeO2_yJdiGg98XtzTYIT2VLiG1Tb-HiXp-Df-oAt_p1aSTIaaQrC6eGN99QXuJZvghVx8HunOxz1o0L8Jo7lY3oAaF0v630dlqLNwMrqFLyTgJWI';
const TOKEN4 =
    'BQA8ETyujwUrZtii4c9PvR7CaTFrWaDYC_xPFbl2hRZHuKiQZNcrxFd-h9SHwgQjmXRauurqQS9i3k7X6cgeRFkHQTv3uruEEt1KmHii4V1Z0p99k9Rw9cWj0sSBjskFiGDlPOJ5_t0Cd_eToEpOTw-jhli_J4ZrsfDvI94NTQr8QM4Vt_PdgtzoyPDs-Q';
const REFRESH4 =
    'AQARJd6jfn-s5D1Ae-VY2DF-KA1xEUUcJ3pTYO9j62dfcPKszL5-5f_8Jdd3AbHrnbmlmLSmhRRKNSWxlidipbxPyrKBMI1fBqJ11dACwl_6nFkNPQZq4IhoJYMLeWaLn4I';
const TOKEN5 =
    'BQA-RXgYI1RIOtbWc38Ya1waR0V7xI8Qgqb00G1sIjDm-iWPHyTYOOd0KOU8uxnFb8gdRI1RdH2kfoVun5V0BNpKkU2T1wYHMidN5itHuOgQuAaR1SKur5c6470M6aNLXdDgTXsU3F2KnvD3dy-r4DkOq-KHj0H9Re_nF75BEupgse-ldvSkX6OfBXNhiw0_NbK-CpgcCvurtiLMTX9x0w';
const REFRESH5 =
    'AQAP4nXQaObulLkrHdmFBETu3pCz0Lwp07jvfNNr7RGEy0GiLO_FQFMKFb5ZELlD3gSgW1CHmcavmgvGi2Na_26PqOPQOdota3tsJYqw5lOIhByt0-BIvuF1sUstk97Pb04';
const TOKEN6 =
    'BQCAd4uHc6iyU1fBItoWTmJbhnyVy0qifljjG36_AdJD-fPLUkYvFy3K15pkgStVgNbIgqObeStPia4thq9DSPuPhoVMirdVf2ThU3xPwM0Spvs36OZQzI4Ir-YMZBW52W8d577Rm2BweF0jIYhEQP5SihJ1WQaxMftJI67cBsrL9V6j8FIZ5C7o8Vg5uAU-';
const REFRESH6 =
    'AQAZrUNRQSNECD79DMoNTy6ZXRPRWvl4EOQ1PEhLuqyC8H2PlUPT3RHGbrANOJDz0yggO-FF7HDkojADJg1r5KFiaGq69lYtxKKQmuNdfVMWzxVw2r935NYty3hWqjV4pwk';
//getTop(TOKEN, REFRESH, 'tracks', '10', 'long_term');
const asdf = async () => {
    const bruh = await getNowPlaying(TOKEN5, REFRESH5);
    console.log(bruh.is_playing);
    console.log(bruh);
};
asdf();
// getRecentlyPlayed(
// TOKEN, REFRESH,
//     '1'
// );

// getNowPlaying(
//  TOKEN, REFRESH
// );

// getUserProfilePic(TOKEN, REFRESH);

// refreshToken(REFRESH);
