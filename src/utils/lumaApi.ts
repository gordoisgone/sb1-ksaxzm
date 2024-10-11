import axios from 'axios';

const LUMA_API_URL = 'https://api.lumalabs.ai/dream-machine/v1/generations';

export async function generateLumaVideo(imageUrl: string, prompt: string): Promise<string> {
  try {
    console.log('Sending request to Luma API:', { imageUrl, prompt });

    // Make the initial POST request to start the video generation
    const response = await axios.post(
      LUMA_API_URL,
      {
        prompt: prompt,
        keyframes: {
          frame0: {
            type: "image",
            url: imageUrl
          }
        },
        loop: false,
        aspect_ratio: "16:9"
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_LUMAAI_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    console.log('Generation started:', response.data);

    const generationId = response.data.id;
    if (!generationId) {
      throw new Error('Generation ID is undefined');
    }

    let completed = false;
    let videoUrl = '';

    // Polling to check the status of the video generation
    while (!completed) {
      const statusResponse = await axios.get(`${LUMA_API_URL}/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_LUMAAI_API_KEY}`,
          'Accept': 'application/json'
        }
      });

      const status = statusResponse.data;
      console.log('Generation status:', status);

      if (status.state === "completed") {
        completed = true;
        if (status.assets?.video) {
          videoUrl = status.assets.video;
        } else {
          throw new Error('Video URL is missing from completed generation');
        }
      } else if (status.state === "failed") {
        throw new Error(`Generation failed: ${status.failure_reason}`);
      } else {
        console.log("Dreaming...");
        await new Promise(r => setTimeout(r, 3000)); // Wait for 3 seconds
      }
    }

    console.log('Video generation completed:', videoUrl);
    return videoUrl;
  } catch (error) {
    console.error('Error in generateLumaVideo:', error);
    throw error;
  }
}
