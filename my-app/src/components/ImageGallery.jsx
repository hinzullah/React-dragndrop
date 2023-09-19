import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ImageItem from "./ImageItem";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulating a delay (e.g., 2 seconds) to mimic network latency
    const delay = setTimeout(() => {
      // Simulating fetching images from an API (replace with your actual data source)
      const fetchedImages = [
        {
          id: 2,
          title: "Coffee Sample",
          img: "images/coffee.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: 3,
          title: "Out N About",
          img: "images/sneakers.jpg",
          tags: ["Lifestyle"],
          type: "JPG",
        },
        {
          id: 4,
          title: "Coffee Sample",
          img: "images/crib.jpg",
          tags: ["Lifestyle, Outdoor"],
          type: "JPG",
        },
        {
          id: 5,
          title: "Perfect Skin",
          img: "images/flower girl.jpg",
          tags: ["Health, Lifestyle"],
          type: "PNG",
        },
        {
          id: 6,
          title: "John Doe",
          img: "images/happy man.jpg",
          tags: ["Food, Entertainment"],
          type: "JPG",
        },
        {
          id: 7,
          title: "Delicacies",
          img: "images/meal.jpg",
          tags: ["Food, Diet, Lifestyle"],
          type: "PNG",
        },

        {
          id: 9,
          title: "Slippery Outdoor",
          img: "images/pool.jpg",
          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },
      ];

      setImages(fetchedImages);
      setLoading(false); // Set loading to false when data is ready
    }, 3000); // Simulated delay of 2 seconds

    return () => clearTimeout(delay); // Clear the timeout on component unmount
  }, []);

  const [draggedImage, setDraggedImage] = useState(null);

  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();

    // Fining the index of the dragged image and the target image
    const draggedIndex = images.findIndex(
      (image) => image.id === draggedImage.id
    );
    const targetIndex = images.findIndex(
      (image) => image.id === targetImage.id
    );

    // Creating a copy of the images array
    const updatedImages = [...images];

    // Removing the dragged image from its original position
    updatedImages.splice(draggedIndex, 1);

    // Inserting the dragged image at the target position
    updatedImages.splice(targetIndex, 0, draggedImage);

    // Updating the state with the new order of images
    setImages(updatedImages);

    // Clearing the draggedImage state
    setDraggedImage(null);
  };

  // Filter images based on the search tags
  const filteredImages = images.filter((image) =>
    image.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <div>
        <SearchBar
          images={images}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      {loading ? (
        <div className="loading-spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-10 p-10">
          <AnimatePresence>
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                className="image-card"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, image)}
                onDragOver={(e) => handleDragOver(e)}
                onDrop={(e) => handleDrop(e, image)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ImageItem image={image} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
