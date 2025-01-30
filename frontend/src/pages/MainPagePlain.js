import '../App.css';
import React,{useState,useEffect,useRef} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import Frame from 'react-frame-component';
import { ResizableBox } from 'react-resizable';
const MainPagePlain = () => {
  // Define states
  const [prompt, setPrompt] = useState(""); // State for user input
  const [generatedHTML, setGeneratedHTML] = useState(
    "<!DOCTYPE html><html><head></head><body><h1>Generated Website</h1></body></html>"
  ); // State for generated code
  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [fileName,setFileName] = useState("html");
  const [generatedCSS, setGeneratedCSS] = useState("");
  const [generatedJS, setGeneratedJS] = useState("");
  const [projectID,setProjectID] = useState('');
  const previousPrompts = [
    {
      prompt : "hi",
      response: "hi"
    }
  ];


  let parsedData;
    useEffect(()=>{
        const data = localStorage.getItem('firstprompt');
        parsedData = JSON.parse(data);
        console.log(parsedData);
        const prompt_area = document.querySelector('#prompt-area')
        prompt_area.innerHTML=parsedData.prompt;
        setPrompt(parsedData.prompt);
        setProjectID(parsedData.PID);
      },[]);

  useEffect(() => {
    Prism.highlightAll(); // Applies syntax highlighting to all <code> elements
  }, [generatedHTML, generatedCSS,generatedJS]);
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
    function injectContentIntoHTML(htmlCode, cssCode, jsCode,draggableScript) {
        // First, ensure we have a valid HTML structure
        if (!htmlCode.includes('</head>') || !htmlCode.includes('</body>')) {
          // Create basic HTML structure if missing
          htmlCode = `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>Generated Page</title>
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
    console.log("Form submitted with prompt:", prompt);
    // Simulate fetching generated code from backend (replace this with your API call)
    try{
        console.log(parsedData.PID);
        const response = await fetch(`http://localhost:5001/chat/${projectID}`,{
            method : 'POST',
            headers : {
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
        console.log("Raw text before parsing-",text)
        
        const matches = text.match(/{\s*"html":\s*`([\s\S]*?)`\s*,\s*"css":\s*`([\s\S]*?)`\s*,\s*"js":\s*`([\s\S]*?)`\s*}/);

if (matches) {
    const [_, htmlContent, cssContent,jsContent] = matches;
    
    // Create a new object with properly escaped content
    var object_data = {
        html: htmlContent,
        css: cssContent,
        js: jsContent
    };
    
    // Now you can use the processed data directly without JSON.parse
    console.log("This is the object with html and css:", object_data);
} else {
    console.error("Could not extract HTML and CSS content");
}
        
        setGeneratedHTML(object_data['html'])
        setGeneratedCSS(object_data['css'])
        setGeneratedJS(object_data['js'])
        
    }catch(error){
        console.log('Error While fetching:',error);
    }

  };
  const displayCode = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS, draggableScript);
  const downloadableCode = injectContentIntoHTML(generatedHTML, generatedCSS, generatedJS, '');
  console.log("This is the code that will be given to the iframe:",displayCode)
  return (
    <div className="flex h-screen w-screen text-white bg-gray-900">
      {/* Left Panel */}
      <div className="w-1/2 p-6 border-r border-gray-700 bg-gray-800 flex flex-col">
        {/* Previous Prompts Section */}
        <div className="flex-grow max-h-64 overflow-y-auto p-3 mb-4 border border-gray-700 rounded-lg bg-gray-900">
          {previousPrompts.map((entry, index) => (
            <div key={index} className="mb-3">
              {/* User Prompt */}
              <div className="flex justify-end">
                <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-[80%]">
                  {entry.prompt}
                </div>
              </div>

              {/* AI Response */}
              {entry.response && (
                <div className="flex justify-start mt-1">
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-[80%]">
                    {entry.response}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <textarea
          id="prompt-area"
          className="w-full h-64 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter website description..."
        />
        <button 
          className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition"
          onClick={handlePromptSubmit}
        >
          Generate Website
        </button>
      </div>
  
      {/* Right Panel */}
      <div className="w-1/2 flex flex-col bg-gray-900">
        {/* Navigation Tabs */}
        <nav className="flex space-x-4 p-4 border-b border-gray-700">
          <button
            className={`py-2 px-6 rounded-md font-medium transition ${!showCode ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"} border border-blue-600`}
            onClick={() => setShowCode(false)}
          >
            View Website
          </button>
          <button
            className={`py-2 px-6 rounded-md font-medium transition ${showCode ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"} border border-blue-600`}
            onClick={() => {setShowCode(true); setTimeout(highlightCode, 0);}}
          >
            View Code
          </button>
          <button
            className="py-2 px-6 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white border border-blue-600"
            onClick={downloadHtmlContent}
          >
            Download Code
          </button>
        </nav>
  
        {/* Generated Website or Code */}
        <div className="flex-grow bg-gray-900 p-4">
          {showCode ? (
            <div className="box-border overflow-scroll max-h-full">
              <nav className="flex justify-start items-center space-x-2 mb-2">
                <button
                  className={`py-2 px-4 rounded-md ${fileName === "html" ? "bg-indigo-500 text-white" : "text-blue-400"} border border-blue-600`}
                  onClick={() => handleClick("html")}
                >
                  HTML
                </button>
                <button
                  className={`py-2 px-4 rounded-md ${fileName === "css" ? "bg-indigo-500 text-white" : "text-blue-400"} border border-blue-600`}
                  onClick={() => handleClick("css")}
                >
                  CSS
                </button>
                <button
                  className={`py-2 px-4 rounded-md ${fileName === "js" ? "bg-indigo-500 text-white" : "text-blue-400"} border border-blue-600`}
                  onClick={() => handleClick("js")}
                >
                  JavaScript
                </button>
              </nav>
              <pre className="w-full h-full p-2 m-0 border border-gray-600 rounded-lg bg-gray-800 text-white overflow-scroll">
                <code className={`language-${fileName === "html" ? "markup" : "css"}`}>
                  {fileName === "html" ? generatedHTML : fileName === "css" ? generatedCSS : generatedJS}
                </code>
              </pre>
            </div>
          ) : (
            <ResizableBox
              className="relative w-full h-full border-0"
              width={1200}
              height={700}
              minConstraints={[300, 200]}
              maxConstraints={[1200, 800]}
              resizeHandles={["se"]}
              handle={
                <div className="absolute w-5 h-5 bg-gray-600 bottom-0 right-0 cursor-se-resize z-10"></div>
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