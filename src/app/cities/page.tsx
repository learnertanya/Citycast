import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DataTable } from "./data-table";
import { columns, City } from "./columns";

export default function Page() {
  const [cityData, setCityData] = useState<City[]>([]);
  const [page, setPage] = useState<number>(1); // Track current page
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if there are more items to fetch
  const limit: number = 15; // Number of items to fetch per page

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run only once when the component mounts

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=geoname_id%2C%20%20%20name%2C%20%20cou_name_en%2C%20%20population%2C%20%20timezone%2C%20dem%2C%20coordinates%20&limit=${limit}&offset=${
          (page - 1) * limit
        }`
      );
      const data = await res.json();
      if (data.results.length === 0) {
        setHasMore(false); // No more items to fetch
        return;
      }
      setCityData((prevData) => [...prevData, ...data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  return (
    <section className="bg-indigo-200">
      <div className="container">
        <h1 className="uppercase text-6xl font-bold font-serif text-slate-700  px-[480px] py-[20px]">CityCast</h1>
        <p className="text-black-700 text-lg italic font-mono pb-10">Your gateway to instant weather forecasts for every city. Click to discover what the weather holds for your favorite destinations.</p>
        <InfiniteScroll
          dataLength={cityData.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more cities to display!</p>}
          scrollThreshold={0.9}
        >
          <DataTable columns={columns} data={cityData} />
        </InfiniteScroll>
      </div>
    </section>
  );
}
