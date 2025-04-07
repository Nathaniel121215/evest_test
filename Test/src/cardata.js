import { useEffect, useState } from "react";
import useSWR from "swr";

const FETCH_INTERVAL = 300000; // 5 minutes
const CACHE_KEY = "carData";
const carDataUrl = "https://evest-flask-app-114991513236.us-central1.run.app/get_car_catalog";

const carDataFetcher = async (url) => {
  // console.log("Fetching Data from Cloud:", url);
  const response = await fetch(url);
  const responseData = await response.json();
  localStorage.setItem(CACHE_KEY, JSON.stringify(responseData)); // Store in cache
  // console.debug("Data Fetched:", responseData);
  return responseData; // Return JSON object
};

export const CARDATA = (featured = "false") => {

  let dataUrl = carDataUrl;
  if (featured.toLocaleLowerCase() === "true") {
    dataUrl = dataUrl + "?featured=true";
  }

  const { data, error } = useSWR(dataUrl, carDataFetcher, {
    refreshInterval: FETCH_INTERVAL,
    revalidateOnFocus: false,
  });

  const [responseData, setData] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      console.debug("Using Cached Data...");
      setData(JSON.parse(cachedData));
    } else if (data) {
      console.debug("Using Fetched Data...");
      setData(data);
    } else if (error) {
      console.error("Error Fetching Cloud Data:", error);
    }
  }, [data, error]);

  // console.log("Data: ", responseData);

  return responseData; // Returns JSON object or null while loading
};