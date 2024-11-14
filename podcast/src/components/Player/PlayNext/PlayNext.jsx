import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TbCircleXFilled } from "react-icons/tb";
import { HiMenuAlt4 } from "react-icons/hi";

const PlayNext = () => {
  const [data, setData] = useState([
    {
      id: "1",
      name: "Song 1",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "Song 2",
      episode: "2",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "3",
      name: "Song 3",
      episode: "3",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "3",
      name: "Song 3",
      episode: "3",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "3",
      name: "Song 3",
      episode: "3",
      imageUrl: "https://placehold.co/50",
    },
  ]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(data);
    const [movedItem] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, movedItem);
    setData(reorderedData);
  };

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="absolute w-full md:top-[-20rem] top-[-5rem] py-4">
      <div className="grid grid-cols-12 items-center pr-8 md:pr-12">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-10 col-span-12 bg-[#222222] rounded-lg px-5 py-4 max-h-[200px] md:max-h-[310px] overflow-y-auto">
          <p className="text-xl mb-5">Playing Next</p>
          {data.length === 0 ? (
            <p className="text-gray-400">
              No songs in the queue. Add songs to start listening!
            </p>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="playNextList">
                {(provided) => (
                  <div
                    className="flex flex-col gap-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {data.map((play, index) => (
                      <Draggable
                        key={play.id}
                        draggableId={play.id}
                        index={index}
                        isDragDisabled={data.length === 1}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center justify-between text-white mb-2 transition-all duration-300 ease-in-out transform ${
                              snapshot.isDragging
                                ? "scale-105 shadow-lg bg-[#333] opacity-90"
                                : ""
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              boxSizing: "border-box",
                            }}>
                            <div className="flex items-center gap-3 w-full">
                              <TbCircleXFilled
                                className="text-xl cursor-pointer text-white"
                                onClick={() => removeItem(play.id)}
                                aria-label="Remove song"
                              />
                              <img
                                alt={play.name}
                                src={play.imageUrl}
                                className="rounded-md w-12 h-12 md:w-16 md:h-16"
                              />
                              <p className="truncate w-32 md:w-48">{`${play.name} episode ${play.episode}`}</p>
                            </div>
                            <div
                              {...provided.dragHandleProps}
                              aria-label="Drag handle">
                              <HiMenuAlt4 className="text-xl cursor-pointer" />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayNext;
