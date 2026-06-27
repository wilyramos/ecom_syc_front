// components/home/VideosSection.tsx
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
    <section className="bg-[var(--color-bg-primary)] max-w-screen-2xl mx-auto px-4 md:px-12 py-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => {
            const isPlaying = !!playingVideos[video.id];

            return (
              <div key={video.id} className="flex flex-col gap-2 group">

                {/* Título Minimalista superior */}
                <h3 className="text-center text-lg md:text-xl font-semibold text-[var(--color-text-secondary)] tracking-tight px-4 transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                  {video.title}
                </h3>

                {/* Contenedor del Video */}
                <div
                  className="aspect-video rounded-xl overflow-hidden relative cursor-pointer bg-[var(--color-bg-secondary)]"
                  onClick={() => !isPlaying && handlePlayVideo(video.id)}
                >
                  <video
                    ref={(el) => { videoRefs.current[video.id] = el; }}
                    className="w-full h-full object-cover rounded-xl"
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

                  {/* Play Overlay Ultra-Minimalista */}
                  {!isPlaying && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-all duration-300 group-hover:bg-black/15 z-10">
                      <div className="w-14 h-14 rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md flex items-center justify-center shadow-sm transform transition-all duration-300 group-hover:scale-105 group-hover:bg-white/20 group-hover:border-white/60">
                        <Play size={20} fill="currentColor" className="ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}