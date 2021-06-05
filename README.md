# spotify-graphql
GraphQL layer on top of Spotify REST api's
Refer spotify documentation: https://developer.spotify.com/documentation/web-api/reference/#reference-index
## Setup project locally
- Install node 
- clone the repo
- ```npm install```
- For dev server run ```npm run dev``` and for prod build run ```npm run build```

This repo contains queries and mutations for following api's
- [x] Artists API
- [x] User Profile API
- [x] Albums API
- [x] Tracks API
- [x] Search API
- [x] Personalization API
- [x] Browse API
- [x] Follow API

NOTE: 
- All requests needs Oauth token with proper scopes permission for each request to get resources like below in headers
  ```authorization: "Bearer <Oauth token>"```
- Feel free to contribute to repo.
