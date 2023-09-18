import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ImageItem from "./ImageItem";

const ImageGallery = () => {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState([]);

  // Simulate fetching images from an API
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay (e.g., 2 seconds) to mimic network latency
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate fetching images from an API (replace with your actual data source)
      const fetchedImageData = [
        {
          id: "1",
          title: "Safari sample",
          img: "images/camel desert.jpg",
          tags: ["Nature, Lifestyle"],
          type: "PNG",
        },
        {
          id: "2",
          title: "Coffee Sample",
          img: "images/coffee.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: "3",
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: "4",
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: "5",
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: "6",
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: "7",
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        {
          id: "8",
          title: "Coffee Sample",
          img: "images/sneakers.jpg",
          tags: ["Food, Lifestyle"],
          type: "JPG",
        },
        // Add more image objects here
      ];

      setImageData(fetchedImageData);
      setLoading(false); // Set loading to false when data is ready
    };

    fetchData();
  }, []);

  // Function to handle the image order change
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImageData = [...imageData];
    const [movedImage] = reorderedImageData.splice(result.source.index, 1);
    reorderedImageData.splice(result.destination.index, 0, movedImage);

    setImageData(reorderedImageData);
  };

  return (
    <div className="image-gallery ">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery" mode="virtual">
          {(provided) => (
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 content-center"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {imageData.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="image-item ml-12">
                        <ImageItem image={image} id={image.id} />
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
