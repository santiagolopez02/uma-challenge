import React from "react";

interface VideoProps {
  url: string;
}

const Video: React.FC<VideoProps> = ({ url }) => {
  return (
    <div className="w-auto">
      <iframe
        src={url}
        title="Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Video;
