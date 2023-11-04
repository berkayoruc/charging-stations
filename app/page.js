import LocationAggregatorMap from "@/components/Map";
import axios from "axios";
import Script from "next/script";

async function getData() {
  let stations = { type: "FeatureCollection", features: [] };

  const response = await axios
    .get(process.env.NEXT_PUBLIC_STATION_URL)
    .catch((err) => err);

  if (response.status === 200) {
    stations = response.data;
  }

  return stations;
}

export default async function Home() {
  const stations = await getData();
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-K1071TL83T" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-K1071TL83T');
        `}
      </Script>
      <div className="h-[100svh] w-[100svw]">
        <LocationAggregatorMap stations={stations} />
      </div>
    </>
  );
}
