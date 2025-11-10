import { useState, useEffect, useRef } from 'react';

export const useSoundManager = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const soundsRef = useRef({});

  useEffect(() => {
    const sounds = {
      hover: { url: 'https://assets.codepen.io/7558/click-reverb-001.mp3', volume: 0.15 },
      click: { url: 'https://assets.codepen.io/7558/shutter-fx-001.mp3', volume: 0.3 },
      textChange: { url: 'https://assets.codepen.io/7558/whoosh-fx-001.mp3', volume: 0.3 }
    };
    Object.entries(sounds).forEach(([name, cfg]) => {
      const a = new Audio(cfg.url);
      a.preload = 'auto';
      a.volume = cfg.volume;
      soundsRef.current[name] = a;
    });
  }, []);

  const enableAudio = () => { if (!isEnabled) setIsEnabled(true); };

  const play = (name, delay = 0) => {
    const a = soundsRef.current[name];
    if (!isEnabled || !a) return;
    const go = () => { a.currentTime = 0; a.play().catch(() => {}); };
    delay ? setTimeout(go, delay) : go();
  };

  return { enableAudio, play, isEnabled };
};
