import { TemplateCard } from "../components/TemplateCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faRocket,faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

// const templates = [
//     { title: "Blank Bot", description: "Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.Create a blank chatbot, which you can train and customize later.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Website", description: "Crawl your website’s content to get answers to popular user questions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Zendesk", description: "Scan your Zendesk help center articles to answer customer questions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Knowledge Base", description: "Scrape your Knowledge Base articles to answer customer questions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Online Quiz Bot", description: "Engage your customers with a chatbot quiz tailored to your needs.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save time.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Customer Satisfaction", description: "Automate collecting surveys to capture your customers' voices and opinions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save time.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Customer Satisfaction", description: "Automate collecting surveys to capture your customers' voices and opinions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save time.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Customer Satisfaction", description: "Automate collecting surveys to capture your customers' voices and opinions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save time.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Customer Satisfaction", description: "Automate collecting surveys to capture your customers' voices and opinions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Job Application Bot", description: "Automate sourcing candidates to speed up your hiring process.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "FAQ Bot", description: "Answer frequently asked questions with a chatbot and save time.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Customer Satisfaction", description: "Automate collecting surveys to capture your customers' voices and opinions.", imgSrc: "/assets/IMG_0664.jpg" },
//     { title: "Create HelpDesk Tickets", description: "Let customers create HelpDesk tickets while chatting with your chatbot.", imgSrc: "/assets/IMG_0664.jpg" }
//   ];
  
  const SearchBar = () => (
    <form className="relative w-full max-w-sm my-3">
      <input
        className="w-full px-5 py-3 text-sm rounded-full bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Search projects..."
      />
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
  
export const UniversalPage = () => {
  const [hasMore, setHasMore] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [visibleTemplates, setVisibleTemplates] = useState(templates.slice(0, 0));
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering users
  const [searchResult, setSearchResult]= useState([]);
  const [mount, setMount] = useState(false);
  
  const [error, setError] = useState(null);

  const searchRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResult([]); // Clear search results if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleSearch = ()=>{
    console.log("searching....")
    setSearchResult([]);
    if(searchTerm.length===0)return;
    visibleTemplates.map((template,index)=>{
        const tosearch = template.name.trim().toLowerCase();
        const search = searchTerm.trim().toLowerCase();
        if(tosearch.includes(search)){
            setSearchResult((old)=>[...old,template]);
        }
    });
    console.log(searchResult);
  }
  const getAllProjects = async () => {
    try {
      const response = await fetch(`http://localhost:3001/project/visible`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");

      }

      const data = await response.json();
      // console.log(data);
      setTemplates(data); // Set the fetched projects
    } catch (err) {
      setError(err.message); // Capture and set the error
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllProjects();
  },[]);
  useEffect(()=>{
    setVisibleTemplates(templates);
  },[templates]);
  useEffect(()=>{
    if(mount)handleSearch();
    else setMount(true);
  },[searchTerm])
  const [page, setPage] = useState(1);

  const loadMoreTemplates = () => {
    setTimeout(() => { // Delay ensures smoother state updates
      const nextPage = page + 1;
      const nextItems = templates.slice(0, nextPage * 6);
  
      setVisibleTemplates([...nextItems]); // Create a new reference for React to detect changes
      setPage(nextPage);
      
      if (nextItems.length >= templates.length) {
        setHasMore(false);
      }
    }, 1500); // Simulate loading time
  };

  return (
    <div className="min-h-screen w-[100%] text-white px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 ">
        <div>
          <h2 className="text-4xl font-semibold tracking-wide"><FontAwesomeIcon icon={faRocket} /> Public Projects</h2>
        </div>
        {/* Searchbar */}
        <div ref={searchRef} className="w-full md:w-[25rem]">
        <div className="relative w-full max-w-lg mt-3 mb-1">
          <input
            onChange={(e)=>{setSearchTerm(e.target.value)}}
            className="w-full px-5 py-3 text-sm rounded-full bg-gray-800 border border-gray-600 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Search projects..."
            value={searchTerm}
          />
          <button onClick={()=>setSearchResult([])} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        {/* Search Results Dropdown */}
        {searchResult.length > 0 && (
            <div className="absolute bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 w-[25rem]">
              {searchResult.map((project, index) => (
                <div 
                  key={index}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition"
                >
                  {project.name}
                </div>
              ))}
            </div>
        )}
        </div>
      </div>

       {/* Description */}
       <div className="text-gray-400 mb-8 text-lg max-w-2xl">
         Train your chatbot with data, use our ready-to-use templates, or start from scratch.
       </div>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreTemplates}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center my-4">
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
                upVotes={0}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};


/* */