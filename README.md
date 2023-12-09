# Welcome to ReaList

### Before getting started:
ReaList requires a whitelisting Spotify acccount. Please email Travis Nguyen (travisnguyen@g.ucla.edu) or (support@realist.top) and provide him with the email associated to your Spotify account.
 
### Our Website:
https://realist.top/

## Development Setup (Run Locally)

### Cloning Repo

```
git clone https://github.com/tr-vs/realist
cd realist
```

### Backend Setup

Set up dependencies for the backend by running:

```
cd backend
npm install
```

#### .env File

Create an `.env` file in the backend directory with the contents as follows:

```
PORT=3000
MONGO_URI=mongodb+srv://travis:JMxgVeyOw00Wn8V9@cs35lproj.thwxz2g.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
SECRET=eCYnhZr.u!_L6qXvLXU@u*YZWFXJNMLqx7@TP4iw
SPOTIFY_CLIENT_ID=a8a847ca5ed14e64b16219206363ee5a
SPOTIFY_CLIENT_SECRET=61793825b72d4c0bbf03bd316a672486
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/spotify/call_back
PASSAGE_APP_ID=p3g1mBImLM5FUPBfnbeodby2
PASSAGE_API_KEY=7d8lLpm3Hf.3cf1DkjE3B3kocMbXmqwXdQYfUfE0jrWDbJtlKJ3aOOrOtVwecVoBPHMZ5LJh88y
FRONTEND=http://localhost:3001
SPOTIFY_ACCOUNT_ID=31vihtxadq4ycnc5ges7ha5tl36m
```

#### Run It!

```
cd backend
npm start
```

### Frontend Setup

Set up dependencies for the frontend by running:

```
cd frontend
npm install
```

#### .env File

Create an `.env` file in the frontend\rea-list directory with the contents as follows:

```
REACT_APP_BACKEND=http://localhost:3000/
REACT_APP_FRONTEND=http://localhost:3001/
REACT_APP_PASSAGE_APP_ID=p3g1mBImLM5FUPBfnbeodby2
```

#### Run it!

```
cd frontend
npm start
```

## Acknowledgements

## Contributors

-   [Kevin Espinas](https://github.com/kesdlvi)
-   [Teresa Lee](https://github.com/teresalee99)
-   [Jason Lozada](https://github.com/jasonlozada)
-   [Jacqueline Nguyen](https://github.com/itsjacque) <!--- update github link-->
-   [Travis Nguyen](https://github.com/tr-vs)

## Special thanks to our (unpaid) UI/UX interns

-   Jasi Bermejo
-   Mikey Choi
-   Lance Giang
-   Hyun Kim
-   Brianna Tran

## Tech Stack

The MERN stack (MongoDB, Express.js, React.js, Node.js) was used in order to create this project.

## Resources Used

- Spotify for Developers: https://developer.spotify.com/. 

- Color Thief React. NPM Registry. Available from: https://www.npmjs.com/package/color-thief-react. 

- Material-UI. Material-UI: The core components for React. Available from: https://mui.com/material-ui/

- 1Password. Available from: https://passage.1password.com/

- Net Ninja. MERN Stack Crash Course Tutorial. YouTube. Available from: https://youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&feature=shared

- BeReal. BeReal. Available from: https://bereal.com/en/. 

- Swiper. React - Swiper.js. Available from: https://swiperjs.com/react.
