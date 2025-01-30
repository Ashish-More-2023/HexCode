import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useRef } from "react"; // Import useState and useRef from React

export const Footer = () => {
    const [numProjects, setNumProjects] = useState(200);
    const [displayCount, setDisplayCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Animates only once when it comes into view

    return (
        <motion.footer 
            ref={ref}
            initial={{ opacity: 0, y: 50 }} 
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Removed undefined isVisible variable
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full bg-zinc-900 py-2 px-7 flex md:flex-row justify-between items-center border-gray-600 border-t"
        >
            <div className="flex flex-col items-start mb-4 md:mb-0 gap-2">
                <div className="text-white font-semibold text-xl">
                    <FontAwesomeIcon icon={faHexagonNodes} className="mr-4 h-5 w-5" />HexCode
                </div>
                <div className="hidden text-sm md:flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 justify-center md:justify-end w-full md:w-auto">
                    <span>&copy;2025 HexCode. All Rights Reserved</span>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
