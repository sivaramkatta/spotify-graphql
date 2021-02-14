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
}
