"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null)
  const [lastSelected, setLastSelected] = useState(null)
  const [hovered, setHovered] = useState(null)

  const handleClick = (card) => {
    setLastSelected(selected)
    setSelected(card)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
    setSelected(null) 
  }

  return (
    <div className="w-full h-full p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 relative pt-0 mt-0">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "h-64 md:h-auto", i === cards.length - 1 ? "hidden md:block" : "")}>
          <motion.div
            onClick={() => handleClick(card)}
            onHoverStart={() => setHovered(card)}
            onHoverEnd={() => setHovered(null)}
            className={cn(
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : card.thumbnail ? "bg-white rounded-xl h-full w-full bg-transparent" : "bg-black/40 rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            {hovered?.id === card.id && !selected && <HoveredCard card={card} />}
            <ImageComponent card={card} />
            {/* Show stats for first card when it's not being hovered */}
            {(!card.thumbnail && (!hovered?.id || hovered?.id !== card.id)) && (
              <div className="relative z-20 h-full">
                {card.content}
              </div>
            )}
            {/* Show content for image cards only when hovered */}
            {(card.thumbnail && hovered?.id === card.id) && (
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
                {card.content}
              </div>
            )}
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  )
}

const ImageComponent = ({ card }) => {
  if (!card.thumbnail) return null;
  
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn("object-cover object-top absolute inset-0 h-full w-full transition duration-200")}
      alt="thumbnail"
    />
  )
}

const SelectedCard = ({ selected }) => {
  const isStatsCard = !selected.thumbnail;

  return (
    <div className={cn(
      "bg-transparent h-full w-full flex flex-col rounded-lg relative z-[60]",
      isStatsCard ? "justify-center" : "justify-end"
    )}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "relative z-[70]",
          isStatsCard ? "px-8" : "px-8 pb-4"
        )}
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}

const HoveredCard = ({ card }) => {
  return (
    <div className="absolute inset-0 h-full w-full flex flex-col justify-end rounded-lg shadow-2xl">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative h-full w-full z-20"
      >
        {card.hoverContent}
      </motion.div>
    </div>
  )
}

