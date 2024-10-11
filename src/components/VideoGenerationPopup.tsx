import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { generateLumaVideo } from '../utils/lumaApi';

interface VideoGenerationPopupProps {
  isOpen: boolean;
  imageUrl: string | null;
  onClose: () => void;
  onGenerate: (videoUrl: string) => void;
}

const VideoGenerationPopup: React.FC<VideoGenerationPopupProps> = ({ isOpen, imageUrl, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (imageUrl) {
      setIsGenerating(true);
      setError(null);
      try {
        const videoUrl = await generateLumaVideo(imageUrl, prompt);
        onGenerate(videoUrl);
      } catch (error) {
        console.error('Error generating video:', error);
        setError(`Failed to generate video: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Video</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Enter prompt for video generation"
            value={prompt}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleGenerate} disabled={isGenerating || !imageUrl || !prompt}>
            {isGenerating ? 'Generating...' : 'Generate Video'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoGenerationPopup;
