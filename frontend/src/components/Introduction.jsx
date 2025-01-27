import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHexagonNodes, faCode, faRobot, faMagic } from "@fortawesome/free-solid-svg-icons";

const Introduction = () => {
    const words = ["HexCode", "Think", "Prompt", "Develop"];
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[index];
        const typeSpeed = isDeleting ? 100 : 200;
        const nextDelay = isDeleting && charIndex === -1 ? 1000 : typeSpeed;

        const timer = setTimeout(() => {
            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setIndex((prevIndex) => (prevIndex + 1) % words.length);
            }

            setText(currentWord.substring(0, charIndex));
            setCharIndex((prevChar) => prevChar + (isDeleting ? -1 : 1));
        }, nextDelay);

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, index]);

    const features = [
        {
            icon: faCode,
            title: "One-Click Generation",
            description: "Transform your ideas into fully functional websites instantly.",
        },
        {
            icon: faRobot,
            title: "AI-Powered Design",
            description: "Intelligent layouts that adapt to your unique vision.",
        },
        {
            icon: faMagic,
            title: "Seamless Customization",
            description: "Refine and perfect your design with intuitive AI guidance.",
        },
    ];

    // Smooth Scroll Function
    const handleScroll = () => {
        window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    };

    return (
        <div className="relative min-h-[98%] flex flex-col items-center justify-center text-gray-800 mt-4">
            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative text-center px-4 md:px-8 w-full flex flex-col items-center"
            >
                {/* Title with Typing Animation */}
                <div className="flex items-center justify-center mb-6">
                    <FontAwesomeIcon
                        icon={faHexagonNodes}
                        className="text-6xl md:text-8xl text-indigo-500 mr-4"
                    />
                    <div className="text-5xl md:text-7xl font-bold">
                        <span className={words[index] === "HexCode" ? "text-indigo-500" : "text-gray-300"}>
                            {text}
                        </span>
                        <span className="animate-blink border-r-4 border-gray-800 ml-1"></span>
                    </div>
                </div>

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl md:text-4xl text-gray-400 mb-8 font-semibold"
                >
                    The Future of Intelligent Web Development
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="max-w-2xl mx-auto text-base md:text-xl text-gray-600 mb-12"
                >
                    Revolutionize your development workflow with AI-powered website generation. 
                    Create stunning, responsive designs with unprecedented speed and precision.
                </motion.p>

                {/* Feature Grid */}
                <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + idx * 0.2 }}
                            className="bg-white/10 backdrop-blur-lg shadow-md border rounded-xl p-6 text-gray-200 hover:text-gray-500 hover:bg-gray-200 transition-all duration-300 group hover:scale-105 hover:shadow-lg"
                        >
                            <FontAwesomeIcon
                                icon={feature.icon}
                                className="text-4xl mb-4 text-indigo-400 group-hover:text-indigo-600 transition-colors"
                            />
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
                {/* Get Started Button */}
                <motion.button
                    onClick={handleScroll}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="hidden md:block md:bottom-10 md:mt-4 md:mb-48 md:bg-indigo-500 md:text-white md:font-semibold md:text-lg md:px-8 md:py-3 md:rounded-full md:shadow-md md:hover:bg-indigo-600 md:hover:scale-105 md:transition-all md:duration-300"
                >
                    Get Started
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Introduction;
