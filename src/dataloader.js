import DataLoader from "dataloader";
import fetch from "node-fetch";

export function tracksLoader(token) {
  return new DataLoader(ids => getAllTrack(ids, token));
}

async function getAllTrack(ids, token) {
  let ids_string = ids.join(",");
  const res = await fetch(
    `https://api.spotify.com/v1/albums?ids=${ids_string}`,
    {
      headers: { authorization: token }
    }
  );
  const data = await res.json();
  const return_data = {};
  data.albums.forEach(element => {
    return_data[element.id] = element.tracks.items;
  });
  return ids.map(id => return_data[id]);
}
