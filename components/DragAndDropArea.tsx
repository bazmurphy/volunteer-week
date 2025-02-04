import React from "react";
import { Rnd } from "react-rnd";
import cardsData from "../cards.json";
import { DraggableEvent } from "react-draggable";
import BoardModalMessage from "./BoardModalMessage";

const DragAndDropArea: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
  const [maxZIndex, setMaxZIndex] = React.useState(cardsData.length);
  const [selectedCardId, setSelectedCardId] = React.useState<number | null>(
    null
  );
  const [modalOpen, setModalOpen] = React.useState(false); // Updated modalOpen state

  React.useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth - 102);
      setContainerHeight(containerRef.current.offsetHeight - 102);
    }
  }, []);

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    const clickedCard = event.currentTarget as HTMLElement;
    const newZIndex = maxZIndex + 1;

    setMaxZIndex(newZIndex);
    clickedCard.style.zIndex = newZIndex.toString();

    // Check if the click is on the "Read more" button
    const target = event.target as HTMLElement;

    const isReadMoreButton = target.classList.contains("read-more-button");
    console.log("read more button", isReadMoreButton);

    if (selectedCard === index && !isReadMoreButton) {
      setSelectedCard(null);
    } else {
      setSelectedCard(index);
    }

    if (isReadMoreButton) {
      setModalOpen(true); // Update modalOpen state to true when "Read more" is clicked
    }
  };

  const handleCardDragStart = (event: DraggableEvent, index: number) => {
    const clickedCard = event.currentTarget as HTMLElement;
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    clickedCard.style.zIndex = newZIndex.toString();
    setSelectedCard(index);
  };

  const handleCardDragStop = () => {
    setSelectedCard(null);
  };

  const handleItemClick = (cardId: number) => {
    console.log("button is working");
    setSelectedCardId(cardId);
    setModalOpen(true); // Update modalOpen state to true when "Read more" is clicked
  };

  const cardWidth = 350;
  const cardHeight = 350;

  return (
    <div ref={containerRef} className="relative w-and-h border-1 border-black">
      {containerWidth === 0 || containerHeight === 0 ? (
        <div>Loading...</div>
      ) : (
        cardsData.map((card) => {
          const maxWidth = containerWidth - cardWidth;
          const maxHeight = containerHeight - cardHeight;
          const x = Math.floor(Math.random() * maxWidth);
          const y = Math.floor(Math.random() * maxHeight);

          return (
            <Rnd
              key={card.id}
              default={{
                x,
                y,
                width: cardWidth,
                height: "auto",
              }}
              bounds="parent"
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleCardClick(event, card.id)
              }
              onTouchStart={(event: React.TouchEvent<HTMLDivElement>) =>
                handleCardClick(event, card.id)
              }
              onTouchEnd={(event: React.TouchEvent<HTMLDivElement>) =>
                handleCardClick(event, card.id)
              }
              onDragStart={(event: DraggableEvent) =>
                handleCardDragStart(event, card.id)
              }
              onDragStop={handleCardDragStop}
              style={{
                zIndex: card.id,
              }}
            >
              <div className={`card shadow-xl ${card.color}`}>
                <div className="card_text">
                  <p>{card.subject}</p>
                  {card.content.length > 100 ? (
                    <>
                      <p>
                        {card.content.slice(0, 100)}... <br />
                      </p>
                      <label
                        htmlFor="my-modal-3"
                        className="read-more-button bg-transparent text-black border px-2 rounded-md border-black hover:bg-black hover:text-white cursor-pointer"
                        onTouchStart={() => handleItemClick(card.id)}
                        onClick={() => handleItemClick(card.id)}
                      >
                        Read more
                      </label>
                    </>
                  ) : (
                    <p>{card.content}</p>
                  )}
                  <p className="author">{card.author}</p>
                </div>
              </div>
            </Rnd>
          );
        })
      )}

      {/* Modal */}
      {modalOpen && selectedCardId !== null && (
        <div
          className={`${modalOpen ? "modal-visible" : "modal-hidden"} modal`}
        >
          <BoardModalMessage
            cardId={selectedCardId}
            setModalOpen={setModalOpen}
          />
        </div>
      )}
    </div>
  );
};

export default DragAndDropArea;
