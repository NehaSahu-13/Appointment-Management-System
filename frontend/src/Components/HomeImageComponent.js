import { useState } from "react";
import { useEffect } from "react";

const HomeImageComponent = ({ filename }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/admin/image/${filename}`);
               
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
            } catch (error) {
                setError(error);
            }
        };

        fetchImage();
    }, [filename]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {imageSrc ? (
                <img src={imageSrc} alt={filename} className="home-img"/>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default HomeImageComponent;