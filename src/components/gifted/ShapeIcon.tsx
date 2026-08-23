"use client";

import { useId } from "react";
import type { ShapeSize, ShapeSpec } from "@/lib/gifted/visualTypes";

const COLOR_HEX: Record<string, string> = {
  purple: "#6c5ce7",
  teal: "#00c2a8",
  yellow: "#ffc93c",
  orange: "#ff8a5c",
  pink: "#ff6f91",
  green: "#4cd97b",
  red: "#ff5c5c",
};

const SIZE_PX: Record<ShapeSize, number> = { sm: 40, md: 64, lg: 88 };

function regularPolygonPoints(sides: number, cx: number, cy: number, r: number, rotationDeg = -90): string {
  const pts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (rotationDeg + (360 / sides) * i) * (Math.PI / 180);
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(" ");
}

function starPoints(cx: number, cy: number, outerR: number, innerR: number, points = 5, rotationDeg = -90): string {
  const pts: string[] = [];
  const step = 360 / (points * 2);
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (rotationDeg + step * i) * (Math.PI / 180);
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(" ");
}

function SingleShapeIcon({ spec, pixelSize }: { spec: ShapeSpec; pixelSize?: number }) {
  const rawId = useId().replace(/[:]/g, "");
  const size = pixelSize ?? SIZE_PX[spec.size];
  const color = COLOR_HEX[spec.color] ?? "#6c5ce7";
  const cx = 50;
  const cy = 50;

  const fillAttrs =
    spec.fill === "solid"
      ? { fill: color, stroke: "none" }
      : spec.fill === "outline"
        ? { fill: "none", stroke: color, strokeWidth: 7 }
        : spec.fill === "striped"
          ? { fill: `url(#stripe-${rawId})`, stroke: color, strokeWidth: 3 }
          : { fill: `url(#dots-${rawId})`, stroke: color, strokeWidth: 3 };

  let shapeEl: React.ReactNode;
  switch (spec.shape) {
    case "circle":
      shapeEl = <circle cx={cx} cy={cy} r={36} />;
      break;
    case "square":
      shapeEl = <rect x={16} y={16} width={68} height={68} rx={6} />;
      break;
    case "diamond":
      shapeEl = <polygon points={regularPolygonPoints(4, cx, cy, 40, -90)} />;
      break;
    case "triangle":
      shapeEl = <polygon points={regularPolygonPoints(3, cx, cy, 40, -90)} />;
      break;
    case "pentagon":
      shapeEl = <polygon points={regularPolygonPoints(5, cx, cy, 38, -90)} />;
      break;
    case "hexagon":
      shapeEl = <polygon points={regularPolygonPoints(6, cx, cy, 38, -90)} />;
      break;
    case "star":
      shapeEl = <polygon points={starPoints(cx, cy, 40, 17, 5, -90)} />;
      break;
  }

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ transform: `rotate(${spec.rotation}deg)` }} className="shrink-0">
      <defs>
        <pattern id={`stripe-${rawId}`} patternUnits="userSpaceOnUse" width={12} height={12} patternTransform="rotate(45)">
          <rect width={12} height={12} fill="white" />
          <rect width={6} height={12} fill={color} />
        </pattern>
        <pattern id={`dots-${rawId}`} patternUnits="userSpaceOnUse" width={16} height={16}>
          <rect width={16} height={16} fill="white" />
          <circle cx={8} cy={8} r={4} fill={color} />
        </pattern>
      </defs>
      <g {...fillAttrs}>{shapeEl}</g>
    </svg>
  );
}

export default function ShapeIcon({ spec, pixelSize }: { spec: ShapeSpec; pixelSize?: number }) {
  if (spec.count && spec.count > 1) {
    const dotSize = (pixelSize ?? SIZE_PX[spec.size]) * 0.5;
    return (
      <div className="flex flex-wrap items-center justify-center gap-1" style={{ maxWidth: dotSize * 2.4 }}>
        {Array.from({ length: spec.count }).map((_, i) => (
          <SingleShapeIcon key={i} spec={spec} pixelSize={dotSize} />
        ))}
      </div>
    );
  }
  return <SingleShapeIcon spec={spec} pixelSize={pixelSize} />;
}
