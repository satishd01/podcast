import React, { useState, useEffect } from "react";
import { TbCircleXFilled } from "react-icons/tb";
import { HiMenuAlt4 } from "react-icons/hi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const PlayNext = () => {
  useEffect(() => {
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.position = "static";
    };
  }, []);
  const initialData = [
    {
      id: "1",
      name: "jcksbjckbjs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "2",
      name: "jcksbjckbjs;dbs",
      episode: "1",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "3",
      name: "another name",
      episode: "2",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "4",
      name: "some other name",
      episode: "3",
      imageUrl: "https://placehold.co/50",
    },
    {
      id: "5",
      name: "different name",
      episode: "4",
      imageUrl: "https://placehold.co/50",
    },
  ];

  const [data, setData] = useState(initialData);

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    const items = Array.from(data);
    const [movedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, movedItem);

    setData(items);
  };

  return (
    <div className="absolute w-full md:top-[-20rem] top-[-13rem] z-50 py-4">
      <div className="grid grid-cols-12 items-center pr-8 md:pr-12">
        <div className="md:col-span-2"></div>
        <div className="md:col-span-10 col-span-12 bg-[#222222] rounded-lg px-5 py-4 min-h-[310px] max-h-[310px] overflow-y-auto">
          <p className="text-xl mb-5">Playing Next</p>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="play-next">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col">
                  {data.map((play, index) => (
                    <Draggable
                      key={play.id}
                      draggableId={play.id}
                      index={index}>
                      {(provided) => (
                        <div
                          className="flex items-center justify-between text-white mb-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          <div className="flex items-center gap-3 w-full">
                            <TbCircleXFilled className="text-xl" />
                            <img
                              alt={play.name}
                              src={play.imageUrl}
                              className="rounded-md w-12 h-12 md:w-16 md:h-16"
                            />
                            <p className="truncate w-32 md:w-48">{`${play.name} episode ${play.episode}`}</p>
                          </div>
                          <HiMenuAlt4 className="text-xl" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default PlayNext;
