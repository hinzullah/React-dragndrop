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

  // const [draggedImage, setDraggedImage] = useState(null);

  // const handleDragStart = (e, image) => {
  //   setDraggedImage(image);
  // };

  // const handleTouchStart = (e, image) => {
  //   // For touch devices, prevent the default behavior to avoid conflicts with drag-and-drop
  //   e.preventDefault();

  //   setDraggedImage(image);
  // };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  // const handleDrop = (e, targetImage) => {
  //   e.preventDefault();

  //   // Fining the index of the dragged image and the target image
  //   const draggedIndex = images.findIndex(
  //     (image) => image.id === draggedImage.id
  //   );
  //   const targetIndex = images.findIndex(
  //     (image) => image.id === targetImage.id
  //   );

  //   // Creating a copy of the images array
  //   const updatedImages = [...images];

  //   // Removing the dragged image from its original position
  //   updatedImages.splice(draggedIndex, 1);

  //   // Inserting the dragged image at the target position
  //   updatedImages.splice(targetIndex, 0, draggedImage);

  //   // Updating the state with the new order of images
  //   setImages(updatedImages);

  //   // Clearing the draggedImage state
  //   setDraggedImage(null);
  // };

  // Filter images based on the search tags
  const filteredImages = images.filter((image) =>
    image.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const [draggedImage, setDraggedImage] = useState(null);
  const [touchTimeout, setTouchTimeout] = useState(null);

  const handleTouchStart = (e, image) => {
    // Prevent the default touchstart behavior
    e.preventDefault();

    // Set a timeout to initiate the drag after 3 seconds
    const timeoutId = setTimeout(() => {
      setDraggedImage(image);
    }, 3000);

    // Store the timeout ID in the state
    setTouchTimeout(timeoutId);
  };

  const handleTouchEnd = () => {
    // Clear the touch timeout if it exists
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }
  };

  const handleDragStart = (e, image) => {
    // Cancel the touch timeout if it exists
    if (touchTimeout) {
      clearTimeout(touchTimeout);
      setTouchTimeout(null);
    }

    // Set the data being dragged (used to identify the dragged image)
    e.dataTransfer.setData("text/plain", image.id.toString());
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetImage) => {
    e.preventDefault();

    // Get the ID of the dragged image from the dataTransfer
    const draggedImageId = e.dataTransfer.getData("text/plain");

    // Find the dragged image object
    const draggedImage = images.find(
      (image) => image.id.toString() === draggedImageId
    );

    if (!draggedImage) {
      return;
    }

    // Find the index of the dragged image and the target image
    const draggedIndex = images.findIndex(
      (image) => image.id === draggedImage.id
    );
    const targetIndex = images.findIndex(
      (image) => image.id === targetImage.id
    );

    // Create a copy of the images array
    const updatedImages = [...images];

    // Remove the dragged image from its original position
    updatedImages.splice(draggedIndex, 1);

    // Insert the dragged image at the target position
    updatedImages.splice(targetIndex, 0, draggedImage);

    // Update the state with the new order of images
    setImages(updatedImages);

    // Clear the draggedImage state
    setDraggedImage(null);
  };

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
                onTouchStart={(e) => handleTouchStart(e, image)}
                onTouchEnd={() => handleTouchEnd()}
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
