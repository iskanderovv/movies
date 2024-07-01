import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchMovie = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const truncTitle = (text, num) => {
        return text.length < num ? text : text.slice(0, num) + '...'
    }

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
            setSearchResults(response.data.map(result => result.show));
        } catch (error) {
            console.error("Error fetching data:", error);
            setSearchResults([]);
        }
    };

    return (
        <div>
            <form action="#" className="flex items-center border-b border-[#b9090b]">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="bg-transparent outline-none text-white px-2 text-[18px]"
                    placeholder="Search Movies..."
                />
            </form>

            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-white text-xl">Search Results:</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
                        {searchResults.map((movie) => (
                            <Link key={movie.id} to={`/single-movie/${movie.id}`} className="text-white block">
                                <img src={movie.image?.medium} alt={movie.name} className="h-[300px] w-full rounded-tl rounded-tr" />
                                <h3 className="text-xl text-white pt-2 px-4">{truncTitle(movie.name, 18)}</h3>
                                <p className="text-[#9B9DAB] pb-2 px-4">
                                    <span>{movie.language}</span> • <span>{movie.premiered?.split("-")[0]}</span>
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchMovie;
