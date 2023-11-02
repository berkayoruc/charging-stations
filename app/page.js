import LocationAggregatorMap from "@/components/Map";
import axios from "axios";

async function getData() {
  const urls = [
    {
      url: "https://veri.tuzla.bel.tr/api/3/action/datastore_search?resource_id=0c894436-db88-44ea-bf15-d7b2e51b5509&limit=500",
      city: "istanbul",
      district: "tuzla",
    },
    {
      url: "https://veri.kocaeli.bel.tr/tr/dataset/9021334f-358b-4a1a-9f4f-76592ca07541/resource/f853e162-8895-47e8-8bcf-e1b8796f1cf1/download/akulu-sandalye-arj-istasyonu.json",
      city: "kocaeli",
    },
    {
      url: "https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=028f2692-d930-481f-ab27-17a321bd1283&limit=500",
      city: "izmir",
    },
    {
      url: "https://opendata.gaziantep.bel.tr/api/3/action/datastore_search?resource_id=a9b86fc1-af55-41ca-984e-164c161c14d3&limit=500",
      city: "gaziantep",
    },
  ];
  let stations = { type: "FeatureCollection", features: [] };

  for (let i = 0; i < urls.length; i++) {
    const { url, city, district } = urls[i];

    const res = await axios.get(url).catch((err) => err);
    if (res.status === 200) {
      if (res && res.data) {
        if (city === "istanbul" && district === "tuzla") {
          stations.features = stations.features.concat(
            res.data.result.records.map((station) => {
              return {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [station.BOYLAM, station.ENLEM],
                },
                properties: {
                  name: station["ENGELLI ARACI SARJ ISTASYONLARI"],
                  address: station.ADRES,
                },
              };
            })
          );
        } else if (city === "kocaeli") {
          stations.features = stations.features.concat(
            res.data.features.map((station) => {
              return {
                type: station.type,
                geometry: station.geometry,
                properties: {
                  name: station.properties.adi,
                  address: station.properties.adres,
                },
              };
            })
          );
        }
      }
    } else {
      console.log("error", res.status, res.statusText, city);
    }
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
