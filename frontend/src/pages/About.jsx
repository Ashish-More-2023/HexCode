import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHexagonNodes,
  faCubesStacked,
  faListUl,
  faTimeline,
  faBullseye,
} from "@fortawesome/free-solid-svg-icons";

export default function CardLayout() {
  return (
    <div className="flex justify-center items-center min-h-screen text-black bg-gray-100 w-full box-border bg-transparent">
      <div className="w-full min-h-screen h-full shadow-lg box-border bg-transparent">
        {/* Responsive grid */}
        <div className="w-full h-full flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 p-4">
          {/* Left border */}
          <div className="hidden lg:block col-start-1 col-span-1 row-start-5 row-span-6 p-4 border-[0.8px] border-gray-500/70 border-s-0 rounded-tr-lg rounded-br-lg bg-white/5 bg-gradient-to-l from-white/10 to-transparent backdrop-blur-sm" />

          {/* Top-left box */}
          <div className="p-4 border-[0.8px] border-gray-500/70 border-t-0 rounded-bl-lg rounded-br-lg shadow-md bg-white/5 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm
                          col-span-1 sm:col-span-2 lg:col-start-2 lg:col-span-3 lg:row-start-1 lg:row-span-3" />

          {/* Key Features */}
          <div className="p-6 bg-white/10 backdrop-blur-lg shadow-md border-[0.8px] border-gray-500 rounded-lg text-white
                          col-span-1 sm:col-span-2 lg:col-start-2 lg:col-span-3 lg:row-start-4 lg:row-span-8">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 text-2xl font-sans mb-4">
                <FontAwesomeIcon icon={faListUl} />
                <span>Key Features</span>
              </div>

              <div className="px-4">
                <ul className="list-disc text-xl text-gray-400 flex flex-col gap-4">
                  <li>
                    <span className="font-semibold text-white">
                      Responsive Design
                    </span>
                    <p className="text-base mt-1">
                      Websites that adapt perfectly to all devices and screen
                      sizes.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Exportable Code
                    </span>
                    <p className="text-base mt-1">
                      Download full source code for custom hosting and further
                      development.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      One-Click Deploy
                    </span>
                    <p className="text-base mt-1">
                      Instantly launch websites with a simple deployment
                      process.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Seamless Collaboration
                    </span>
                    <p className="text-base mt-1">
                      Real-time team collaboration on website projects.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Drag & Drop Customization
                    </span>
                    <p className="text-base mt-1">
                      Intuitive interface for easy website layout and design
                      modifications.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Color Palette Selection
                    </span>
                    <p className="text-base mt-1">
                      Custom color schemes to match your brand identity.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom-left box */}
          <div className="p-4 border-[0.8px] border-gray-500/70 border-b-0 rounded-tr-lg rounded-tl-lg shadow-md bg-white/5 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm
                          col-span-1 sm:col-span-2 lg:col-start-2 lg:col-span-3 lg:row-start-12 lg:row-span-3" />

          {/* Top-center box */}
          <div className="p-4 border-[0.8px] border-gray-500/70 border-t-0 rounded-bl-lg rounded-br-lg shadow-md bg-white/5 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm
                          col-span-1 sm:col-span-2 lg:col-start-5 lg:col-span-4 lg:row-start-1 lg:row-span-1" />

          {/* TechStacks */}
          <div className="p-4 bg-white/10 backdrop-blur-lg shadow-md border-[0.8px] border-gray-500 rounded-lg text-white
                          col-span-1 sm:col-span-2 lg:col-start-5 lg:col-span-4 lg:row-start-2 lg:row-span-4">
            <div className="h-full">
              <div className="flex items-center gap-4 text-2xl font-sans mb-4">
                <FontAwesomeIcon icon={faCubesStacked} />
                <span>TechStacks</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-normal mb-2">FrontEnd</h3>
                  <div className="px-5">
                    <ul className="list-disc text-lg text-gray-400 flex flex-col gap-1">
                      <li>React</li>
                      <li>Tailwind CSS</li>
                      <li>SweetAlert2</li>
                      <li>Framer Motion</li>
                    </ul>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-normal mb-2">BackEnd</h3>
                  <div className="px-5">
                    <ul className="list-disc text-lg text-gray-400 flex flex-col gap-1">
                      <li>NodeJS</li>
                      <li>MongoDB</li>
                      <li>ExpressJS</li>
                      <li>Anthropic Claude API</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HexCode (centerpiece) */}
          <div className="flex flex-col justify-center items-center text-center p-4 rounded-lg text-white 
                          bg-gradient-to-br from-[#1A1A2E] to-[#0F3460] backdrop-blur-lg border border-indigo-400/60 shadow-2xl shadow-black/40
                          col-span-1 sm:col-span-2 lg:col-start-5 lg:col-span-4 lg:row-start-6 lg:row-span-4">
            <div className="font-semibold flex items-center">
              <FontAwesomeIcon
                icon={faHexagonNodes}
                className="mr-2 hidden md:w-20 md:h-20 md:inline text-indigo-500"
              />
              <span className="text-white font-normal text-5xl">HexCode</span>
            </div>
            <div className="text-gray-300 font-light">
              <p>
                Revolutionize your development workflow with AI-powered website
                generation. Create stunning, responsive designs with
                unprecedented speed and precision.
              </p>
            </div>
          </div>

          {/* Future Targets */}
          <div className="p-4 bg-white/10 backdrop-blur-lg shadow-md border-[0.8px] border-gray-500 rounded-lg text-white
                          col-span-1 sm:col-span-2 lg:col-start-5 lg:col-span-4 lg:row-start-10 lg:row-span-4">
            <div className="flex items-center gap-4 text-2xl font-sans mb-4">
              <FontAwesomeIcon icon={faBullseye} />
              <span>Future Targets</span>
            </div>
            <div className="text-gray-400">
              <p>
                Our vision is to build cutting-edge React applications that
                prioritize performance, scalability, and intuitive user
                experiences. We'll leverage advanced technologies to create
                faster, more adaptive web solutions that push the boundaries of
                modern development through continuous innovation and technical
                excellence.
              </p>
            </div>
          </div>

          {/* Bottom-center box */}
          <div className="p-4 border-[0.8px] border-gray-500/70 border-b-0 rounded-tr-lg rounded-tl-lg shadow-md bg-white/5 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm
                          col-span-1 sm:col-span-2 lg:col-start-5 lg:col-span-4 lg:row-start-14 lg:row-span-1" />

          {/* Top-right box */}
          <div className="p-4 border-[0.8px] border-gray-500/70 border-t-0 rounded-bl-lg rounded-br-lg shadow-md bg-white/5 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-sm
                          col-span-1 sm:col-span-2 lg:col-start-9 lg:col-span-3 lg:row-start-1 lg:row-span-3" />

          {/* How It Works */}
          <div className="p-6 bg-white/10 backdrop-blur-lg shadow-md border-[0.8px] border-gray-500 rounded-lg text-white
                          col-span-1 sm:col-span-2 lg:col-start-9 lg:col-span-3 lg:row-start-4 lg:row-span-8">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 text-2xl font-sans mb-4">
                <FontAwesomeIcon icon={faTimeline} />
                <span>How It Works?</span>
              </div>
              <div className="px-4">
                <ul className="list-disc text-xl text-gray-400 flex flex-col gap-4">
                  <li>
                    <span className="font-semibold text-white">
                      Describe Your Website
                    </span>
                    <p className="text-base mt-1">
                      Explain your website concept in plain text, creating a
                      clear blueprint for your project.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">AI Generation</span>
                    <p className="text-base mt-1">
                      Our AI analyzes your description and automatically builds
                      website structure, responsive layout, core components, and
                      design elements.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">Customize</span>
                    <p className="text-base mt-1">
                      Fine-tune your site using a drag-and-drop editor, color
                      palette customization, real-time preview, and a
                      comprehensive component library.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Collaborate & Deploy
                    </span>
                    <p className="text-base mt-1">
                      Work with your team, preview across devices, deploy with
                      one click, and download source code as needed.
                    </p>
                  </li>
                  <li>
                    <span className="font-semibold text-white">
                      Explore & Innovate
                    </span>
                    <p className="text-base mt-1">
                      Discover public projects, copy and customize existing
                      ideas, and collaborate to build something unique.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom-right box */}
          <div className="p-4 border-[0.8px] border-gray-500/70 border-b-0 rounded-tr-lg rounded-tl-lg shadow-md bg-white/5 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-sm
                          col-span-1 sm:col-span-2 lg:col-start-9 lg:col-span-3 lg:row-start-12 lg:row-span-3" />

          {/* Right border */}
          <div className="hidden lg:block col-start-14 col-span-1 row-start-5 row-span-6 p-4 border-[0.8px] border-gray-500/70 border-e-0 rounded-tl-lg rounded-bl-lg bg-white/5 bg-gradient-to-r from-white/10 to-transparent backdrop-blur-sm" />
        </div>
      </div>
    </div>
  );
}
