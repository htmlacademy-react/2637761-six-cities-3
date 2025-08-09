import {useEffect, useRef} from 'react';
import leaflet, {LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {useMap} from '../../hooks/useMap';
import {MapProps} from '../../types/types';

const defaultIcon = leaflet.icon({
  iconUrl: './img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const activeIcon = leaflet.icon({
  iconUrl: './img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const PlaceMap = ({ viewType, city, places, selectedPlace}: MapProps) => {
  const mapRef = useRef<HTMLElement>(null);
  const map = useMap(mapRef);
  const markerLayerRef = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map !== null) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayerRef.current.addTo(map);
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      markerLayerRef.current.clearLayers();

      places.forEach((place) => {
        leaflet
          .marker(
            {
              lat: place.location.latitude,
              lng: place.location.longitude,
            },
            {
              icon: place.id === selectedPlace ? activeIcon : defaultIcon,
            }
          )
          .addTo(markerLayerRef.current);
      });
    }
  }, [map, places, selectedPlace]);

  return (
    <section
      className={`${viewType}__map map`}
      ref={mapRef}
    />
  );
};

export default PlaceMap;
