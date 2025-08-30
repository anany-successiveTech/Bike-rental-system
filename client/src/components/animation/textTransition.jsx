'use client';
import React from "react";
import TextTransition, { presets } from "react-text-transition";
import { useState, useEffect } from "react";

const TEXTS = ["Explore", "Book", "Ride"];

const TextAnimation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000 // every 2 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div>
      <h1>
        <TextTransition springConfig={presets.gentle}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h1>
    </div>
  );
};
export default TextAnimation;
