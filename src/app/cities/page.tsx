import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "../../styles/city.css";
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
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=geoname_id%2C%20%20%20name%2C%20%20cou_name_en%2C%20%20population%2C%20%20timezone%2C%20dem%2C%20coordinates%20&limit=${limit}&offset=${(page - 1) * limit}`
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
    <section className="py-36">
      <div className="container">
        <h1 className="mb-3 text-6xl font-bold">All cities</h1>
        <InfiniteScroll
          dataLength={cityData.length} // This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No more cities to display!</p>}
          scrollThreshold={0.9} // Trigger fetch when user has scrolled 90% of the way down
        >
          <DataTable columns={columns} data={cityData} />
        </InfiniteScroll>
      </div>
    </section>
  );
}
