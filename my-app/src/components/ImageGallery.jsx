import React from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import ImageItem from "./ImageItem";
import SearchBar from "./SearchBar";

const ImageGallery = () => {
  // const [images, setImages] = useState([
  //   // {
  //   //   id: 1,
  //   //   title: "Safari sample",
  //   //   img: "images/camel desert.jpg",
  //   //   tags: ["Nature, Lifestyle"],
  //   //   type: "PNG",
  //   // },
  //   {
  //     id: 2,
  //     title: "Coffee Sample",
  //     img: "images/coffee.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   {
  //     id: 3,
  //     title: "Coffee Sample",
  //     img: "images/sneakers.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   {
  //     id: 4,
  //     title: "Coffee Sample",
  //     img: "images/crib.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   {
  //     id: 5,
  //     title: "Coffee Sample",
  //     img: "images/flower girl.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   {
  //     id: 6,
  //     title: "Coffee Sample",
  //     img: "images/happy man.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   {
  //     id: 7,
  //     title: "Coffee Sample",
  //     img: "images/meal.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   // {
  //   //   id: 8,
  //   //   title: "Coffee Sample",
  //   //   img: "images/place.jpg",
  //   //   tags: ["Food, Lifestyle"],
  //   //   type: "JPG",
  //   // },
  //   {
  //     id: 9,
  //     title: "Coffee Sample",
  //     img: "images/pool.jpg",
  //     tags: ["Food, Lifestyle"],
  //     type: "JPG",
  //   },
  //   // {
  //   //   id: 10,
  //   //   title: "Coffee Sample",
  //   //   img: "images/view.jpg",
  //   //   tags: ["Food, Lifestyle"],
  //   //   type: "JPG",
  //   // },
  // ]);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Simulate a delay (e.g., 2 seconds) to mimic network latency
    const delay = setTimeout(() => {
      // Simulate fetching images from an API (replace with your actual data source)
      const fetchedImages = [
        {
          id: 2,
          title: "Coffee Sample",
          img: "images/coffee.jpg",
          tags: ["Food, Lifestyle, play"],
          type: "JPG",
        },
        {
          id: 3,
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle, one"],
          type: "JPG",
        },
        {
          id: 4,
          title: "Coffee Sample",
          img: "images/crib.jpg",
          tags: ["Food, Lifestyle, out"],
          type: "JPG",
        },
        {
          id: 5,
          title: "Coffee Sample",
          img: "images/flower girl.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: 6,
          title: "Coffee Sample",
          img: "images/happy man.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: 7,
          title: "Coffee Sample",
          img: "images/meal.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        // {
        //   id: 8,
        //   title: "Coffee Sample",
        //   img: "images/place.jpg",
        //   tags: ["Food, Lifestyle"],
        //   type: "JPG",
        // },
        {
          id: 9,
          title: "Coffee Sample",
          img: "images/pool.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
      ];

      setImages(fetchedImages);
      setLoading(false); // Set loading to false when data is ready
    }, 2000); // Simulated delay of 2 seconds

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
        // Display a loading spinner or skeleton loader while images are loading
        <div className="loading-spinner">Loading...</div> // Replace with your loading spinner component
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
