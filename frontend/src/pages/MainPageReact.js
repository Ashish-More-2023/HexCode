'use client'

import React,{useState,useEffect,useContext} from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import { Sandpack,
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    SandpackFileExplorer,
   } from "@codesandbox/sandpack-react";
import { atomDark } from '@codesandbox/sandpack-themes';
import SandpackPreviewClient from './SandpackPreviewClient';
import { ActionContext } from './ActionContext'; // Updated import path



export default function MainPageReact({children}) {
  const { action, setAction } = useContext(ActionContext) || {};
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
  useEffect(()=>{
    getHistory();
  },[])

    // const previousPrompts = [
    //   {
    //     prompt : "hi",
    //     response: "A modern, responsive e-commerce website with product listing, cart functionality, and checkout process"
    //   }
    // ];
    const getHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5001/chat/getchat/${projectID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        });
    
        // Await the JSON parsing
        const data = await response.json(); 
        console.log("Previous prompts from backend:", data);
    
        
        const previousChatsArray = data.chats; 
        console.log(previousChatsArray);
        setPreviousPrompts(previousChatsArray)
        console.log(previousPrompts)
    
       
    
      } catch (e) {
        console.log("Error while fetching chat history:", e);
      }
    };
    

    
    const [previousPrompts,setPreviousPrompts] = useState([
        {
          prompt : "hi",
          response: "A modern, responsive e-commerce website with product listing, cart functionality, and checkout process"
        }
      ]);
    const [prompt, setPrompt] = useState('');
    const [projectID,setProjectID] = useState('');
    const [projectStructure, setProjectStructure] = useState({
      "projectTitle": "React E-commerce Website",
      "explanation": "A modern, responsive e-commerce website with product listing, cart functionality, and checkout process",
      "entryFilePath": "/App.js",
      "files": {
          "/App.js": {
              "code": "import React from 'react';\nimport { BrowserRouter as Router, Routes, Route } from 'react-router-dom';\nimport Navbar from './components/Navbar';\nimport Home from './pages/Home';\nimport Products from './pages/Products';\nimport Cart from './pages/Cart';\nimport ProductDetail from './pages/ProductDetail';\nimport './css/App.css';\n\nfunction App() {\n  return (\n    <Router>\n      <div className='App'>\n        <Navbar />\n        <Routes>\n          <Route path='/' element={<Home />} />\n          <Route path='/products' element={<Products />} />\n          <Route path='/product/:id' element={<ProductDetail />} />\n          <Route path='/cart' element={<Cart />} />\n        </Routes>\n      </div>\n    </Router>\n  );\n}\n\nexport default App;"
          },
          "/components/Navbar.js": {
              "code": "import React from 'react';\nimport { Link } from 'react-router-dom';\nimport '../css/Navbar.css';\n\nconst Navbar = () => {\n  return (\n    <nav className='navbar draggable horizontal'>\n      <div className='nav-brand draggable'>\n        <Link to='/'>EShop</Link>\n      </div>\n      <div className='nav-links draggable horizontal'>\n        <Link to='/' className='nav-link draggable'>Home</Link>\n        <Link to='/products' className='nav-link draggable'>Products</Link>\n        <Link to='/cart' className='nav-link draggable'>Cart</Link>\n      </div>\n    </nav>\n  );\n};\n\nexport default Navbar;"
          },
          "/components/ProductCard.js": {
              "code": "import React from 'react';\nimport { Link } from 'react-router-dom';\nimport '../css/ProductCard.css';\n\nconst ProductCard = ({ product }) => {\n  return (\n    <div className='product-card draggable vertical'>\n      <img src={product.image} alt={product.name} className='draggable'/>\n      <h3 className='draggable'>{product.name}</h3>\n      <p className='price draggable'>${product.price}</p>\n      <Link to={`/product/${product.id}`} className='view-btn draggable'>\n        View Details\n      </Link>\n    </div>\n  );\n};\n\nexport default ProductCard;"
          },
          "/pages/Home.js": {
              "code": "import React from 'react';\nimport { Link } from 'react-router-dom';\nimport '../css/Home.css';\n\nconst Home = () => {\n  return (\n    <div className='home draggable vertical'>\n      <div className='hero draggable vertical'>\n        <h1 className='draggable'>Welcome to EShop</h1>\n        <p className='draggable'>Discover amazing products at great prices</p>\n        <Link to='/products' className='shop-now-btn draggable'>\n          Shop Now\n        </Link>\n      </div>\n      <div className='features draggable horizontal'>\n        <div className='feature draggable vertical'>\n          <h3 className='draggable'>Free Shipping</h3>\n          <p className='draggable'>On orders over $50</p>\n        </div>\n        <div className='feature draggable vertical'>\n          <h3 className='draggable'>24/7 Support</h3>\n          <p className='draggable'>Get help anytime</p>\n        </div>\n        <div className='feature draggable vertical'>\n          <h3 className='draggable'>Easy Returns</h3>\n          <p className='draggable'>30-day return policy</p>\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default Home;"
          },
          "/pages/Products.js": {
              "code": "import React from 'react';\nimport ProductCard from '../components/ProductCard';\nimport '../css/Products.css';\n\nconst Products = () => {\n  const products = [\n    { id: 1, name: 'Smartphone', price: 699.99, image: 'https://via.placeholder.com/200' },\n    { id: 2, name: 'Laptop', price: 999.99, image: 'https://via.placeholder.com/200' },\n    { id: 3, name: 'Headphones', price: 149.99, image: 'https://via.placeholder.com/200' },\n    { id: 4, name: 'Smartwatch', price: 299.99, image: 'https://via.placeholder.com/200' }\n  ];\n\n  return (\n    <div className='products-page draggable vertical'>\n      <h2 className='draggable'>Our Products</h2>\n      <div className='products-grid draggable horizontal'>\n        {products.map(product => (\n          <ProductCard key={product.id} product={product} />\n        ))}\n      </div>\n    </div>\n  );\n};\n\nexport default Products;"
          },
          "/pages/ProductDetail.js": {
              "code": "import React from 'react';\nimport { useParams } from 'react-router-dom';\nimport '../css/ProductDetail.css';\n\nconst ProductDetail = () => {\n  const { id } = useParams();\n\n  const product = {\n    id: 1,\n    name: 'Smartphone',\n    price: 699.99,\n    image: 'https://via.placeholder.com/400',\n    description: 'A high-end smartphone with amazing features.'\n  };\n\n  return (\n    <div className='product-detail draggable vertical'>\n      <div className='product-info draggable horizontal'>\n        <img src={product.image} alt={product.name} className='draggable'/>\n        <div className='info-text draggable vertical'>\n          <h2 className='draggable'>{product.name}</h2>\n          <p className='price draggable'>${product.price}</p>\n          <p className='description draggable'>{product.description}</p>\n          <button className='add-to-cart-btn draggable'>Add to Cart</button>\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default ProductDetail;"
          },
          "/pages/Cart.js": {
              "code": "import React from 'react';\nimport '../css/Cart.css';\n\nconst Cart = () => {\n  const cartItems = [\n    { id: 1, name: 'Smartphone', price: 699.99, quantity: 1 }\n  ];\n\n  return (\n    <div className='cart-page draggable vertical'>\n      <h2 className='draggable'>Shopping Cart</h2>\n      <div className='cart-items draggable vertical'>\n        {cartItems.map(item => (\n          <div key={item.id} className='cart-item draggable horizontal'>\n            <h3 className='draggable'>{item.name}</h3>\n            <p className='draggable'>${item.price}</p>\n            <input type='number' value={item.quantity} min='1' className='draggable'/>\n            <button className='remove-btn draggable'>Remove</button>\n          </div>\n        ))}\n      </div>\n      <div className='cart-total draggable horizontal'>\n        <h3 className='draggable'>Total: $699.99</h3>\n        <button className='checkout-btn draggable'>Checkout</button>\n      </div>\n    </div>\n  );\n};\n\nexport default Cart;"
          },
          "/css/App.css": {
              "code": "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n.App {\n  font-family: Arial, sans-serif;\n  min-height: 100vh;\n  background-color: #f5f5f5;\n}\n\na {\n  text-decoration: none;\n  color: inherit;\n}"
          },
          "/css/Navbar.css": {
              "code": ".navbar {\n  background-color: #2c3e50;\n  padding: 1rem 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  color: white;\n}\n\n.nav-brand a {\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #ecf0f1;\n}\n\n.nav-links {\n  display: flex;\n  gap: 2rem;\n}\n\n.nav-link {\n  color: #ecf0f1;\n  transition: color 0.3s;\n}\n\n.nav-link:hover {\n  color: #3498db;\n}\n\n@media (max-width: 768px) {\n  .navbar {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n  }\n\n  .nav-links {\n    flex-direction: column;\n    gap: 1rem;\n  }\n}"
          },
          "/css/Home.css": {
              "code": ".home {\n  min-height: 90vh;\n}\n\n.hero {\n  background: linear-gradient(135deg, #2c3e50, #3498db);\n  color: white;\n  padding: 4rem 2rem;\n  text-align: center;\n}\n\n.hero h1 {\n  font-size: 2.5rem;\n  margin-bottom: 1rem;\n}\n\n.hero p {\n  font-size: 1.2rem;\n  margin-bottom: 2rem;\n}\n\n.shop-now-btn {\n  background-color: #e74c3c;\n  color: white;\n  padding: 1rem 2rem;\n  border-radius: 5px;\n  display: inline-block;\n  transition: background-color 0.3s;\n}\n\n.shop-now-btn:hover {\n  background-color: #c0392b;\n}\n\n.features {\n  display: flex;\n  justify-content: space-around;\n  padding: 4rem 2rem;\n  background-color: white;\n}\n\n.feature {\n  text-align: center;\n  padding: 1rem;\n}\n\n.feature h3 {\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n}\n\n@media (max-width: 768px) {\n  .features {\n    flex-direction: column;\n    gap: 2rem;\n  }\n}"
          },
          "/css/Products.css": {
              "code": ".products-page {\n  padding: 2rem;\n}\n\n.products-page h2 {\n  text-align: center;\n  color: #2c3e50;\n  margin-bottom: 2rem;\n}\n\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 2rem;\n  padding: 1rem;\n}\n\n@media (max-width: 768px) {\n  .products-grid {\n    grid-template-columns: 1fr;\n  }\n}"
          },
          "/css/ProductCard.css": {
              "code": ".product-card {\n  background-color: white;\n  border-radius: 8px;\n  padding: 1rem;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n  text-align: center;\n  transition: transform 0.3s;\n}\n\n.product-card:hover {\n  transform: translateY(-5px);\n}\n\n.product-card img {\n  width: 100%;\n  height: auto;\n  border-radius: 4px;\n  margin-bottom: 1rem;\n}\n\n.product-card h3 {\n  color: #2c3e50;\n  margin-bottom: 0.5rem;\n}\n\n.price {\n  color: #e74c3c;\n  font-weight: bold;\n  margin-bottom: 1rem;\n}\n\n.view-btn {\n  background-color: #3498db;\n  color: white;\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  display: inline-block;\n  transition: background-color 0.3s;\n}\n\n.view-btn:hover {\n  background-color: #2980b9;\n}"
          },
          "/css/ProductDetail.css": {
              "code": ".product-detail {\n  padding: 2rem;\n}\n\n.product-info {\n  display: flex;\n  gap: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n  background-color: white;\n  padding: 2rem;\n  border-radius: 8px;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n}\n\n.product-info img {\n  width: 50%;\n  height: auto;\n  border-radius: 8px;\n}\n\n.info-text {\n  flex: 1;\n}\n\n.info-text h2 {\n  color: #2c3e50;\n  margin-bottom: 1rem;\n}\n\n.info-text .price {\n  color: #e74c3c;\n  font-size: 1.5rem;\n  margin-bottom: 1rem;\n}\n\n.description {\n  color: #7f8c8d;\n  margin-bottom: 2rem;\n}\n\n.add-to-cart-btn {\n  background-color: #2ecc71;\n  color: white;\n  padding: 1rem 2rem;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.add-to-cart-btn:hover {\n  background-color: #27ae60;\n}\n\n@media (max-width: 768px) {\n  .product-info {\n    flex-direction: column;\n  }\n\n  .product-info img {\n    width: 100%;\n  }\n}"
          },
          "/css/Cart.css": {
              "code": ".cart-page {\n  padding: 2rem;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.cart-page h2 {\n  color: #2c3e50;\n  margin-bottom: 2rem;\n  text-align: center;\n}\n\n.cart-items {\n  background-color: white;\n  border-radius: 8px;\n  padding: 1rem;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n}\n\n.cart-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  border-bottom: 1px solid #ecf0f1;\n}\n\n.cart-item:last-child {\n  border-bottom: none;\n}\n\n.cart-item input {\n  width: 60px;\n  padding: 0.5rem;\n  border: 1px solid #bdc3c7;\n  border-radius: 4px;\n}\n\n.remove-btn {\n  background-color: #e74c3c;\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.remove-btn:hover {\n  background-color: #c0392b;\n}\n\n.cart-total {\n  margin-top: 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n  background-color: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n}\n\n.checkout-btn {\n  background-color: #2ecc71;\n  color: white;\n  border: none;\n  padding: 1rem 2rem;\n  border-radius: 4px;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.checkout-btn:hover {\n  background-color: #27ae60;\n}\n\n@media (max-width: 768px) {\n  .cart-item {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n  }\n\n  .cart-total {\n    flex-direction: column;\n    gap: 1rem;\n    text-align: center;\n  }\n}"
          }
      },
      "generatedFiles": [
          "/App.js",
          "/components/Navbar.js",
          "/components/ProductCard.js",
          "/pages/Home.js",
          "/pages/Products.js",
          "/pages/ProductDetail.js",
          "/pages/Cart.js",
          "/css/App.css",
          "/css/Navbar.css",
          "/css/Home.css",
          "/css/Products.css",
          "/css/ProductCard.css",
          "/css/ProductDetail.css",
          "/css/Cart.css"
      ]
  });
  // Define states
  const [showCode, setShowCode] = useState(false); // State for toggling between website/code views
  const [activeTab,setActiveTab] = useState("preview");

  const highlightCode = React.useCallback(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  const onActionBtn = (action) => {
    if (setAction) {
        setAction({
            actionType: action,
            timeStamp: Date.now()
        });
    } else {
        console.error("setAction is not defined");
    }
};

  // const handleClick = (type) => {
  //   setFileName(type);
  //   setTimeout(highlightCode, 0);
  // };

  const draggableScript = `   
            const layout = document.getElementById('layout');
            let dragline = 'vertical';
    
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
                    if (draggingElement) {
                        element.appendChild(draggingElement);
                        element.style.border = 'none';
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
                    });
    
                    element.addEventListener('dragleave', () => {
                        element.style.border = '2px dashed #dee2e6';
                    });
                });
            }
    
            // Initialize all draggable elements
            document.querySelectorAll('.draggable').forEach(initializeDraggable);
            setupEmptyDivStyling();
        `
    
  // Function to handle prompt submission
  const handlePromptSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    console.log("Form submitted with prompt:", prompt);
    // Simulate fetching generated code from backend (replace this with your API call)
    try{
      console.log(projectID);
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
        const project_string = data.content[0].text;
        const project_object = JSON.parse(project_string)
        console.log("Object given to Sandpack:",project_object)
        console.log("Entry file path:",project_object.entryFilePath)
        // const something = {
        //   PID:parsedData.PID,
        //   prompt:'',

        // }
        // localStorage.setItem('firstprompt',JSON.stringify(something));
        setProjectStructure(project_object);

//         let text = data.content[0].text;
//         console.log("Raw text before parsing-",text)
        
//         const matches = text.match(/{\s*"html":\s*`([\s\S]*?)`\s*,\s*"css":\s*`([\s\S]*?)`\s*}/);

// if (matches) {
//     const [_, htmlContent, cssContent] = matches;
    
//     // Create a new object with properly escaped content
//     var object_data = {
//         html: htmlContent,
//         css: cssContent
//     };
    
//     // Now you can use the processed data directly without JSON.parse
//     console.log("This is the object with html and css:", object_data);
// } else {
//     console.error("Could not extract HTML and CSS content");
// }
        
//         setGeneratedHTML(object_data['html'])
//         setGeneratedCSS(object_data['css'])
//         setGeneratedJS(object_data['js'])
        
    }catch(error){
        console.log('Error While fetching:',error);
    }

  };
  return (
  <div className="flex h-screen w-screen text-white">
    {/* Left Panel */}
    <div className="w-1/2 p-6 border-r border-gray-700 bg-gray-800 flex flex-col">
        {/* Previous Prompts Section */}
        <div className="flex-grow max-h-64 overflow-y-auto p-3 mb-4 border border-gray-700 rounded-lg bg-gray-900">
          {previousPrompts.map((entry, index) => (
            <div key={index} className="mb-3">
              {/* User Prompt */}
              <div className="flex justify-end">
                <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-[80%]">
                  {entry.userprompt}
                </div>
              </div>

              {/* AI Response */}
              {entry.airesponse && (
                <div className="flex justify-start mt-1">
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-lg max-w-[80%]">
                    {entry.userprompt}
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
    <div className="w-1/2 flex flex-col">
      {/* Navigation Tabs */}
      <nav className="flex space-x-4 p-4 border-b border-gray-700">
        <button
          className={`py-2 px-6 rounded-md font-medium transition ${activeTab === "preview" ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"}`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
        <button
          className={`py-2 px-6 rounded-md font-medium transition ${activeTab === "code" ? "bg-indigo-500 text-white" : "text-blue-400 hover:text-white"}`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
        <button
          className={"bg-indigo-500 text-white py-2 px-6" }
          onClick={() => onActionBtn("deploy")}
        >
          Deploy
        </button>
        <button
          className={"bg-indigo-500 text-white py-2 px-6" }
          onClick={() => onActionBtn("export")}
         
        >
          Export
        </button>
    
      </nav>

      {/* Sandpack Editor */}
      {projectStructure && (
        <SandpackProvider
          template="react"
          theme={atomDark}
          files={projectStructure.files}
          options={{
            showNavigator: true,
            showLineNumbers: true,
            closableTabs: true,
            activeFile: projectStructure.entryFilePath,
          }}
          customSetup={{
            dependencies: {
              "axios": "^1.7.9",
              "class-variance-authority": "^0.7.1",
              "clsx": "^2.1.1",
              "cra-template": "1.2.0",
              "dotenv": "^16.4.7",
              "lucide-react": "^0.471.1",
              "prism": "^4.1.2",
              "prismjs": "^1.29.0",
              "react": "^18.3.1",
              "react-dom": "^18.3.1",
              "react-draggable": "^4.4.6",
              "react-frame-component": "^5.2.7",
              "react-grid-layout": "^1.5.0",
              "react-resizable": "^3.0.5",
              "react-router-dom": "^7.1.2",
              "react-scripts": "5.0.1",
            },
            main: projectStructure.entryFilePath,
          }}
        >
          <SandpackLayout className="h-full bg-gray-900">
            {activeTab === "preview" ? (

              // <SandpackPreview style={{ height: '600px' }} showNavigator={true} />
              <SandpackPreviewClient />


            ) : (
              <div className="flex h-[600px]">
                <SandpackFileExplorer className="w-1/3 border-r border-gray-700" />
                <SandpackCodeEditor className="w-2/3" />
              </div>
            )}
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  </div>
);
};