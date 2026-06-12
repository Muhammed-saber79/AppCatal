// Baby Bed SVG — same vertical strip headboard as master but smaller, platform base
import BedSVG from './BedSVG';
export default function BabyBedSVG({ width = 260, height = 170 }) {
  return <BedSVG width={width} height={height} small={true} />;
}
