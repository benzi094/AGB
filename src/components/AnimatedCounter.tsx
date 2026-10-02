"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in seconds
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.5,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16); // cap at ~60fps
    const step = (end - start) / (totalMiliseconds / incrementTime);

    let current = start;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-oswald tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
