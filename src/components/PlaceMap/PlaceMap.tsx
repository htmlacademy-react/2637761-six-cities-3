import { useEffect, useRef } from 'react';
import { icon, layerGroup, marker } from 'leaflet';
import { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useMap } from '../../hooks/useMap';
import { MapProps } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { getActivePlaceId } from '../../store/offers/selectors';


const defaultIcon = icon({
  iconUrl: 'img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const activeIcon = icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const PlaceMap = ({ viewType, city, places }: MapProps) => {
  const mapRef = useRef<HTMLElement>(null);
  const map = useMap(mapRef);
  const markerLayerRef = useRef<LayerGroup>(layerGroup());
  const markersRef = useRef<Map<string, Marker>>(new Map());

  const activePlaceId = useAppSelector(getActivePlaceId);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      markerLayerRef.current.addTo(map);
      markerLayerRef.current.clearLayers();

      markersRef.current.clear();

      places.forEach((place) => {
        const markerItem = marker(
          {
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
          {
            icon: defaultIcon,
          }
        );

        markersRef.current.set(place.id, markerItem);
        markerItem.addTo(markerLayerRef.current);
      });
    }
  }, [map, city, places]);

  useEffect(() => {
    if (markersRef.current.size > 0) {
      markersRef.current.forEach((item, placeId) => item.setIcon(placeId === activePlaceId ? activeIcon : defaultIcon));
    }
  }, [activePlaceId, places]);

  return (
    <section
      className={`${viewType}__map map`}
      ref={mapRef}
    />
  );
};

export default PlaceMap;
