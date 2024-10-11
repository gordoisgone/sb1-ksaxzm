import React from 'react'
import { Button } from "./ui/button";
import { motion, AnimatePresence } from 'framer-motion';

interface StoryboardSequenceProps {
  images: string[]
  onDelete?: () => void
  onSave?: () => void
  showControls: boolean
  selectedImages: Set<string>
  toggleImageSelection: (imageUrl: string) => void
  onVideoButtonClick: (imageUrl: string) => void
}

const StoryboardSequence: React.FC<StoryboardSequenceProps> = ({ 
  images, 
  onDelete, 
  onSave, 
  showControls, 
  selectedImages, 
  toggleImageSelection, 
  onVideoButtonClick
}) => {
  return (
    <div className="bg-card rounded-lg shadow-md p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((imageUrl, index) => (
          <motion.div 
            key={index} 
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={imageUrl}
              alt={`Storyboard frame ${index + 1}`}
              className="w-full h-auto rounded-md cursor-pointer"
              onClick={() => toggleImageSelection(imageUrl)}
            />
            <AnimatePresence>
              {selectedImages.has(imageUrl) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 border-4 border-neon-green rounded-md pointer-events-none"
                />
              )}
            </AnimatePresence>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                className="h-6 text-xs px-2 py-0"
                onClick={() => onVideoButtonClick(imageUrl)}
              >
                Video
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      {showControls && (
        <div className="mt-4 flex justify-end space-x-2">
          {onSave && <Button onClick={onSave}>Save</Button>}
          {onDelete && <Button variant="destructive" onClick={onDelete}>Delete</Button>}
        </div>
      )}
    </div>
  )
}

export default StoryboardSequence
