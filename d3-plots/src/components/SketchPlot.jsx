import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";
import rough from "roughjs";

export default function SketchPlot({ barData }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !barData) return;

        // Clear previous plot
        containerRef.current.innerHTML = "";

        // Create and render the plot
        const plotElement = Plot.plot({
            width: 300,
            height: 200,
            x: { axis: null },
            y: { axis: null },
            marks: [Plot.rectY(barData, { x: "cat", y: "val", fill: "cat" })]
        });

        containerRef.current.appendChild(plotElement);

        // Apply rough.js to make the plot sketchy
        const svg = containerRef.current.querySelector("svg");
        if (svg) {
            const rc = rough.svg(svg);
            
            // Replace rectangles with rough versions
            svg.querySelectorAll("rect").forEach((rect) => {
                const x = parseFloat(rect.getAttribute("x") || "0");
                const y = parseFloat(rect.getAttribute("y") || "0");
                const width = parseFloat(rect.getAttribute("width") || "0");
                const height = parseFloat(rect.getAttribute("height") || "0");
                const fill = rect.getAttribute("fill") || "none";
                const stroke = rect.getAttribute("stroke") || "currentColor";
                const strokeWidth = parseFloat(rect.getAttribute("stroke-width") || "1");
                
                // Create rough rectangle
                const roughRect = rc.rectangle(x, y, width, height, {
                    roughness: 1.5,
                    fill: fill !== "none" ? fill : undefined,
                    stroke: stroke,
                    strokeWidth: strokeWidth,
                    fillStyle: "hachure"
                });
                
                rect.replaceWith(roughRect);
            });

            // Replace paths with rough versions
            svg.querySelectorAll("path").forEach((path) => {
                const d = path.getAttribute("d");
                if (d) {
                    const fill = path.getAttribute("fill") || "none";
                    const stroke = path.getAttribute("stroke") || "currentColor";
                    const strokeWidth = parseFloat(path.getAttribute("stroke-width") || "1");
                    
                    const roughPath = rc.path(d, {
                        roughness: 1.5,
                        fill: fill !== "none" ? fill : undefined,
                        stroke: stroke,
                        strokeWidth: strokeWidth,
                        fillStyle: "hachure"
                    });
                    
                    path.replaceWith(roughPath);
                }
            });
        }
    }, [barData]);

    return <div ref={containerRef} />;
}