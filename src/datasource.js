const { RESTDataSource } = require("apollo-datasource-rest");

export class SpotifyRestDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1/";
  }

  buildQueryStrng(args) {
    let string = "";
    for (let key in args) {
      if (!string) {
        string += `?${key}=${args[key]}`;
      } else {
        string += `&${key}=${args[key]}`;
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
}
