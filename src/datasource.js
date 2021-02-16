const { RESTDataSource } = require("apollo-datasource-rest");

export class SpotifyRestDataSource extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spotify.com/v1/";
  }

  willSendRequest(request) {
    request.headers.set("Authorization", this.context.token);
  }

  async getMe() {
    return this.get(`me`);
  }

  async getUser(id) {
    return this.get(`users/${id}`);
  }

  async getMultipleAlbums(ids, market) {
    let url = "albums?";
    if (ids) {
      url += `ids=${ids.join(",")}`;
    }
    if (market) {
      url += `market=${market}`;
    }
    const data = await this.get(url);
    return data["albums"];
  }
}
