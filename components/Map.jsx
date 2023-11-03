"use client";

import React from "react";

import Map, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { bbox } from "@turf/turf";
import mapboxgl from "mapbox-gl";

const LocationAggregatorMap = (props) => {
  return (
    <Map
      className=""
      initialViewState={{
        bounds: props.stations
          ? bbox(props.stations)
          : [
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
            "circle-radius": 8,
            "circle-color": "#1978c8",
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        map.on("mouseenter", "stations", function (e) {
          e.target.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "stations", function (e) {
          e.target.getCanvas().style.cursor = "";
        });
        map.on("click", "stations", function (e) {
          const features = e.target.queryRenderedFeatures(e.point);
          const feature = features[0];
          if (feature) {
            e.target.flyTo({
              center: feature.geometry.coordinates,
              zoom: 15,
              pitch: 60,
              bearing: 40,
            });
            const popup = new mapboxgl.Popup()
              .setHTML(
                `
                <div class="flex flex-col gap-2 p-2 items-start justify-center">
                  <h3 class="text-black text-md font-bold">${feature.properties.name}</h3>
                  <p class="text-black">${feature.properties.address}</p>
                </div>
                `
              )
              .setLngLat(feature.geometry.coordinates)
              .addTo(map);
          }
        });
      }}
    >
      <NavigationControl position="bottom-right" />
    </Map>
  );
};

export default LocationAggregatorMap;
