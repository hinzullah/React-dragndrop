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
          title: "Top View of a Boat on Blue Water",
          img: "https://images.pexels.com/photos/18074909/pexels-photo-18074909/free-photo-of-top-view-of-a-boat-on-blue-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },

        /**  {
          
        },
        {
          src: "https://images.pexels.com/photos/18365722/pexels-photo-18365722/free-photo-of-tuktuk.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
         
          tag: "Torch of beautiful Area"
        },
        {
          src: "https://images.pexels.com/photos/17118489/pexels-photo-17118489/free-photo-of-food-sea-beach-sand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        
          tag: "Aesthetic pictures"
        },
        {
          src: "https://images.pexels.com/photos/18271867/pexels-photo-18271867/free-photo-of-ferris-wheel.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      
          tag: "Ferris Wheel"
        },*/

        {
          id: 3,
          title: "Cruise Ship in Water",
          img: "https://images.pexels.com/photos/11427647/pexels-photo-11427647.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Lifestyle"],
          type: "JPG",
        },
        {
          id: 4,
          title: "Seagulls Flying over the Ocean",
          img: "https://images.pexels.com/photos/14130600/pexels-photo-14130600.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Lifestyle, Outdoor"],
          type: "JPG",
        },

        {
          id: 5,
          title: "Aesthetic Image",
          img: "https://images.pexels.com/photos/18403881/pexels-photo-18403881.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Health, Lifestyle"],
          type: "PNG",
        },

        {
          id: 6,
          title: "Panamá Pavo real",
          img: "https://images.pexels.com/photos/18352660/pexels-photo-18352660/free-photo-of-pavo-real.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Food, Entertainment"],
          type: "JPG",
        },

        {
          id: 8,
          title: "Woman Leaning on Washing Machine",
          img: "https://images.pexels.com/photos/15625100/pexels-photo-15625100/free-photo-of-woman-leaning-on-washing-machine.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Food, Diet, Lifestyle"],
          type: "PNG",
        },

        {
          id: 9,
          title: "Desert Meal",
          img: "https://images.pexels.com/photos/18286678/pexels-photo-18286678/free-photo-of-desert.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },

        {
          id: 10,
          title: "Roofs of building in city",
          img: "https://images.pexels.com/photos/18252341/pexels-photo-18252341/free-photo-of-roofs-of-buildings-in-city.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },

        {
          id: 11,
          title: "Deer fawn on dirt road",
          img: "https://images.pexels.com/photos/15723624/pexels-photo-15723624/free-photo-of-deer-fawn-on-dirt-road.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },

        {
          id: 12,
          title: "Blue Suv on Brown Sand",
          img: "https://images.pexels.com/photos/10725137/pexels-photo-10725137.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },

        {
          id: 13,
          title:
            "Striped Cushions on a Sofa and White Flip-Flops on a Wooden Jetty",
          img: "https://images.pexels.com/photos/17467001/pexels-photo-17467001/free-photo-of-striped-cushions-on-a-sofa-and-white-flip-flops-on-a-wooden-jetty.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },

        {
          id: 14,
          title: "From train window view of railroad and buildings in city",
          img: "https://images.pexels.com/photos/7620384/pexels-photo-7620384.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",

          tags: ["Outdoor, Lifestyle, Entertainment"],
          type: "JPG",
        },
      ];

      setImages(fetchedImages);
      setLoading(false); // Set loading to false when data is ready
    }, 3000); // Simulated delay of 2 seconds

    return () => clearTimeout(delay); // Clear the timeout on component unmount
  }, []);

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
    }, 1000);

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

    // Getting the ID of the dragged image from the dataTransfer
    const draggedImageId = e.dataTransfer.getData("text/plain");

    // Finding the dragged image object
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

    // Creating a copy of the images array
    const updatedImages = [...images];

    // Removing the dragged image from its original position
    updatedImages.splice(draggedIndex, 1);

    // Inserting the dragged image at the target position
    updatedImages.splice(targetIndex, 0, draggedImage);

    // Updateing the state with the new order of images
    setImages(updatedImages);

    // Cleaing the draggedImage state
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
