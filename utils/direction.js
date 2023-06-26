const axios = require('axios');

// 경로 검색 기능 함수
async function direction(departure, destination) {
  // Get coordinates for departure and destination
  const nominatimUrl = 'https://nominatim.openstreetmap.org/search';
  const startResponse = await axios.get(nominatimUrl, {
    params: {
      q: departure,
      format: 'json',
    },
  });
  const start = startResponse.data[0];
  const startX = parseFloat(start.lat).toFixed(6);
  const startY = parseFloat(start.lon).toFixed(6);

  const endResponse = await axios.get(nominatimUrl, {
    params: {
      q: destination,
      format: 'json',
    },
  });
  const end = endResponse.data[0];
  const endX = parseFloat(end.lat).toFixed(6);
  const endY = parseFloat(end.lon).toFixed(6);

  // Generate Google Maps URL
  const googleMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${startX},${startY}&destination=${endX},${endY}&travelmode=transit`;

  return {
    startX,
    startY,
    endX,
    endY,
    googleMapUrl,
  };
}

module.exports = direction;