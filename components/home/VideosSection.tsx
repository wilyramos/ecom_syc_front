'use client';

import { useState, useRef } from 'react';
import { Play } from 'lucide-react';

export default function VideosSection() {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const videos = [
    {
      id: '03_video_kdxhwn',
      title: 'Tu iPhone como parte de pago',
    },
    {
      id: '04_Video_1_zl1bfm',
      title: 'Plan Acumulativo',
    },
  ];

  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const getVideoUrl = (publicId: string) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_auto/${publicId}`;
  };

  const getPosterUrl = (publicId: string) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto,f_auto,w_1200,h_675,c_fill/${publicId}.jpg`;
  };

  const handlePlayVideo = (id: string) => {
    const videoNode = videoRefs.current[id];
    if (videoNode) {
      videoNode.play();
    }
  };

  return (
    <section className="w-full max-w-screen-2xl mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {videos.map((video) => {
          const isPlaying = !!playingVideos[video.id];

          return (
            <div key={video.id} className="flex flex-col gap-3 group">
              {/* Contenedor del Video */}
              <div
                className="aspect-video rounded-2xl overflow-hidden relative cursor-pointer bg-[var(--color-bg-secondary)] shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md"
                onClick={() => !isPlaying && handlePlayVideo(video.id)}
              >
                <video
                  ref={(el) => { videoRefs.current[video.id] = el; }}
                  className="w-full h-full object-cover"
                  preload="metadata"
                  poster={getPosterUrl(video.id)}
                  controls={isPlaying}
                  onPlay={() => setPlayingVideos(prev => ({ ...prev, [video.id]: true }))}
                  onPause={() => setPlayingVideos(prev => ({ ...prev, [video.id]: false }))}
                  onEnded={() => setPlayingVideos(prev => ({ ...prev, [video.id]: false }))}
                >
                  <source src={getVideoUrl(video.id)} type="video/mp4" />
                  Tu navegador no soporta reproducción de videos.
                </video>

                {/* Play Overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-all duration-300 group-hover:bg-black/20 z-10">
                    <div className="w-16 h-16 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:border-white/50">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Título inferior elegante */}
              <h3 className="text-base md:text-lg font-semibold text-[var(--color-text-primary)] tracking-tight px-1 transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                {video.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}