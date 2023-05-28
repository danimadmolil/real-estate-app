import React, { useEffect, useRef } from "react";
import "../lib/gsap/gsap/TweenMax.min.js";
console.log("Tween Max", window.TweenMax);
export default function LoadingAnimation() {
  const drop = useRef();
  const drop2 = useRef();
  const outline = useRef();
  const container = useRef();
  const svg = useRef();
  useEffect(() => {
    window.TweenMax.set([svg], {
      position: "relative",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
    });

    window.TweenMax.set([container.current], {
      position: "fixed",
      top: "100px",
      left: "89%",
      zIndex: 9999999999999999,
      xPercent: -50,
      yPercent: -50,
    });

    window.TweenMax.set(drop.current, {
      transformOrigin: "50% 50%",
    });

    var tl = new window.TimelineMax({
      repeat: -1,
      paused: false,
      repeatDelay: 0,
      immediateRender: false,
    });

    tl.timeScale(3);

    tl.to(drop.current, 4, {
      attr: {
        cx: 250,
        rx: "+=10",
        ry: "+=10",
      },
      ease: window.Back.easeInOut.config(3),
    })
      .to(
        drop2.current,
        4,
        {
          attr: {
            cx: 250,
          },
          ease: window.Power1.easeInOut,
        },
        "-=4"
      )
      .to(drop.current, 4, {
        attr: {
          cx: 125,
          rx: "-=10",
          ry: "-=10",
        },
        ease: window.Back.easeInOut.config(3),
      })
      .to(
        drop2.current,
        4,
        {
          attr: {
            cx: 125,
            rx: "-=10",
            ry: "-=10",
          },
          ease: window.Power1.easeInOut,
        },
        "-=4"
      );
  }, []);
  return (
    <div
      ref={container}
      className="container h-16 fixed top-[53px] w-52  z-[99999999999999999999999999999999]">
      <svg
        ref={svg}
        className="relative"
        style={{ width: "100%", height: "100%" }}
        viewBox="0 0 400 200">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -7"
              result="cm"
            />
            <feComposite in="SourceGraphic" in2="cm" />
          </filter>
          <filter id="f2" x="-200%" y="-40%" width="400%" height="200%">
            <feOffset in="SourceAlpha" dx="9" dy="3" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0.51" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.05" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#goo)" style={{ fill: "#FFFFFF" }}>
          <ellipse
            ref={drop}
            id="drop"
            cx="125"
            cy="90"
            rx="20"
            ry="20"
            fill-opacity="1"
            fill="#000000"
          />
          <ellipse
            ref={drop2}
            id="drop2"
            cx="125"
            cy="90"
            rx="20"
            ry="20"
            fill-opacity="1"
            fill="#000000"
          />
        </g>
      </svg>
    </div>
  );
}
