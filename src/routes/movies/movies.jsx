import React, { useEffect, useState } from "react";
import CardItem from "../users-item/usersItem";
import axios from "../../api";
import { Link } from "react-router-dom";

const Movies = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/shows"); // Assuming this is how you fetch data
        if (response.data) {
          setData(response.data);
        } else {
          throw new Error("No data available");
        }
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-[1200px] mx-auto my-10">
      <h1 className="text-4xl text-white select-none">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-4">
        {paginatedData.map((movie) => (
          <Link key={movie.id} to={`/single-movie/${movie.id}`}>
            <CardItem
              image={movie.image?.original} // Optional chaining to handle potential null values
              title={movie.name}
              premiered={movie.premiered?.split("-")[0]} // Optional chaining
              lang={movie.language}
            />
          </Link>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-6 text-white">
        <button
          className="px-4 py-2 bg-[#1a1b23] rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-[#1a1b23]"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 bg-[#1a1b23] rounded"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
