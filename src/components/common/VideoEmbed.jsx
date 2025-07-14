import React from 'react';

const VideoEmbed = ({ video }) => {
  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url; // If already an embed URL
  };

  return (
    <div className="bg-white dark:bg-peace-800 rounded-2xl p-4 shadow-lg border border-peace-200 dark:border-peace-700">
      <h4 className="font-medium text-peace-900 dark:text-white mb-3 font-body">{video.title}</h4>
      <div className="video-embed">
        <iframe
          src={getEmbedUrl(video.url)}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default VideoEmbed;