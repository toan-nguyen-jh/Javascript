import { getInformationFromFeature } from "./utils.js";

export async function getLocationInfoByCoordinates(
  lng,
  lat,
  accessToken = window.accessToken
) {
  const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features.map((feature) => getInformationFromFeature(feature));
    } else {
      return [{ name: "Không tìm thấy thông tin", address: "" }];
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    return [{ name: "Lỗi khi lấy thông tin", address: "" }];
  }
}

export async function getSuggestions(
  query,
  sessionToken,
  accessToken = window.accessToken
) {
  const url = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&limit=5&session_token=${sessionToken}&access_token=${accessToken}`;
  const response = await fetch(url);
  return await response.json();
}

export async function getLocationInfoById(
  placeId,
  sessionToken,
  accessToken = window.accessToken
) {
  const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${placeId}?session_token=${sessionToken}&access_token=${accessToken}`;
  const response = await fetch(url);
  return await response.json();
}
