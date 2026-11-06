/* Eye-level room scenes: back wall → floor → furniture → foreground, each layer
   moving at its own speed with the pointer (or phone tilt).

   Furniture is either a background-removed cut-out in /cutouts (`src`) or drawn
   in CSS (`kind`: mirror | coffee-table | tv-screen | pebbles | bedding) where the
   photo couldn't be cut out cleanly.

   Placement: x = horizontal centre (% of scene width)
              y = how far forward on the floor (0 = against the back wall, 1 = front edge)
              h = height as % of scene height
              wall: true → hung on the wall; `top` = % from the top instead of y
              flip: true → mirrored horizontally
              twin: true → second copy of a piece (no extra name tag) */
export const SCENES = {
  reception: {
    floor: 'marble',
    window: 'right',
    items: [
      { id: 'tv-unit', kind: 'tv-screen', x: 24, wall: true, top: 15, h: 28, twin: true },
      { id: 'tv-unit', src: '/cutouts/tv-unit.png', x: 25, wall: true, top: 47, h: 13 },
      { id: 'sofa', src: '/cutouts/sofa.png', x: 67, y: 0.04, h: 33 },
      { id: 'reception-table', src: '/cutouts/coffee-table.png', x: 60, y: 0.5, h: 20 },
    ],
  },
  dining: {
    floor: 'marble',
    window: 'left',
    items: [
      { id: 'bar-sideboard', kind: 'pebbles', x: 80, wall: true, top: 10, h: 30, twin: true },
      { id: 'display-cabinet', src: '/cutouts/display-cabinet.png', x: 14, y: 0.0, h: 70 },
      { id: 'bar-sideboard', src: '/cutouts/bar-sideboard.png', x: 80, y: 0.0, h: 46 },
      { id: 'dining-table', src: '/cutouts/dining-table.png', x: 48, y: 0.4, h: 52 },
    ],
  },
  master: {
    floor: 'wood',
    window: 'left',
    items: [
      { id: 'mirror-rack', kind: 'mirror', x: 6, y: 0.04, h: 62 },
      { id: 'vanity', src: '/cutouts/vanity.png', x: 20, y: 0.06, h: 50 },
      { id: 'wardrobe', src: '/cutouts/wardrobe.png', x: 85, y: 0.0, h: 58 },
      { id: 'bed', src: '/cutouts/bed.png', x: 52, y: 0.0, h: 44 },
      { id: 'bed', kind: 'bedding', x: 50, y: 0.14, h: 22, twin: true },
    ],
  },
  baby: {
    floor: 'wood',
    window: 'left',
    items: [
      { id: 'baby-wardrobe', src: '/cutouts/baby-wardrobe.png', x: 87, y: 0.0, h: 62, flip: true },
      { id: 'baby-commode', src: '/cutouts/baby-commode.png', x: 47, y: 0.04, h: 23 },
      // the small headboard part (oval walnut slot) faces the commode on both beds
      { id: 'baby-bed', src: '/cutouts/baby-bed.png', x: 26, y: 0.2, h: 47 },
      { id: 'baby-bed', src: '/cutouts/baby-bed-2.png', x: 68, y: 0.2, h: 47, twin: true },
    ],
  },
};
