import React from 'react';
import { useState, useEffect } from 'react';
import { TemplateCard } from "../components/TemplateCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRocket, faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import InfiniteScroll from "react-infinite-scroller";

const SearchBar = () => (
  <div className="relative w-full max-w-sm my-3">
    <input
      className="w-full px-5 py-3 text-sm rounded-full bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
      placeholder="Search projects..."
    />
    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </button>
  </div>
);

export const UniversalPage = () => {
  const [hasMore, setHasMore] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [visibleTemplates, setVisibleTemplates] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/project/visible`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setTemplates(data);
      // console.log(data);
      
    } catch (err) {
      setError(err.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    const initialItems = templates.slice(0, 6);
    setVisibleTemplates(initialItems);
    setHasMore(initialItems.length < templates.length);
  }, [templates]);

  const loadMoreTemplates = () => {
    if (!isLoading) {
      const nextPage = page + 1;
      const nextItems = templates.slice(0, nextPage * 6);
      
      setVisibleTemplates(nextItems);
      setPage(nextPage);
      setHasMore(nextItems.length < templates.length);
    }
  };

  return (
    <div className="min-h-screen w-full text-white px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-4xl font-semibold tracking-wide">
            <FontAwesomeIcon icon={faRocket} /> Public Projects
          </h2>
        </div>
        <SearchBar />
      </div>

      <div className="text-gray-400 mb-8 text-lg max-w-2xl">
        Train your chatbot with data, use our ready-to-use templates, or start from scratch.
      </div>

      {isLoading && visibleTemplates.length === 0 ? (
        <div className="flex justify-center my-4">
          <FontAwesomeIcon 
            icon={faHexagonNodes} 
            className="w-10 h-10 text-indigo-500 animate-spin"
            style={{ animationDuration: '1s' }}
          />
        </div>
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMoreTemplates}
          hasMore={hasMore}
          loader={
            <div key={0} className="flex justify-center my-4">
              <FontAwesomeIcon 
                icon={faHexagonNodes} 
                className="w-10 h-10 text-indigo-500 animate-spin"
                style={{ animationDuration: '1s' }}
              />
            </div>
          }
          useWindow={true}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTemplates.map((template, index) => (
              <div 
                key={index} 
                className="transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl rounded-xl overflow-hidden bg-gray-800 hover:bg-gray-700"
              >
                <TemplateCard 
                  id={template._id}
                  title={template.name} 
                  description={template.messages}
                  initialVotes={template.votes}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default UniversalPage;