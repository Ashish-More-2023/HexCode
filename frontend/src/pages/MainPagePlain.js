import '../App.css';

import React, { useState, useEffect, useRef, useContext } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import { useParams } from 'react-router-dom';

import Frame from 'react-frame-component';
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { ActionContext } from './ActionContext'; // Updated import path
import { useUser } from "../hooks/userContext";

import { Sandpack, SandpackProvider, useSandpack, SandpackLayout } from "@codesandbox/sandpack-react";
import SandpackPreviewClient2 from './SandpackPreviewClient2';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered, faCode, faWindowMaximize, faWandMagicSparkles,
  faFileArrowDown, faRocket, faFloppyDisk, faUpRightAndDownLeftFromCenter,
  faHexagonNodes, faCopy, faLock
}
  from "@fortawesome/free-solid-svg-icons";
import { faReact, faHtml5, faCss3Alt, faSquareJs } from "@fortawesome/free-brands-svg-icons";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/";

const MainPagePlain = () => {
  // Define states
  
  const [prompt, setPrompt] = useState(""); // State for user input
  const { action, setAction } = useContext(ActionContext) || {};
  const { projectid } = useParams();
  const { user, setUser } = useUser();
  const [userIsOwner, setUserIsOwner] = useState(false);
  
  const getProjectData = async (projectid) => {
    console.log("hereyeyeyegbe");
    try {
        const response = await fetch(`${BACKEND_URL}project/${projectid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // Include credentials for session management
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json(); 
        setUserIsOwner(data.owner === user._id || data.users.includes(user._id))
        console.log(userIsOwner)
    } catch (err) {
        console.log(err); // Capture and set the error
    }
  };
  
    getProjectData(projectid);
  
 

  const [userprompts, setUserprompts] = useState([]);
  const [aimessage, setAimessage] = useState([]);

  const [generatedHTML, setGeneratedHTML] = useState(
    `<!DOCTYPE html><html>
      <head>
        <style>
          body {
              margin: 0;
              overflow: hidden; /* Prevents scrolling */
              display: flex;
              justify-content: center;
              align-items: center;
          }

          .background-svg {
              position: absolute;
              width: 80vw; /* Adjust size relative to viewport */
              height: 80vh;
              left:25%;
              top:30%;
              opacity: 0.3; /* Light transparency for background effect */
              z-index: -5; /* Sends behind other elements */
          }
        </style>
      </head>
      <body>
        <svg class="background-svg" aria-hidden="true" focusable="false" 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
          <style>
              path {
                  fill: #6366f1;
              }
          </style>
          <path fill="currentColor" d="M248 106.6c18.9-9 32-28.3 32-50.6c0-30.9-25.1-56-56-56s-56 25.1-56 56c0 22.3 13.1 41.6 32 50.6l0 98.8c-2.8 1.3-5.5 2.9-8 4.7l-80.1-45.8c1.6-20.8-8.6-41.6-27.9-52.8C57.2 96 23 105.2 7.5 132S1.2 193 28 208.5c1.3 .8 2.6 1.5 4 2.1l0 90.8c-1.3 .6-2.7 1.3-4 2.1C1.2 319-8 353.2 7.5 380S57.2 416 84 400.5c19.3-11.1 29.4-32 27.8-52.8l50.5-28.9c-11.5-11.2-19.9-25.6-23.8-41.7L88 306.1c-2.6-1.8-5.2-3.3-8-4.7l0-90.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-.1 1.4-.2 2.8-.2 4.3c0 22.3 13.1 41.6 32 50.6l0 98.8c-18.9 9-32 28.3-32 50.6c0 30.9 25.1 56 56 56s56-25.1 56-56c0-22.3-13.1-41.6-32-50.6l0-98.8c2.8-1.3 5.5-2.9 8-4.7l80.1 45.8c-1.6 20.8 8.6 41.6 27.8 52.8c26.8 15.5 61 6.3 76.5-20.5s6.3-61-20.5-76.5c-1.3-.8-2.7-1.5-4-2.1l0-90.8c1.4-.6 2.7-1.3 4-2.1c26.8-15.5 36-49.7 20.5-76.5S390.8 96 364 111.5c-19.3 11.1-29.4 32-27.8 52.8l-50.6 28.9c11.5 11.2 19.9 25.6 23.8 41.7L360 205.9c2.6 1.8 5.2 3.3 8 4.7l0 90.8c-2.8 1.3-5.5 2.9-8 4.6l-80.1-45.8c.1-1.4 .2-2.8 .2-4.3c0-22.3-13.1-41.6-32-50.6l0-98.8z">
          </path>
        </svg>
      </body>
    </html>`
  ); // State for generated code

  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [fileName, setFileName] = useState("html");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [generatedJS, setGeneratedJS] = useState("");
  const [generatedText, setGeneratedText] = useState("")
  const [deployedCode, setDeployedCode] = useState('');


  const previousPrompts = [
    {
      prompt: "hi",
      response: "hi"
    }
  ];


  let parsedData;
  useEffect(() => {
    const data = localStorage.getItem('firstprompt');

    if (data) {
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      const prompt_area = document.querySelector('#prompt-area');
      if (parsedData.prompt) {
        prompt_area.innerHTML = parsedData.prompt;
        console.log("Prompt taken from local storage");
        setPrompt(parsedData.prompt);
      }

      // Clear local storage after using the data
      localStorage.removeItem('firstprompt');
    } else {
      // If no data is found, set prompt area to empty
      const prompt_area = document.querySelector('#prompt-area');
      prompt_area.innerHTML = '';
      setPrompt('');
    }
  }, []);

  useEffect(() => {
    Prism.highlightAll(); // Applies syntax highlighting to all <code> elements
  }, [generatedHTML, generatedCSS, generatedJS]);
  const highlightCode = React.useCallback(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);
  const handleClick = (type) => {
    setFileName(type);
    setTimeout(highlightCode, 0);
  };

  const iframeRef = useRef(null);
  const downloadHtmlContent = () => {
    // Get the content of the iframe document
    const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

    if (!iframeDocument) {
      console.error("Unable to access iframe content.");
      return;
    }

    // Get the updated HTML content of the iframe
    const updatedHtml = `
      <!DOCTYPE html>
      <html>
        ${iframeDocument.documentElement.innerHTML}
      </html>
    `;

    // Optionally clean the updated HTML (e.g., remove the script tag)
    const cleanedCode = updatedHtml.replace(
      /<script[^>]*id="draggable-script"[\s\S]*?<\/script>/s,
      ""
    );


    console.log("Cleaned code after removing the draggable script:", cleanedCode);

    // Create a Blob with the HTML content
    const blob = new Blob([cleanedCode], { type: "text/html" });

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);

    // Set a default filename
    downloadLink.download = "downloaded_page.html";

    // Append to body and trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };

  const onActionBtn = (action) => {
    if (setAction) {

      setAction({
        actionType: action,
        timeStamp: Date.now()
      });
      console.log(action);

    } else {
      console.error("setAction is not defined");
    }
    const iframeDocument = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

    if (!iframeDocument) {
      console.error("Unable to access iframe content.");
      return;
    }

    // Get the updated HTML content of the iframe
    const updatedHtml = `
      <!DOCTYPE html>
      <html>
        ${iframeDocument.documentElement.innerHTML}
      </html>
    `;

    // Optionally clean the updated HTML (e.g., remove the script tag)
    const cleanedCode = updatedHtml.replace(
      /<script[^>]*id="draggable-script"[\s\S]*?<\/script>/s,
      ""
    );
    console.log("Deployable code after removing the draggable script:", cleanedCode);
    setDeployedCode(cleanedCode);
  };

  const draggableScript = `document.addEventListener('DOMContentLoaded', () => {
    const layout = document.getElementById('layout');
    let dragline = 'vertical';

    function updateHTML(){
        const html = layout.innerHTML;
        console.log(html);
    }

    function initializeDraggable(element) {
        element.setAttribute('draggable', true);

        element.addEventListener('dragstart', (e) => {  
            e.stopPropagation(); 
            e.dataTransfer.setData('text/plain', e.target.id);
            e.dataTransfer.effectAllowed = 'move';
            element.classList.add('dragging');
            dragline = element.classList.contains('horizontal') ? 'horizontal' : 'vertical';
        });

        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });

        element.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const draggingElement = document.querySelector('.dragging');
            if (!draggingElement || draggingElement === element) return;

            const bounding = element.getBoundingClientRect();
            const offset = dragline === 'vertical'
                ? e.clientY - bounding.top
                : e.clientX - bounding.left;

            if (offset > (dragline === 'vertical' ? bounding.height : bounding.width) / 2) {
                element.after(draggingElement);
            } else {
                element.before(draggingElement);
            }
        });

        element.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const draggingElement = document.querySelector('.dragging');
  if (draggingElement && !draggingElement.contains(element)) { // Prevent circular relationship
    element.appendChild(draggingElement);
    element.style.border = 'none';
  } else {
    console.error('Cannot append an element to itself or its child.');
  }
        });

        element.addEventListener('dragleave', () => {
            element.style.border = 'none';
        });
    }

    function setupEmptyDivStyling() {
        document.querySelectorAll('.draggable').forEach((element) => {
            if (element.childElementCount === 0) {
                element.style.minHeight = '50px';
                element.style.backgroundColor = '#e9ecef';
                element.style.border = '2px dashed #dee2e6';
            }

            element.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggingElement = document.querySelector('.dragging');
                if (draggingElement && draggingElement !== element) {
                    element.style.border = '2px dashed #007bff';
                }
            });

            element.addEventListener('drop', (e) => {
                e.preventDefault();
                const draggingElement = document.querySelector('.dragging');
                if (draggingElement && draggingElement !== element) {
                    element.appendChild(draggingElement);
                    element.style.border = 'none';
                    element.style.backgroundColor = 'transparent';
                }
                updateHTML();
            });

            element.addEventListener('dragleave', () => {
                element.style.border = '2px dashed #dee2e6';
            });
        });
    }

    // Initialize all draggable elements
    document.querySelectorAll('.draggable').forEach(initializeDraggable);
    setupEmptyDivStyling();
})`
  function injectContentIntoHTML(htmlCode, cssCode, jsCode, draggableScript) {
    // First, ensure we have a valid HTML structure
    if (!htmlCode.includes('</head>') || !htmlCode.includes('</body>')) {
      // Create basic HTML structure if missing
      htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Generated Page</title>
           <style>
  </style>
      </head>
      <body>
          ${htmlCode}
      </body>
      </html>`;
    }

    // Inject CSS into head
    const headCloseIndex = htmlCode.toLowerCase().indexOf('</head>');
    const styleTag = `<style>\n${cssCode}\n</style>\n`;
    htmlCode = htmlCode.slice(0, headCloseIndex) + styleTag + htmlCode.slice(headCloseIndex);

    // Inject JavaScript just before closing body tag
    const bodyCloseIndex = htmlCode.toLowerCase().indexOf('</body>');
    const scriptTag = `<script>\n${jsCode}\n</script>\n`;
    const draggable = `<script id="draggable-script">\n${draggableScript}\n</script>\n`;
    htmlCode = htmlCode.slice(0, bodyCloseIndex) + draggable + htmlCode.slice(bodyCloseIndex);
    htmlCode = htmlCode.slice(0, bodyCloseIndex) + scriptTag + htmlCode.slice(bodyCloseIndex);

    return htmlCode;
  }

  const [loading, setLoading] = useState(false);

  // Function to handle prompt submission
  const handlePromptSubmit = async (e) => {
    setLoading(true);
    e.preventDefault(); // Prevents the default form submission behavior
    setPrompt(" ");
    console.log("Form submitted with prompt:", prompt);
    setUserprompts((prevPrompts) => [...prevPrompts, prompt]);
    // Simulate fetching generated code from backend (replace this with your API call)
    try {
      // console.log(parsedData.PID);
      const response = await fetch(`${BACKEND_URL}chat/${projectid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({
          message: prompt,
          route: window.location.pathname  // Add route to the body
        })
      })

      const data = await response.json();
      console.log('Response from backend:', data);

      let text = data.content[0].text;
      console.log("Raw text before parsing-", text)
      const object_data = JSON.parse(text)

      
      setAimessage((prevMessages) => [...prevMessages, object_data.explanation]);

      setGeneratedText(object_data['explanation'])
      setGeneratedHTML(object_data['html'])
      setGeneratedCSS(object_data['css'])
      setGeneratedJS(object_data['js'])

    } catch (error) {
      console.log('Error While fetching:', error);
    } finally{
      setLoading(false)
    }

  };

  const getAIResponse = async () => {
    setLoading(true);
    const response = await fetch(`${BACKEND_URL}chat/getchat/${projectid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials for session management
    });


    try {

      const data = await response.json();
      console.log("Previous ai response from database:", data)
      const chats = data.chats
      console.log("Chat history of this project:", chats)
      const latest_code_json_string = chats[chats.length - 1].airesponse
      const latest_code = JSON.parse(latest_code_json_string)
      console.log("latest code:", latest_code_json_string)
      // ProjectStructure=latest_code;
      // setProjectStructure(latest_code);
      setLoading(false);
      setGeneratedText(latest_code['explanation'])
      setGeneratedHTML(latest_code['html'])
      setGeneratedCSS(latest_code['css'])
      setGeneratedJS(latest_code['js'])

      chats.forEach((element) => {
        setUserprompts((prevPrompts) => [...prevPrompts, element.userprompt]);
        setAimessage((prevMessages) => [...prevMessages, element.text]);
      })

    } catch (e) {
      console.log("there is no previous chat in backend", e)
    } finally{
      setLoading(false);
    }

  }
  useEffect(() => {
    getAIResponse();
  }, []);


  const displayCode = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS, draggableScript);
  const displayCodedeploy = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS);
  const downloadableCode = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS, '');
  console.log("This is the code that will be given to the iframe:", displayCode);

  const toggleView = () => {
    if (showCode) {
      setShowCode(false);
    }
    else {
      setShowCode(true);
      setTimeout(highlightCode, 0);
    }
  };

  const parentRef = useRef(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  // Use ResizeObserver to track size changes of the parent container
  try {
    useEffect(() => {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setParentSize({ width, height });
        }
      });
      // Start observing the parent container
      if (parentRef.current) {
        observer.observe(parentRef.current);
      }
      // Clean up the observer when component unmounts
      return () => {
        if (parentRef.current) {
          observer.unobserve(parentRef.current);
        }
      };
    }, []);
  } catch (err) {
    console.log("Browser Minimized");
  }

  const copyProject = async () => {
    console.log("copy is hit");
    console.log(user);
    console.log(projectid);
    console.log(typeof projectid);  // Logs the type of projectid

    
    try {
      const response = await fetch(`${BACKEND_URL}project/copy/`+projectid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }), // Fixed typo and stringified body
        credentials: "include", // Include credentials for session management
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Project copied:", data);
  
      // Redirect to /main/react/{project_id} if response contains a valid ID
      if (data.project && data.project._id) {
        window.location.href = `/main/react/${data.project._id}`;
      } else {
        console.error("Project ID missing in response");
      }
  
    } catch (error) {
      console.error("Error copying project:", error);
    }
  };
  

  return (
    <div className="flex flex-col-reverse md:flex-row h-screen w-full text-white bg-gray-900">
      {/* Left Panel - Full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen p-4 md:p-6 border-b md:border-r border-gray-700 bg-gray-900 flex flex-col">
        {/* Previous Prompts Section - Adjusted height for mobile */}
        <div className="flex-grow h-[65%] md:h-[70%] overflow-y-scroll p-2 md:p-3 mb-4 rounded-lg bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] border border-indigo-400/20 shadow-2xl shadow-black/40">
          <div className="flex gap-2 text-lg md:text-xl font-semibold">
            <div>
              <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
            <div>Response History</div>
          </div>
          {userprompts.map((prompt, index) => (
            <div key={index} className="mb-3">
              {/* User Prompt - Adjusted for better mobile display */}
              <div className="flex justify-end max-h-40 md:max-h-52 mt-3">
                <div className="bg-indigo-500 text-white px-3 md:px-4 py-2 rounded-lg max-w-[90%] md:max-w-[80%] overflow-y-auto text-sm md:text-base">
                  {prompt}
                </div>
              </div>

              {/* AI Response - Adjusted for better mobile display */}
              {aimessage[index] && (
                <div className="flex justify-start max-h-40 md:max-h-52 mt-3">
                  <div className="bg-gray-700 text-white px-3 md:px-4 py-2 rounded-lg max-w-[90%] md:max-w-[80%] overflow-y-auto text-sm md:text-base">
                    {aimessage[index]}
                  </div>
                </div>
              )}
            </div>
          ))}
          {loading && 
            <div className="flex justify-center my-4">
            <FontAwesomeIcon 
              icon={faHexagonNodes} 
              className="w-10 h-10 text-indigo-500 animate-spin"
              style={{ animationDuration: '1s' }}
            />
            </div>
          }
        </div>

        {/* Input Area - Adjusted for mobile */}
        <div className="flex flex-col items-end w-full h-[35%] md:h-[30%] bg-gray-800 border border-gray-600 rounded-lg">
          <textarea
            id="prompt-area"
            className="w-full h-[75%] md:h-[80%] p-2 md:p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none text-sm md:text-base"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter website description..."
          />
          
          { userIsOwner&&
            <button
            className="h-8 w-8 md:h-10 md:w-10 p-1.5 md:p-2 m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-md transition"
            onClick={handlePromptSubmit}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </button>}
        </div>
      </div>

      {/* Right Panel - Full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex flex-col bg-gray-900">
        {/* Navigation Tabs - Adjusted for mobile */}
        <nav className="flex flex-row justify-between p-1 md:p-2 border-b border-gray-700 h-[13%] md:h-[9%]">
          <div className="bg-gray-900 inline-flex rounded-full p-1 transition-colors duration-300 border border-gray-200/50">
            <button
              type="button"
              className={`flex items-center rounded-full px-2 md:px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 ${!showCode ? "bg-white text-gray-900 shadow-lg" : "bg-gray-900 text-white"}`}
              onClick={toggleView}
              aria-pressed={!showCode}
              disabled={!userIsOwner}
            >
              <FontAwesomeIcon
                icon={faWindowMaximize}
                className="mr-1 md:mr-2 text-xs md:text-sm"
              />
              <span className="hidden sm:inline">Preview</span>
              {!userIsOwner && <FontAwesomeIcon icon={faLock} className="ml-1 text-xs md:text-sm" />}
            </button>

            <button
              type="button"
              className={`flex items-center rounded-full px-2 md:px-3 py-1 text-xs md:text-sm font-medium transition-all duration-300 ${showCode ? "bg-white text-gray-900 shadow-lg" : "bg-gray-900 text-white"}`}
              onClick={toggleView}
              aria-pressed={showCode}
              disabled={!userIsOwner}
            >
              <FontAwesomeIcon
                icon={faCode}
                className="mr-1 md:mr-2 text-xs md:text-sm"
              />
              <span className="hidden sm:inline">Code</span>
              {!userIsOwner && <FontAwesomeIcon icon={faLock} className="ml-1 text-xs md:text-sm" />}
            </button>
          </div>

          {/* Action Buttons - Adjusted for mobile */}
          {
            userIsOwner?(
            <div className="flex flex-row gap-2 md:gap-3">
              <button className="relative group p-1 md:p-2 h-7 w-7 md:h-10 md:w-10 mt-1 rounded-full text-white ring-1 ring-slate-100/60"
                onClick={downloadHtmlContent}
              >
                <FontAwesomeIcon icon={faFileArrowDown} className="text-md md:text-xl" />
                <span className="absolute z-50 left-1/2 bottom-full mb-2 w-max -translate-x-1/2 scale-0 rounded bg-gray-700 text-white text-xs px-2 py-1 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                  Download
                </span>
              </button>

              <button className="relative group p-1 md:p-2 h-7 w-7 md:h-10 md:w-10 mt-1 rounded-full text-white ring-1 ring-slate-100/60"
                onClick={() => onActionBtn("deploy")}
              >
                <FontAwesomeIcon icon={faRocket} className="text-md md:text-xl" />
              </button>
            </div>
            ):(
              <div className="flex flex-row gap-2 md:gap-3">
                <button className="relative group p-1 md:p-2 h-7 w-7 md:h-10 md:w-10 mt-1 rounded-full text-white ring-1 ring-slate-100/60"
                  onClick={copyProject}
                >
                  <FontAwesomeIcon icon={faCopy} className="text-md md:text-xl" />
                </button>
              </div>
            )
          }
        </nav>

        {/* Content Area - Adjusted for mobile */}
        <div className="flex-grow p-2 md:p-4 h-[88%] md:h-[90%] bg-white" ref={parentRef}>
          {showCode ? (
            <div className="box-border h-full">
              <nav className="flex justify-start items-center space-x-1 md:space-x-2 mb-2">
                <button
                  className={`font-semibold inline-flex items-center justify-center p-1 md:p-2 border-transparent rounded-t-lg hover:border-gray-300 min-w-8 md:min-w-12 group text-xs md:text-base ${fileName === "html" ? "bg-orange-600 text-white" : "text-orange-600"} border border-blue-600`}
                  onClick={() => handleClick("html")}
                >
                  <FontAwesomeIcon icon={faHtml5} className="h-5 w-5 md:h-7 md:w-7 mx-1 md:mx-2" /> HTML
                </button>
                <button
                  className={`font-semibold inline-flex items-center justify-center p-1 md:p-2 border-transparent rounded-t-lg hover:border-gray-300 min-w-8 md:min-w-12 group text-xs md:text-base ${fileName === "css" ? "bg-[#2965f1] text-white" : "text-[#2965f1]"} border border-blue-600`}
                  onClick={() => handleClick("css")}
                >
                  <FontAwesomeIcon icon={faCss3Alt} className="h-5 w-5 md:h-7 md:w-7 mx-1 md:mx-2" /> CSS
                </button>
                <button
                  className={`font-semibold inline-flex items-center justify-center p-1 md:p-2 border-transparent rounded-t-lg hover:border-gray-300 min-w-8 md:min-w-12 group text-xs md:text-base ${fileName === "js" ? "bg-[#f2db3d] text-white" : "text-[#f2db3d]"} border border-blue-600`}
                  onClick={() => handleClick("js")}
                >
                  <FontAwesomeIcon icon={faSquareJs} className="h-5 w-5 md:h-7 md:w-7 mx-1 md:mx-2" /> JS
                </button>
              </nav>
              <pre className="w-full h-[90%] p-2 m-0 border border-gray-600 rounded-lg bg-gray-800 text-white overflow-scroll text-sm md:text-base">
                <code className={`language-${fileName === "html" ? "markup" : "css"}`}>
                  {fileName === "html" ? generatedHTML : fileName === "css" ? generatedCSS : generatedJS}
                </code>
              </pre>
            </div>
          ) : (
            <ResizableBox
              className="relative w-full h-full border-[1.5px] border-zinc-600 border-solid bg-white rounded-md"
              width={parentSize.width}
              height={parentSize.height}
              minConstraints={[parentSize.width * 0.5, parentSize.height * 0.5]}
              maxConstraints={[parentSize.width, parentSize.height]}
              resizeHandles={["se"]}
              handle={
                <div className="absolute w-6 h-6 md:w-7 md:h-7 pl-1.5 md:pl-2 pt-1 bg-gray-800 bottom-0 right-0 cursor-se-resize rounded-ee-sm">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className="rotate-90 text-sm md:text-base" />
                </div>
              }
            >
              <Frame
                ref={iframeRef}
                initialContent={displayCode}
                className="w-full h-full border-0"
              />
            </ResizableBox>
          )}
        </div>
      </div>
    </div>
  );

};
export default MainPagePlain;