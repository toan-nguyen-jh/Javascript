import {
  getLocationInfoByCoordinates,
  getSuggestions,
  getLocationInfoById,
} from "./api.js";
import {
  debounce,
  generateSessionToken,
  getInformationFromFeature,
} from "./utils.js";

window.accessToken =
  "pk.eyJ1IjoiY2h1b25nbmd1eWVuMjYwNyIsImEiOiJja285bnNwdDMyaXpmMnZxd29wNzVudXFiIn0.bCrLEz9sI9hr_-lxBQGRGg";

mapboxgl.accessToken = window.accessToken;

const map = new mapboxgl.Map({
  container: "map",
  center: [106.660172, 10.762622],
  zoom: 14,
});

const marker = new mapboxgl.Marker()
  .setLngLat([106.660172, 10.762622])
  .addTo(map);

async function moveMarkerAndFetchData(lng, lat) {
  marker.setLngLat([lng, lat]);
  map.flyTo({ center: [lng, lat], zoom: 14 });

  const locations = await getLocationInfoByCoordinates(lng, lat);
  updateCardInfo(locations);
}

marker.on("dragend", async () => {
  const newLngLat = marker.getLngLat();
  await moveMarkerAndFetchData(newLngLat.lng, newLngLat.lat);
});

map.on("click", async (e) => {
  moveMarkerAndFetchData(e.lngLat.lng, e.lngLat.lat);
});

function updateCardInfo(locations) {
  const container = document.querySelector(".card-info-ctn");
  container.innerHTML = "";

  locations.forEach((location) => {
    const item = document.createElement("div");
    item.classList.add("card-info-item");
    item.dataset.lng = location.coordinates[0];
    item.dataset.lat = location.coordinates[1];

    const title = document.createElement("h2");
    title.textContent = location.name;

    const address = document.createElement("p");
    address.textContent = location.address;

    item.appendChild(title);
    item.appendChild(address);
    container.appendChild(item);
  });
  document.querySelectorAll(".card-info-item").forEach((item) => {
    item.addEventListener("click", function () {
      const lng = parseFloat(this.dataset.lng);
      const lat = parseFloat(this.dataset.lat);
      moveMarkerAndFetchData(lng, lat);
    });
  });
}

// Search

const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions-list");

const sessionToken = generateSessionToken();

const debouncedGetSuggestions = debounce((query) => {
  handleGetSuggestions(query);
}, 300);

async function handleGetSuggestions(query) {
  if (!query) {
    suggestionsList.innerHTML = "";
    return;
  }

  try {
    const data = await getSuggestions(query, sessionToken);
    suggestionsList.innerHTML = "";
    if (data.suggestions) {
      data.suggestions.forEach((suggestion) => {
        const li = document.createElement("li");
        li.textContent = suggestion.name;
        li.dataset.id = suggestion.mapbox_id;
        suggestionsList.appendChild(li);
      });
    }
  } catch (error) {
    console.error("Lỗi khi tìm kiếm:", error);
  }
}

searchInput.addEventListener("input", () => {
  debouncedGetSuggestions(searchInput.value);
});

suggestionsList.addEventListener("click", async (event) => {
  if (event.target.tagName === "LI") {
    const placeId = event.target.dataset.id;
    searchInput.value = event.target.textContent;
    suggestionsList.innerHTML = "";

    try {
      const data = await getLocationInfoById(placeId, sessionToken);
      const { coordinates } = data.features[0].geometry;

      marker.setLngLat(coordinates);
      map.flyTo({
        center: coordinates,
        zoom: 14,
      });

      updateCardInfo(
        data.features.map((feature) => getInformationFromFeature(feature))
      );
    } catch (error) {
      console.error("Lỗi khi lấy thông tin địa điểm:", error);
    }
  }
});
