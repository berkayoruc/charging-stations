"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Map, {
  GeolocateControl,
  Layer,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";

const LocationAggregatorMap = (props) => {
  const [popupInfo, setPopupInfo] = useState();
  const [cursor, setCursor] = useState("");
  const mapRef = useRef();

  const onMouse = useCallback((e) => {
    const features = e.target.queryRenderedFeatures(e.point, {
      layers: ["stations"],
    });
    const feature = features && features[0];
    if (feature) {
      setCursor("pointer");
    } else {
      setCursor("");
    }
  }, []);

  const onClick = useCallback((e) => {
    const features = e.target.queryRenderedFeatures(e.point, {
      layers: ["stations"],
    });
    const feature = features && features[0];
    if (feature) {
      e.target.flyTo({
        center: feature.geometry.coordinates,
        zoom: 15,
        pitch: 60,
        bearing: 40,
      });
      setPopupInfo({
        lon: feature.geometry.coordinates[0],
        lat: feature.geometry.coordinates[1],
        ...feature.properties,
      });
    } else {
      setPopupInfo(null);
    }
  }, []);

  const onBack2Home = (e) => {
    e.preventDefault();
    setPopupInfo(null);
    const bounds = bbox(props.stations);
    mapRef.current.getMap().fitBounds(bounds, { padding: 50 });
  };

  // useEffect(() => {
  //   console.log("mapRef", mapRef);
  // }, [mapRef]);

  return (
    <Map
      className=""
      ref={mapRef}
      initialViewState={{
        bounds: props.stations
          ? bbox(props.stations)
          : [
              [-180, -90],
              [180, 90],
            ],
        fitBoundsOptions: {
          padding: 50,
        },
      }}
      controller={false}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      cursor={cursor}
      onMouseMove={onMouse}
      onLoad={(e) => {
        const map = e.target;
        map.resize();
        map.on("click", onClick);
      }}
    >
      {props.stations && (
        <Source type="geojson" data={props.stations}>
          <Layer
            id="stations"
            type="circle"
            paint={{
              "circle-radius": 8,
              "circle-color": "#1978c8",
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            }}
          />
        </Source>
      )}
      {popupInfo && (
        <Popup
          closeOnClick={false}
          closeButton={true}
          longitude={Number(popupInfo.lon)}
          latitude={Number(popupInfo.lat)}
          onClose={() => setPopupInfo(null)}
        >
          <div className="flex flex-col gap-2 p-2 items-start justify-center">
            <h3 className="text-gray-900 text-md font-bold">
              {popupInfo.name}
            </h3>
            <p className="text-gray-500">{popupInfo.address}</p>
          </div>
        </Popup>
      )}
      {props.stations && (
        <button
          className="absolute top-0 right-0 mr-2.5 mt-2.5 bg-white rounded-md  text-lg shadow-md cursor-pointer select-none w-[29px] h-[29px] flex items-center justify-center mapboxgl-ctrl mapboxgl-ctrl-group"
          title="Başlangıç konumuna dön"
          aria-description="Haritayı başlangıç konumuna döndür"
          onClick={onBack2Home}
        >
          🏠
        </button>
      )}
      <GeolocateControl position="bottom-right" />
      <NavigationControl position="bottom-right" />
    </Map>
  );
};

export default LocationAggregatorMap;
