"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCamera,
  FiHeart,
  FiUsers,
  FiSmile,
  FiStar,
  FiImage,
} from "react-icons/fi";

const slides = [
  {
    image: "/assets/image/theaterstudio.png",
    title: "Theater Studio",
    caption: "camera roll just got prettier.",
    icon: FiCamera,
  },
  {
    image: "/model/2.jpg",
    title: "Couple",
    caption: "proof that cute memories exist.",
    icon: FiHeart,
  },
  {
    image: "/model/3.jpg",
    title: "Besties",
    caption: "we kinda snapped.",
    icon: FiUsers,
  },
  {
    image: "/model/4.jpg",
    title: "Self Photo",
    caption: "main character energy unlocked.",
    icon: FiSmile,
  },
  {
    image: "/model/5.jpg",
    title: "Photo Box",
    caption: "soft moments, forever memories.",
    icon: FiStar,
  },
  {
    image: "/model/6.jpg",
    title: "Photo Session",
    caption: "too cute to stay in camera roll.",
    icon: FiImage,
  },
];

export default function StudioMoments() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const Icon = slides[current].icon;

  return (
  <section className="w-full border-b-[6px] border-black bg-blue-100 py-14 md:py-16">
    
    <div className="mx-auto max-w-4xl px-4">
      {/* Heading */}
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-pink-500">
          Studio Moments
        </p>

        <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
          ~ Every Picture Has A Story ~
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
          A few moments captured inside Studio Foto Ibuu.
        </p>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-[28px] border-4 border-black bg-white shadow-[7px_7px_0px_0px_#000]">

        {/* Image */}
        <div className="relative h-[240px] sm:h-[300px] md:h-[340px]">
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            priority
            className="object-cover transition-all duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-1.5 text-sm font-semibold shadow-[3px_3px_0px_0px_#000]">
                <Icon className="text-pink-500" size={16} />
                {slides[current].title}
              </div>

              <h3 className="max-w-xs text-xl font-black leading-tight text-white md:max-w-md md:text-3xl">
                {slides[current].caption}
              </h3>
            </div>

            {/* Desktop Arrow */}
            <div className="hidden gap-2 md:flex">
              <button
                onClick={prev}
                className="rounded-full border-2 border-black bg-white p-3 shadow-[3px_3px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <FiArrowLeft size={16} />
              </button>

              <button
                onClick={next}
                className="rounded-full border-2 border-black bg-pink-400 p-3 text-white shadow-[3px_3px_0px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-center gap-2 bg-white py-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-pink-500"
                  : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
}