import { Button } from "@/components/ui/button";
import { ChevronsDown, ChevronsUp, Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Show = () => {
  const [content, setContent] = useState("");
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const selectedContent = JSON.parse(localStorage.getItem("selectedContent"));
    setContent(selectedContent);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const step = () => {
      if (contentRef.current && containerRef.current && isPlaying) {
        const maxScrollTop =
          contentRef.current.scrollHeight - containerRef.current.clientHeight;

        setScrollTop((prevScrollTop) =>
          Math.min(prevScrollTop + speed, maxScrollTop),
        );

        if (scrollTop < maxScrollTop) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          setIsPlaying(false); // Scroll sona ulaştığında durdur
        }
      }
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(step);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [speed, isPlaying]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [scrollTop]);

  const increaseSpeed = () =>
    setSpeed((prevSpeed) => Math.min(prevSpeed + 0.5, 5));
  const decreaseSpeed = () =>
    setSpeed((prevSpeed) => Math.max(prevSpeed - 0.5, 0));
  const togglePlayPause = () => setIsPlaying((prevIsPlaying) => !prevIsPlaying);

  return (
    <div className="relative h-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center p-10">
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
      >
        <div
          ref={contentRef}
          className="absolute top-0 w-full"
          style={{ fontSize: "5rem", lineHeight: "1.5" }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="flex space-x-4 p-4 m-4 bottom-4 bg-gray-800 h-[70px] bg-opacity-80 rounded-2xl">
          <Button onClick={togglePlayPause} size="icon">
            {isPlaying ? <Pause /> : <Play />}
          </Button>
          <div className="isolate flex -space-x-px">
            <Button
              onClick={decreaseSpeed}
              className="rounded-r-none bg-green-800 text-white hover:bg-green-800/80"
              size="icon"
            >
              <ChevronsDown />
            </Button>
            <Button className="rounded-none w-10">{speed * 2}</Button>
            <Button
              variant="destructive"
              onClick={increaseSpeed}
              className="rounded-l-none"
              size="icon"
            >
              <ChevronsUp />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
