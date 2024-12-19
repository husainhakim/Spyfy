import React, { useState } from "react";
import Navbar from "@layouts/Navbar";
import ItemsRow from "@components/ItemsRow";
import axios from "axios";
import SongItem from "@components/ui/SongItem";

const SearchView = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        if (!query) setResults([]);

        const songs = await axios.get(
            "http://localhost:4000/api/song/search/" + query,
        );

        setResults(songs.data);
    };

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-start mt-6 px-4">
                <form
                    onSubmit={handleSearchSubmit}
                    className="relative w-full max-w-lg gap-5 flex"
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                    />
                    <button
                        type="submit"
                        className="absolute left-3 top-2.5 text-gray-500"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35m1.55-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-full"
                    >
                        Search
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35m1.55-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>
                </form>

                {results.length !== 0 && (
                    <ItemsRow
                        title={`Search for ${query}`}
                        Element={SongItem}
                        data={results}
                    />
                )}
            </div>
        </>
    );
};

export default SearchView;
