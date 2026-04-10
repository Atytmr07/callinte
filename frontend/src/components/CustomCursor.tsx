"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorSize = isHovered ? 60 : 16;

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - cursorSize / 2);
            mouseY.set(e.clientY - cursorSize / 2);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "button" ||
                target.tagName.toLowerCase() === "a" ||
                target.closest("button") ||
                target.closest("a")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorSize, mouseX, mouseY]);

    // Disable completely on mobile devices or touch screens
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 bg-blue-600 rounded-full mix-blend-multiply pointer-events-none z-[9999] flex items-center justify-center"
            style={{
                x: cursorX,
                y: cursorY,
                width: cursorSize,
                height: cursorSize,
                opacity: isHovered ? 0.4 : 0.8,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.3 : 0.8 }}
            transition={{ type: "tween", duration: 0.2 }}
        >
            {isHovered && <span className="absolute w-2 h-2 bg-white rounded-full"></span>}
        </motion.div>
    );
}
