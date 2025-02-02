const fetchNewImageSrc = async (altText) => {
    // Simulating an API call that returns a new image URL based on alt text
    const response = await fetch("https://api.example.com/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: altText })
    });
    const data = await response.json();
    return data.imageUrl;
};

const replaceImageSrc = async (html) => {
    const imgTagRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    const matches = Array.from(html.matchAll(imgTagRegex));
    
    for (const match of matches) {
        const altMatch = match[0].match(/alt="([^"]*)"/);
        const altText = altMatch ? altMatch[1] : "No alt attribute";
        console.log("Alt text:", altText);
        
        // const newSrc = await fetchNewImageSrc(altText);
        const newSrc = "cdhbsidchb"
        html = html.replace(match[0], match[0].replace(/src="[^"]+"/, `src="${newSrc}"`));
    }
    return html;
};

// Example usage 
const htmlCode = '<html><body><img src="old_image.jpg" alt="First image"> <img src="another_old.jpg" alt="Second image"></body></html>';
replaceImageSrc(htmlCode).then(updatedHtml => console.log(updatedHtml));
