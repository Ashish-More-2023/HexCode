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

import { Sandpack, SandpackProvider, useSandpack, SandpackLayout } from "@codesandbox/sandpack-react";
import SandpackPreviewClient2 from './SandpackPreviewClient2';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered, faCode, faWindowMaximize, faWandMagicSparkles,
  faFileArrowDown, faRocket, faFloppyDisk, faUpRightAndDownLeftFromCenter
}
  from "@fortawesome/free-solid-svg-icons";
import { faReact, faHtml5, faCss3Alt, faSquareJs } from "@fortawesome/free-brands-svg-icons";


const MainPagePlain = () => {
  // Define states
  const [prompt, setPrompt] = useState(""); // State for user input
  const { action, setAction } = useContext(ActionContext) || {};
  const { projectid } = useParams();
  console.log(projectid);

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
  const [projectID, setProjectID] = useState('');
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
    ::-webkit-scrollbar {
      width: 1px;
    }

    ::-webkit-scrollbar-thumb {
      background: #6366F1;
      border-radius: 20px;
    }
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
  // Function to handle prompt submission
  const handlePromptSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setPrompt(" ");
    console.log("Form submitted with prompt:", prompt);
    setUserprompts((prevPrompts) => [...prevPrompts, prompt]);
    // Simulate fetching generated code from backend (replace this with your API call)
    try {
      // console.log(parsedData.PID);
      const response = await fetch(`http://localhost:5000/chat/${projectID}`, {
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
    }

  };

  const getAIResponse = async () => {

    const response = await fetch(`http://localhost:5000/chat/getchat/${projectid}`, {
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

  const minLeftWidth = 55;
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const [{ rightWidth }, api] = useSpring(() => ({ rightWidth: minLeftWidth }));
  const bind = useDrag(({ movement: [mx], offset: [ox], dragging }) => {
    setIsDragging(dragging);
    const containerWidth = containerRef.current?.clientWidth || window.innerWidth;
    const newRightWidth = minLeftWidth - (ox / containerWidth) * 100;
    const clampedRightWidth = Math.max(minLeftWidth, Math.min(70, newRightWidth));
    api.start({
      rightWidth: clampedRightWidth,
      immediate: dragging,
    });
  });


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

  return (
    <div ref={containerRef}
      className="flex h-screen w-full text-white bg-gray-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left Panel */}
      <animated.div
        className="w-1/2 p-6 border-r border-gray-700 bg-gray-900 flex flex-col"
        style={{ width: rightWidth.to(rw => `${100 - rw}%`) }}>
        {/* Previous Prompts Section */}
        <div className="flex-grow h-[70%] overflow-y-auto p-3 mb-4 rounded-lg bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] border border-indigo-400/20 shadow-2xl shadow-black/40">
          <div className="flex gap-2 text-xl font-semibold">
            <div>
              <FontAwesomeIcon icon={faBarsStaggered} />
            </div>
            <div>
              Response History
            </div>
          </div>
          {userprompts.map((prompt, index) => (
            <div key={index} className="mb-3">
              {/* User Prompt */}
              <div className="flex justify-end">
                <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-[80%]">
                  {prompt}
                </div>
              </div>

              {/* AI Response */}
              {aimessage[index] && (
                <div className="flex justify-start mt-1">
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-[80%]">
                    {aimessage[index]}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex flex-col items-end w-full h-[30%]  bg-gray-800 border border-gray-600 rounded-lg'>
          <textarea
            id="prompt-area"
            className="w-full h-[80%] p-3 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none resize-none"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter website description..."
          />
          <button
            className="h-10 w-10 p-2 m-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full shadow-md transition"
            onClick={handlePromptSubmit}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </button>
        </div>
      </animated.div>

      {/* Draggable divider (visible only on hover) */}
      <animated.div
        {...bind()}
        className="w-2 bg-slate-600 cursor-ew-resize transition-opacity duration-300"
        style={{ opacity: isDragging || hovered ? 1 : 0 }}
      />

      {/* Right Panel */}
      <animated.div className="w-1/2 flex flex-col bg-gray-900" style={{ width: rightWidth.to(rw => `${rw}%`) }}>
        {/* Navigation Tabs */}
        <nav className="flex flex-row justify-between p-2 border-b border-gray-700 h-[9%]">
          <div
            className="bg-gray-900 inline-flex rounded-full p-1 transition-colors duration-300 border border-gray-200/50"
            role="group"
          >
            <button
              type="button"
              className={`flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${!showCode ? "bg-white text-gray-900 shadow-lg" : "bg-gray-900 text-white"}`}
              onClick={toggleView}
              aria-pressed={!showCode}
            >
              <FontAwesomeIcon
                icon={faWindowMaximize}
                className="mr-2 mt-[0.2rem] text-xs md:text-sm"
              />
              <span className="hidden sm:inline">Preview</span>
            </button>

            <button
              type="button"
              className={`flex items-center rounded-full px-3 py-1 text-sm font-medium transition-all duration-300 ${showCode ? "bg-white text-gray-900 shadow-lg" : "bg-gray-900 text-white"}`}
              onClick={toggleView}
              aria-pressed={showCode}
            >
              <FontAwesomeIcon
                icon={faCode}
                className="mr-2 mt-[0.2rem] text-xs md:text-sm"
              />
              <span className="hidden sm:inline">Code</span>
            </button>
          </div>
          <div className='flex flex-row gap-3'>
            <button className="relative group p-2 h-10 w-10 mt-1 rounded-full text-white ring-1 ring-slate-100/60"
              onClick={downloadHtmlContent}
            >
              <FontAwesomeIcon icon={faFileArrowDown} className="text-xl" />
              <span className="absolute z-50 left-1/2 bottom-full mb-2 w-max -translate-x-1/2 
                       scale-0 rounded bg-gray-700 text-white text-xs px-2 py-1 
                       opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                Download
              </span>
            </button>

            <button className="relative group p-2 h-10 w-10 mt-1 rounded-full text-white ring-1 ring-slate-100/60"
            >
              <FontAwesomeIcon icon={faFloppyDisk} className="text-xl" />
              <span className="absolute z-50 left-1/2 bottom-full mb-2 w-max -translate-x-1/2 
                       scale-0 rounded bg-gray-700 text-white text-xs px-2 py-1 
                       opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                Save Changes
              </span>
            </button>

            <button className="relative group p-2 h-10 w-10 mt-[0.35rem] rounded-full text-white ring-1 ring-slate-100/60"
              onClick={() => onActionBtn("deploy")}
            >
              <FontAwesomeIcon icon={faRocket} className="text-xl" />
              <span className="absolute z-50 left-1/2 bottom-full mb-2 w-max -translate-x-1/2 
                       scale-0 rounded bg-gray-700 text-white text-xs px-2 py-1 
                       opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                Deploy
              </span>
            </button>
          </div>
        </nav>

        {/* Generated Website or Code */}
        <div className="flex-grow  p-4 h-[90%] bg-white" ref={parentRef}>
          {showCode ? (
            <div className="box-border overflow-hidden h-full">

              <nav className="flex justify-start items-center space-x-2 mb-2">
                <button
                  className={`font-semibold inline-flex items-center justify-center p-2  border-transparent rounded-t-lg hover:border-gray-300 min-w-12 group ${fileName === "html" ? "bg-orange-600 text-whit" : "text-orange-600"} border border-blue-600`}
                  onClick={() => handleClick("html")}
                >
                  <FontAwesomeIcon icon={faHtml5} className='h-7 w-7 mx-2' /> HTML
                </button>
                <button
                  className={`font-semibold inline-flex items-center justify-center p-2  border-transparent rounded-t-lg hover:border-gray-300 min-w-12 group ${fileName === "css" ? "bg-[#2965f1] text-white" : "text-[#2965f1]"} border border-blue-600`}
                  onClick={() => handleClick("css")}
                >
                  <FontAwesomeIcon icon={faCss3Alt} className='h-7 w-7 mx-2' />
                  CSS
                </button>
                <button
                  className={`font-semibold inline-flex items-center justify-center p-2  border-transparent rounded-t-lg hover:border-gray-300 min-w-12 group ${fileName === "js" ? "bg-[#f2db3d] text-white" : "text-[#f2db3d]"} border border-blue-600`}
                  onClick={() => handleClick("js")}
                >
                  <FontAwesomeIcon icon={faSquareJs} className='h-7 w-7 mx-2' />Javascript
                </button>
              </nav>
              <pre className="w-full h-[92%] p-2 m-0 border border-gray-600 rounded-lg bg-gray-800 text-white overflow-scroll">
                <code className={`language-${fileName === "html" ? "markup" : "css"}`}>
                  {fileName === "html" ? generatedHTML : fileName === "css" ? generatedCSS : generatedJS}
                </code>
              </pre>
            </div>
          ) : (
            <ResizableBox
              className="relative w-full h-full border-[1.5px] border-zinc-600 border-solid bg-white rounded-md"
              width={parentSize.width * 0.95}  // Add a starting width
              height={parentSize.height * 0.95} // Add a starting height
              minConstraints={[parentSize.width * 0.5, parentSize.height * 0.5]}
              maxConstraints={[parentSize.width, parentSize.height]}
              resizeHandles={["se"]}
              handle={
                <div className="absolute w-7 h-7 pl-2 pt-1 bg-gray-800 bottom-0 right-0 cursor-se-resize rounded-ee-sm">
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} className='rotate-90' />
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

          <div style={{ opacity: 0 }}>
            <SandpackProvider
              template="react"
              files={{
                "public/index.html": {
                  code: displayCodedeploy,
                  active: true
                },
                "/index.js": {
                  code: "",
                  active: true
                }

              }}
              options={{
                showNavigator: true,
                showLineNumbers: true,
                closableTabs: true,
                activeFile: "/index.html",
              }}
            >
              <SandpackLayout className="h-full bg-gray-900">
                <SandpackPreviewClient2 />
              </SandpackLayout>
            </SandpackProvider>
          </div>


        </div>
      </animated.div>
    </div>
  );

};
export default MainPagePlain;