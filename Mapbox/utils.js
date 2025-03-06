export function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

export function generateSessionToken() {
  return Math.random().toString(36).substring(2, 15);
}

export function getInformationFromFeature(feature) {
  return {
    name: feature.properties.name || "Không có tên",
    address: feature.properties.place_formatted || "Không có địa chỉ",
    coordinates: feature.geometry.coordinates,
  };
}
