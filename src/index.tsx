import * as React from 'react';
import range from 'lodash.range';

import useStyles, { IParticle } from './styles';

const FORCE = 0.5; // 0-1 roughly the vertical force at which particles initially explode
const SIZE = 12; // max height for particle rectangles, diameter for particle circles
const FLOOR_HEIGHT = 800; // pixels the particles will fall from initial explosion point
const FLOOR_WIDTH = 1600; // horizontal spread of particles in pixels
const PARTICLE_COUNT = 150;
const DURATION = 3500;
const COLORS = ['#FFC700', '#FF0000', '#2E3191', '#41BBC7'];

interface IConfetti {
  particleCount?: number;
  duration?: number;
  colors?: string[];
  particleSize?: number;
  force?: number;
  height?: number;
  width?: number;
  // floorHeight and floorWidth are only for backwards compatibility
  floorHeight?: number;
  floorWidth?: number;
}

const createParticles = (count: number, colors: string[]): IParticle[] => {
  const increment = 360 / count;
  return range(count).map(index => ({
    color: colors[index % colors.length],
    degree: increment * index
  }));
};

function ConfettiExplosion({
  particleCount = PARTICLE_COUNT,
  duration = DURATION,
  colors = COLORS,
  particleSize = SIZE,
  force = FORCE,
  height = FLOOR_HEIGHT,
  width = FLOOR_WIDTH,
  floorHeight,
  floorWidth
}: IConfetti) {
  const particles = createParticles(particleCount, colors);
  const { classes } = useStyles({
    particles,
    duration,
    particleSize,
    force,
    width: floorWidth || width,
    height: floorHeight || height
  })();

  return (
    <div className={classes.container}>
      {particles.map((particle, i) => (
        <div id={`confetti-particle-${i}`} className={classes.particle} key={particle.degree}>
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default ConfettiExplosion;
