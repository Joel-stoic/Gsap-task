import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SplitType from "split-type";

import { useSoundManager } from "../hooks/useSoundManager";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { Backgrounds } from "../components/Backgrounds";
import { ListColumn } from "../components/ListColumn";
import { Featured } from "../components/Featured";
import { HeaderTitle } from "../components/HeaderTitle";
import { FooterProgress } from "../components/FooterProgress";

export default function CreativeProcessScroll() {
  const fixedSectionRef = useRef(null);
  const fixedContainerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const footerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const featuredRef = useRef(null);
  const loadingOverlayRef = useRef(null);

  const { enableAudio, play } = useSoundManager();
  const [ready, setReady] = useState(false);

  const BG = useMemo(() => [
    "https://assets.codepen.io/7558/flame-glow-blur-001.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-002.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-003.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-004.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-005.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-006.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-007.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-008.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-009.jpg",
    "https://assets.codepen.io/7558/flame-glow-blur-010.jpg",
  ], []);

  const LEFT = ["Silence","Meditation","Intuition","Authenticity","Presence","Listening","Curiosity","Patience","Surrender","Simplicity"];
  const FEAT = ["Creative Elements","Inner Stillness","Deep Knowing","True Expression","Now Moment","Deep Attention","Open Exploration","Calm Waiting","Let Go Control","Pure Essence"];
  const RIGHT = ["Reduction","Essence","Space","Resonance","Truth","Feeling","Clarity","Emptiness","Awareness","Minimalism"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const id = "pp-neue-montreal-font";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.cdnfonts.com/css/pp-neue-montreal";
      document.head.appendChild(l);
    }
  }, []);

  // loading overlay
  useEffect(() => {
    let counter = 0;
    const overlay = loadingOverlayRef.current;
    const counterEl = overlay?.querySelector(".loading-counter");
    const iv = setInterval(() => {
      counter += Math.random() * 3 + 1;
      if (counterEl) counterEl.textContent = `[${String(Math.min(100, counter.toFixed(0))).padStart(2, "0")}]`;
      if (counter >= 100) {
        clearInterval(iv);
        gsap.to([counterEl, overlay?.firstChild], {
          opacity: 0, y: -20, duration: 0.6, ease: "power2.inOut",
          onComplete: () => {
            gsap.to(overlay, {
              y: "-100%", duration: 1.2, ease: "power3.inOut", delay: 0.2,
              onComplete: () => {
                overlay.style.display = "none";
                setReady(true);
                requestAnimationFrame(staggerColumnsIn);
              }
            });
          }
        });
      }
    }, 30);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!ready) return;

    // Lenis
    const lenis = new Lenis({ duration: 1.2, smooth: true, smoothTouch: false, gestureDirection: "vertical" });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    const fixedEl = fixedSectionRef.current;
    const containerEl = fixedContainerRef.current;
    const total = 10;
    let current = 0, snapping = false, animating = false;

    // Split featured
    const splits = Array.from(featuredRef.current?.querySelectorAll("[data-featured-index]") || [])
      .map((el) => new SplitType(el, { types: "words" }));

    // init first featured + first bg
    requestAnimationFrame(() => {
      Array.from(featuredRef.current?.children || []).forEach((n, i) => gsap.set(n, { autoAlpha: i === 0 ? 1 : 0 }));
      splits.forEach((s, i) => gsap.set(s.words, { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 }));
      const firstBg = containerEl.querySelectorAll("[data-bg]")[0];
      if (firstBg) gsap.set(firstBg, { opacity: 1, clipPath: "inset(0% 0 0 0)" });
    });

    const getSectionY = (i) => fixedEl.offsetTop + (fixedEl.offsetHeight * i) / total;

    const updateProgress = () => {
      const fill = document.getElementById("progress-fill");
      const cur = document.getElementById("current-section");
      if (fill) fill.style.width = `${(current / (total - 1)) * 100}%`;
      if (cur) cur.textContent = String(current + 1).padStart(2, "0");
    };

    const setBackgrounds = (to, from) => {
      const bgs = Array.from(containerEl.querySelectorAll("[data-bg]"));
      bgs.forEach((bg, i) => {
        if (i === to) {
          gsap.set(bg, { opacity: 1, clipPath: `inset(${from < to ? "100% 0 0 0" : "0 0 100% 0"})` });
          gsap.to(bg, { clipPath: "inset(0% 0 0 0)", duration: 0.64, ease: "power3.out" });
        } else if (i === from) {
          gsap.to(bg, { opacity: 0, duration: 0.6, ease: "power2.out" });
        } else {
          gsap.set(bg, { opacity: 0 });
        }
      });
    };

    const setListsActive = (idx) => {
      const setSide = (sel) =>
        Array.from(containerEl.querySelectorAll(sel)).forEach((el, i) => {
          el.classList.toggle("active", i === idx);
          gsap.to(el, { opacity: i === idx ? 1 : 0.3, duration: 0.3 });
        });
      setSide("[data-left]");
      setSide("[data-right]");
    };

    const swapFeatured = (to, from) => {
      const feats = Array.from(featuredRef.current.children);
      const fromEl = feats[from];
      const toEl = feats[to];
      const sFrom = splits[from];
      const sTo = splits[to];
      if (fromEl && sFrom) {
        gsap.to(sFrom.words, {
          yPercent: to > from ? -100 : 100,
          opacity: 0,
          duration: 0.48,
          stagger: to > from ? 0.03 : -0.03,
          ease: "power3.inOut",
          onComplete: () => gsap.set(fromEl, { autoAlpha: 0 }),
        });
      }
      if (toEl && sTo) {
        gsap.set(toEl, { autoAlpha: 1 });
        gsap.set(sTo.words, { yPercent: to > from ? 100 : -100, opacity: 0 });
        gsap.to(sTo.words, { yPercent: 0, opacity: 1, duration: 0.64, stagger: to > from ? 0.05 : -0.05, ease: "power3.out" });
        play("textChange", 250);
      }
    };

    const changeSection = (next) => {
      if (animating || next === current || next < 0 || next >= total) return;
      animating = true;
      swapFeatured(next, current);
      setBackgrounds(next, current);
      setListsActive(next);
      current = next;
      updateProgress();
      setTimeout(() => (animating = false), 700);
    };

    const snapTo = (idx) => {
      if (snapping) return;
      snapping = true;
      changeSection(idx);
      const y = getSectionY(idx);
      lenis.scrollTo(y, {
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        lock: true,
        onComplete: () => (snapping = false),
      });
    };

    // Click + hover — use data-index so right column maps 0–9 too
    const leftEls  = Array.from(containerEl.querySelectorAll("[data-left]"));
    const rightEls = Array.from(containerEl.querySelectorAll("[data-right]"));

    leftEls.forEach((el) => {
      el.addEventListener("click", () => { enableAudio(); snapTo(Number(el.dataset.index)); play("click"); });
      el.addEventListener("mouseenter", () => { enableAudio(); play("hover"); });
    });
    rightEls.forEach((el) => {
      el.addEventListener("click", () => { enableAudio(); snapTo(Number(el.dataset.index)); play("click"); });
      el.addEventListener("mouseenter", () => { enableAudio(); play("hover"); });
    });

    const firstClick = () => enableAudio();
    document.addEventListener("click", firstClick, { once: true });

    // MAIN pin
    const st = ScrollTrigger.create({
      trigger: fixedEl,
      start: "top top",
      end: "bottom bottom",
      pin: containerEl,
      pinSpacing: true,
      onUpdate: (self) => {
        if (snapping) return;
        const target = Math.min(9, Math.floor(self.progress * 10));
        if (target !== current && !animating) snapTo(current + (target > current ? 1 : -1));
      },
    });

    // END section (safer shrink to avoid white flash)
    const endST = ScrollTrigger.create({
      trigger: "#end-section",
      start: "top 75%",
      end: "bottom bottom",
      onUpdate: (self) => {
        const p = Math.max(0, (self.progress - 0.25) / 0.75);
        const h = 100 - p * 60;
        gsap.to(fixedContainerRef.current, { height: `${Math.max(40, h)}vh`, duration: 0.12, ease: "power1.out" });
        const moveY = -p * 200;
        gsap.to(headerRef.current,  { y: moveY * 1.5, duration: 0.12 });
        gsap.to(contentRef.current, { y: `calc(${moveY}px + (-50%))`, duration: 0.12 });
        gsap.to(footerRef.current,  { y: moveY * 0.5, duration: 0.12 });
      },
    });

    // cleanup
    return () => {
      document.removeEventListener("click", firstClick);
      [...leftEls, ...rightEls].forEach((el) => el.replaceWith(el.cloneNode(true)));
      st.kill(); endST.kill();
      splits.forEach((s) => s.revert());
      lenis.destroy();
    };
  }, [ready, play, enableAudio]);

  const staggerColumnsIn = () => {
    const left = Array.from(leftColRef.current?.querySelectorAll("[data-left]") || []);
    const right = Array.from(rightColRef.current?.querySelectorAll("[data-right]") || []);
    left.forEach((el, i) => setTimeout(() => el.classList.add("loaded"), i * 60));
    right.forEach((el, i) => setTimeout(() => el.classList.add("loaded"), i * 60 + 200));
  };

  return (
    <div className="relative w-full bg-white text-black font-['PP Neue Montreal',_sans-serif]">
      <style>{`
        :root { --text-color: rgba(245,245,245,0.9); }
        .artist, .category { opacity:0; transform:translateY(20px); transition:all .5s cubic-bezier(.16,1,.3,1); color:var(--text-color); cursor:pointer; position:relative; }
        .artist.loaded, .category.loaded { opacity:.3; transform:translateY(0); }
        .artist.active { opacity:1; transform:translateX(10px); padding-left:15px; }
        .artist.active::before { content:""; position:absolute; left:0; top:50%; transform:translateY(-50%); width:4px; height:4px; background:var(--text-color); border-radius:9999px; }
        .category.active { opacity:1; transform:translateX(-10px); padding-right:15px; }
        .category.active::after { content:""; position:absolute; right:0; top:50%; transform:translateY(-50%); width:4px; height:4px; background:var(--text-color); border-radius:9999px; }
        .bg-img { position:absolute; top:-10%; left:0; width:100%; height:120%; object-fit:cover; filter:brightness(.8); opacity:0; }
      `}</style>

      <LoadingOverlay ref={loadingOverlayRef} />

      <div className="scroll-container relative bg-white">
        <div ref={fixedSectionRef} className="h-[1100vh] relative bg-white">
          <div ref={fixedContainerRef} className="sticky top-0 left-0 h-screen w-full overflow-hidden will-change-transform origin-top bg-white">
            <Backgrounds images={BG} />
            <div className="grid grid-cols-12 gap-4 px-8 h-full relative z-[2]">
              <HeaderTitle ref={headerRef} />
              <div ref={contentRef} className="col-span-12 absolute top-1/2 left-0 -translate-y-1/2 w-full px-8 flex items-center justify-between">
                <div ref={leftColRef}><ListColumn items={LEFT} side="left" /></div>
                <Featured ref={featuredRef} titles={FEAT} />
                <div ref={rightColRef}><ListColumn items={RIGHT} side="right" /></div>
              </div>
              <FooterProgress ref={footerRef} />
            </div>
          </div>
        </div>

        <div id="end-section" className="h-screen relative bg-white flex items-center justify-center">
          <p className="transform rotate-90 sticky top-1/2 text-black text-2xl">fin</p>
        </div>
      </div>
    </div>
  );
}
