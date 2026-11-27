const ANILIST_URL = "https://graphql.anilist.co";

const mapMedia = (items = []) =>
  items.map((item) => ({
    id: item.id,
    title: item.title?.english || item.title?.romaji || "Untitled",
    poster_path: item.coverImage?.large || "",
  }));

export const getTopAnime = async () => {
  const query = `
    query {
      Page(perPage: 20) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title { english romaji }
          coverImage { large }
        }
      }
    }
  `;

  const res = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error(`AniList error: ${res.status}`);
  const json = await res.json();
  return mapMedia(json.data?.Page?.media);
};

export const searchAnime = async (search) => {
  const query = `
    query ($search: String) {
      Page(perPage: 20) {
        media(type: ANIME, search: $search, sort: POPULARITY_DESC) {
          id
          title { english romaji }
          coverImage { large }
        }
      }
    }
  `;

  const res = await fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { search } }),
  });

  if (!res.ok) throw new Error(`AniList error: ${res.status}`);
  const json = await res.json();
  return mapMedia(json.data?.Page?.media);
};