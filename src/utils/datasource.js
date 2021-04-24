const { RESTDataSource } = require("apollo-datasource-rest");

export class SpotifyRestDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1/";
  }

  buildQueryStrng(args) {
    let string = "";
    for (let key in args) {
      if (args[key]) {
        if (!string) {
          string += `?${key}=${args[key]}`;
        } else {
          string += `&${key}=${args[key]}`;
        }
      }
    }
    return string;
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async getMe() {
    return await this.get(`me`);
  }

  async getUser({ id }) {
    return await this.get(`users/${id}`);
  }

  async getMultipleAlbums(args) {
    const queryString = this.buildQueryStrng({
      ...args,
      ids: args.ids.join(",")
    });
    const data = await this.get(`albums/${queryString}`);
    return data["albums"];
  }

  async getAlbum({ id }) {
    return await this.get(`albums/${id}`);
  }

  async getAlbumTracks(args) {
    const {
      payload: { id, ...otherArgs }
    } = args;
    const queryString = this.buildQueryStrng(otherArgs);
    const data = await this.get(`albums/${id}/tracks/${queryString}`);
    return data["items"];
  }

  async getMultipleArtists(args) {
    const queryString = this.buildQueryStrng({
      ...args,
      ids: args.ids.join(",")
    });
    const data = await this.get(`artists/${queryString}`);
    return data["artists"];
  }

  async getArtist({ id }) {
    return await this.get(`artists/${id}`);
  }

  async getArtistTopTracks(args) {
    const { id, ...otherArgs } = args;
    const queryString = this.buildQueryStrng(otherArgs);
    const data = await this.get(`artists/${id}/top-tracks/${queryString}`);
    return data["tracks"];
  }

  async getArtistRelatedArtists({ id }) {
    const data = await this.get(`artists/${id}/related-artists`);
    return data["artists"];
  }

  async getArtistAlbums(args) {
    const {
      payload: { id, ...otherArgs }
    } = args;
    const queryString = this.buildQueryStrng({
      ...otherArgs,
      include_groups: otherArgs?.include_groups?.join(",")
    });
    const data = await this.get(`artists/${id}/albums/${queryString}`);
    return data["items"];
  }

  async getNewReleases({ payload }) {
    let queryString = "";
    if (payload) {
      queryString = this.buildQueryStrng(payload);
    }
    const data = await this.get(`browse/new-releases/${queryString}`);
    return data["albums"]["items"];
  }

  async getMultipleTracks(args) {
    const queryString = this.buildQueryStrng({
      ...args,
      ids: args.ids.join(",")
    });
    const data = await this.get(`tracks/${queryString}`);
    return data["tracks"];
  }

  async getTrack({ id }) {
    return await this.get(`tracks/${id}`);
  }

  async search(args) {
    const {
      payload: { search_term: q, type, ...otherArgs }
    } = args;
    const queryString = this.buildQueryStrng({
      ...otherArgs,
      type: type.join(","),
      q: q.split(" ").join("+")
    });
    return await this.get(`search/${queryString}`);
  }

  async getPersonalizedData(args) {
    const {
      payload: { type, ...otherArgs }
    } = args;
    const queryString = this.buildQueryStrng(otherArgs);
    const data = await this.get(`me/top/${type}/${queryString}`);
    return data.items;
  }

  async getFeaturedPlaylists(args) {
    const queryString = this.buildQueryStrng(args);
    return await this.get(`browse/featured-playlists/${queryString}`);
  }

  async getAllCategories(args) {
    const queryString = this.buildQueryStrng(args);
    const data = await this.get(`browse/categories${queryString}`);
    return data?.categories;
  }

  async getCategory({ id }) {
    return await this.get(`browse/categories/${id}`);
  }

  async getcategoriesPlaylists(args) {
    const {
      payload: { category_id, ...otherArgs }
    } = args;
    const queryString = this.buildQueryStrng(otherArgs);
    const data = await this.get(
      `browse/categories/${category_id}/playlists/${queryString}`
    );
    return data?.playlists;
  }

  async getRecommendedGenres() {
    const data = await this.get("recommendations/available-genre-seeds");
    return data?.genres;
  }

  async followPlaylist({ playlist_id, public: public_playlist = false }) {
    await this.put(`playlists/${playlist_id}/followers`, {
      public: public_playlist
    });
    return true;
  }

  async unfollowPlaylist({ playlist_id, public: public_playlist = false }) {
    await this.delete(`playlists/${playlist_id}/followers`);
    return true;
  }
}
