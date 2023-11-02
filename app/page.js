import LocationAggregatorMap from "@/components/Map";
import axios from "axios";

async function getData() {
  let stations = { type: "FeatureCollection", features: [] };

  const response = await axios
    .get(
      "https://raw.githubusercontent.com/hexa-apps/charging-stations-action/main/stations.json"
    )
    .catch((err) => err);

  if (response.status === 200) {
    stations = response.data;
  }

  return stations;
}

export default async function Home() {
  const stations = await getData();
  return (
    <div className="h-screen">
      <LocationAggregatorMap stations={stations} />
    </div>
    // <ul>
    //   {stations.features.map((station) => (
    //     <li
    //       className="border-b border-blue-300 p-2 cursor-pointer"
    //       key={Math.random()}
    //     >
    //       <h3>{station.properties.name}</h3>
    //       <p>{station.properties.address}</p>
    //     </li>
    //   ))}
    // </ul>
  );
}
