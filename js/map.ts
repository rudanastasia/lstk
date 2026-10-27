///
///Карта Яндекс API////
///
import type { LngLat } from '@yandex/ymaps3-types';

const BASE_PATH = import.meta.env.BASE_URL;

async function init(): Promise<void> {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  await ymaps3.ready;

  const customization = await fetch(`${BASE_PATH}customization.json`).then((response) =>
    response.json(),
  );

  const coords: LngLat = [38.974016, 45.041572];

  const map = new ymaps3.YMap(mapElement, {
    location: {
      center: coords,
      zoom: 16,
    },
  });

  map.addChild(new ymaps3.YMapDefaultSchemeLayer({ customization }));
  map.addChild(new ymaps3.YMapDefaultFeaturesLayer({}));

  const markerElement = document.createElement('div');
  markerElement.className = 'my-marker';
  markerElement.innerHTML = `
    <img src="${BASE_PATH}assets/img/icons/marker.svg" alt="Метка карты">
  `;

  map.addChild(new ymaps3.YMapMarker({ coordinates: coords }, markerElement));
}

init();
