import React from 'react'
import StoryboardImage from './StoryboardImage'
import { Trash2, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface StoryboardSequenceProps {
  images: string[]
  onDelete: () => void
  onSave?: () => void
  showControls: boolean
  selectedImages: Set<string>
  toggleImageSelection: (imageUrl: string) => void
}

const StoryboardSequence: React.FC<StoryboardSequenceProps> = ({ 
  images, 
  onDelete, 
  onSave, 
  showControls, 
  selectedImages, 
  toggleImageSelection
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((imageUrl, index) => (
        <StoryboardImage
          key={index}
          imageUrl={imageUrl}
          isSelected={selectedImages.has(imageUrl)}
          onSelect={() => toggleImageSelection(imageUrl)}
        />
      ))}
      {showControls && onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:bg-destructive/90 transition-colors duration-200 z-10"
        >
          <Trash2 size={16} />
        </button>
      )}
      {showControls && onSave && (
        <button
          onClick={onSave}
          className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-1 shadow-md hover:bg-primary/90 transition-colors duration-200"
        >
          <CheckCircle size={16} />
        </button>
      )}
    </div>
  )
}

export default StoryboardSequence