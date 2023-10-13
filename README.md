# :ramen: Project Foodle

## Coursework for Front End Development @ HTW Berlin

- **Name**: Louis Beul
- **Matrikelnr.**: 588411
- **App Name**: Foodle
- **Items**: Restaurants (`{title, lat, lon, street, zipCode, likeCount, imageSrc, description}`)
- **Backend Option**: Self-built Express/TypeScript/MongoDB Backend

> **Foodle** is a place to save all the hidden street food gems in Berlin.
> It's a simple React app connected to an Express backend which persists data to a mongoDB atlas instance.

## :iphone: Frontend

- React+Typescript, bundled with `vite`
- tba... :construction:

## :floppy_disk: Backend

- Typescript, Express, MongoDB
- Node 18 or newer is required (in order to perform server-side fetch)
- Copy the content of `backend/.env.example` into `backend/.env` and insert your username and password for the mongoDB atlas instance
- Backend acts as federated gateway and communicates with other APIs like _Nominativ_
