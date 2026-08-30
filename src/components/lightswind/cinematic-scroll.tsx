"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CinematicScrollProps {
  children?: React.ReactNode;
  className?: string;
  blurLayers?: number;
  blurMax?: number;
  blurSize?: number; // in pixels
  accentColor?: string;
  showScrollbar?: boolean;
  isViewportOverlay?: boolean;
}

export const CinematicScroll = ({
  children,
  className,
  blurSize = 64,
  accentColor = "#1E5FD8",
  showScrollbar = true,
  isViewportOverlay = false,
}: CinematicScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // If used as a fixed viewport overlay for the whole page
  const { scrollYProgress: windowScrollProgress } = useScroll();

  // Container scroll for standalone component usage
  const { scrollYProgress: containerScrollProgress } = useScroll({
    container: isViewportOverlay ? undefined : scrollerRef,
  });

  const activeScrollProgress = isViewportOverlay ? windowScrollProgress : containerScrollProgress;

  // Spring smooth progress for the custom bar
  const scaleY = useSpring(activeScrollProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001,
  });

  if (isViewportOverlay) {
    return (
      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
        {/* Top Smooth Blur Mask */}
        <div
          className="absolute top-0 left-0 right-0 z-30 pointer-events-none overflow-hidden"
          style={{
            height: blurSize,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
          }}
        />

        {/* Bottom Smooth Blur Mask */}
        <div
          className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none overflow-hidden"
          style={{
            height: blurSize,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
          }}
        />

        {/* Custom High-Performance Spring Scrollbar */}
        {showScrollbar && (
          <div className="fixed top-2 right-2 bottom-2 w-1.5 z-50 pointer-events-none hidden sm:block">
            <motion.div
              className="w-full rounded-full origin-top will-change-transform"
              style={{
                scaleY,
                height: "100%",
                background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}dd)`,
                boxShadow: `0 0 10px ${accentColor}44`,
              }}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden rounded-xl border border-border bg-background",
        className
      )}
    >
      {/* Top Blur Mask */}
      <div
        className="absolute top-0 left-0 right-0 z-30 pointer-events-none overflow-hidden"
        style={{
          height: blurSize,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
        }}
      />

      {/* Bottom Blur Mask */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none overflow-hidden"
        style={{
          height: blurSize,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
        }}
      />

      {/* Custom Scrollbar */}
      {showScrollbar && (
        <div className="absolute top-2 right-2 bottom-2 w-1.5 z-40 pointer-events-none hidden sm:block">
          <motion.div
            className="w-full rounded-full origin-top will-change-transform"
            style={{
              scaleY,
              height: "100%",
              background: `linear-gradient(to bottom, ${accentColor}, ${accentColor}dd)`,
              boxShadow: `0 0 10px ${accentColor}44`,
            }}
          />
        </div>
      )}

      {/* Main Scrollable Content */}
      <div
        ref={scrollerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="px-6 py-12">{children}</div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CinematicScroll;
