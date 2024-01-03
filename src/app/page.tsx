"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Container from "@/components/container";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const title = "Animation standards";

  const STSettings: ScrollTrigger.Vars = {
    trigger: containerRef.current,
    start: "top 20%",
    end: "bottom top",
    scrub: 0.5,
  };

  useGSAP(
    () => {
      gsap.to(".wave-1", {
        y: -10,
        scrollTrigger: STSettings,
      });
      gsap.to(".heading", {
        y: 200,
        scrollTrigger: STSettings,
      });
      gsap.to(".wave-2", {
        y: -100,
        scrollTrigger: STSettings,
      });
      gsap.to(".wave-3", {
        y: -200,
        scrollTrigger: STSettings,
      });
    },
    { scope: containerRef },
  );

  return (
    <main className="min-h-screen">
      <div
        ref={containerRef}
        className="relative flex h-screen max-h-[60rem] flex-col items-center justify-center"
      >
        <Container className="z-20">
          <h1
            className="heading text-center text-8xl font-medium text-blue-800"
            ref={headingRef}
          >
            {title}
          </h1>
        </Container>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave-1 absolute bottom-20 z-10 scale-125"
        >
          <path
            fill="#f3f4f5"
            fillOpacity="1"
            d="M0,160L14.1,170.7C28.2,181,56,203,85,208C112.9,213,141,203,169,186.7C197.6,171,226,149,254,133.3C282.4,117,311,107,339,117.3C367.1,128,395,160,424,181.3C451.8,203,480,213,508,224C536.5,235,565,245,593,234.7C621.2,224,649,192,678,192C705.9,192,734,224,762,224C790.6,224,819,192,847,170.7C875.3,149,904,139,932,112C960,85,988,43,1016,42.7C1044.7,43,1073,85,1101,106.7C1129.4,128,1158,128,1186,144C1214.1,160,1242,192,1271,197.3C1298.8,203,1327,181,1355,197.3C1383.5,213,1412,267,1426,293.3L1440,320L1440,320L1425.9,320C1411.8,320,1384,320,1355,320C1327.1,320,1299,320,1271,320C1242.4,320,1214,320,1186,320C1157.6,320,1129,320,1101,320C1072.9,320,1045,320,1016,320C988.2,320,960,320,932,320C903.5,320,875,320,847,320C818.8,320,791,320,762,320C734.1,320,706,320,678,320C649.4,320,621,320,593,320C564.7,320,536,320,508,320C480,320,452,320,424,320C395.3,320,367,320,339,320C310.6,320,282,320,254,320C225.9,320,198,320,169,320C141.2,320,113,320,85,320C56.5,320,28,320,14,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave-2 absolute bottom-10 z-30 scale-110"
        >
          <path
            fill="#a2d9ff"
            fillOpacity="1"
            d="M0,224L20,208C40,192,80,160,120,160C160,160,200,192,240,218.7C280,245,320,267,360,250.7C400,235,440,181,480,165.3C520,149,560,171,600,197.3C640,224,680,256,720,234.7C760,213,800,139,840,133.3C880,128,920,192,960,186.7C1000,181,1040,107,1080,112C1120,117,1160,203,1200,245.3C1240,288,1280,288,1320,272C1360,256,1400,224,1420,208L1440,192L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="wave-3 absolute bottom-0 z-40 scale-y-150"
        >
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,32L60,69.3C120,107,240,181,360,197.3C480,213,600,171,720,165.3C840,160,960,192,1080,202.7C1200,213,1320,203,1380,197.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <div className="absolute bottom-0 z-40 h-16 w-full bg-[#0099ff]"></div>
      </div>
      <div className="h-screen"></div>
    </main>
  );
}
