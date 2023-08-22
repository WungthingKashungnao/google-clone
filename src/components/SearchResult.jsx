import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { fetchDataFromApi } from "../utils/api";
import SearchResultHeader from "./SearchResultHeader";
import Footer from "./Footer";
import SearchedItemTemplate from "./SearchedItemTemplate";
import SearchedImageItemTemplate from "./SearchedImageItemTemplate";
import Pagination from "./Pagination";
import { Context } from "../utils/ContextApi";

const SearchResult = () => {
  const [result, setResult] = useState(); //state to store the result of api data
  const { query, startIndex } = useParams(); //getting queries from the url
  const { imageSearch } = useContext(Context); //importing the state to to change result type to image

  useEffect(() => {
    fetchSearchResults();
  }, [query, startIndex, imageSearch]);

  // function to fetch search results
  const fetchSearchResults = () => {
    let payload = { q: query, start: startIndex }; //this payload is going to be added to the fetchDataFromApi function inside api file
    if (imageSearch) {
      payload.searchType = "image";
    }
    fetchDataFromApi(payload).then((res) => {
      console.log(res);
      setResult(res);
    });
  };

  // if there is no result from api do not run code inside the return
  if (!result) {
    return;
  }
  const { items, queries, searchInformation } = result; //destructuring data from api
  return (
    <div className="flex flex-col min-h-[100vh]">
      <SearchResultHeader />
      <main className="grow p-[12px] pb-0 md:pr-5 md:pl-20">
        <div className="flex text-sm text-[#70757a] mb-3">
          {`About ${searchInformation.formattedTotalResults} results in (${searchInformation.formattedSearchTime})`}
        </div>

        {/* displaying search results on whether it is All or image type */}
        {!imageSearch ? (
          <>
            {items.map((item, index) => (
              <SearchedItemTemplate key={index} data={item} />
            ))}
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              {items.map((item, index) => (
                <SearchedImageItemTemplate key={index} data={item} />
              ))}
            </div>
          </>
        )}
        <Pagination queries={queries} />
      </main>
      <Footer />
    </div>
  );
};

export default SearchResult;
