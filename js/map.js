///
///Карта Яндекс API////
///

async function init() {
  await ymaps3.ready;

  const customization = await fetch('./customization.json').then((response) => response.json());

  const coords = [38.974016, 45.041572];

  const map = new ymaps3.YMap(document.getElementById('map'), {
    location: {
      center: coords,
      zoom: 16,
    },
  });

  map.addChild(
    new ymaps3.YMapDefaultSchemeLayer({
      customization,
    }),
  );

  map.addChild(new ymaps3.YMapDefaultFeaturesLayer());

  const markerElement = document.createElement('div');
  markerElement.className = 'my-marker';
  markerElement.innerHTML = `  
  <img src="assets/img/icons/marker.svg" alt="Метка">
  `;

  map.addChild(
    new ymaps3.YMapMarker(
      {
        coordinates: coords,
      },
      markerElement,
    ),
  );
}

init();
