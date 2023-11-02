"use client";

import React from "react";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";

const LocationAggregatorMap = (props) => {
  return (
    <Map
      className=""
      initialViewState={{
        bounds: bbox(props.stations) || [
          [-180, -90],
          [180, 90],
        ],
        fitBoundsOptions: {
          padding: 100,
        },
      }}
      controller={false}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onLoad={(e) => {
        const map = e.target;
        map.resize();

        map.addSource("stations", {
          type: "geojson",
          data: props.stations || {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: "stations",
          type: "circle",
          source: "stations",
          paint: {
            "circle-radius": 6,
            "circle-color": "#1978c8",
          },
        });
      }}
    ></Map>
  );
};

export default LocationAggregatorMap;
