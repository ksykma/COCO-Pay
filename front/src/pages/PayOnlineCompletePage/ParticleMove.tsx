import { useCallback, useEffect } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadConfettiPreset } from "tsparticles-preset-confetti";
import React from "react";

const ParticleMove = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );

  return (
    <Particles
      id="tsparticles"
      width="30"
      height="30"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          zIndex: 1,
        },
        emitters: {
          position: {
            x: 50,
            y: -30,
          },
          rate: {
            quantity: 5,
            delay: 0.15,
          },
        },
        particles: {
          color: {
            value: ['#FFD1DC', '#E0B0FF', '#A6F0C6', '#87CEEB', '#FFFFE0', '#B39EB5', '#FF6B6B', '#AFEEEE'],
          },
          move: {
            decay: 0.05,
            direction: "bottom",
            enable: true,
            gravity: {
              enable: true,
            },
            outModes: {
              top: "none",
              default: "destroy",
            },
            speed: {
              min: 30,
              max: 40,
            },
          },
          number: {
            value: 0,
          },
          opacity: {
            value: 1,
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            direction: "random",
            animation: {
              enable: true,
              speed: 30,
            },
          },
          tilt: {
            direction: "random",
            enable: true,
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 30,
            },
          },
          size: {
            value: 10,
            animation: {
              enable: true,
              startValue: "min",
              count: 1,
              speed: 16,
              sync: true,
            },
          },
          roll: {
            darken: {
              enable: true,
              value: 25,
            },
            enlighten: {
              enable: true,
              value: 25,
            },
            enable: true,
            speed: {
              min: 5,
              max: 15,
            },
          },
          wobble: {
            distance: 30,
            enable: true,
            speed: {
              min: -7,
              max: 7,
            },
          },
          shape: {
            type: ["circle", "square"],
            options: {},
          },
        },
        responsive: [
          {
            maxWidth: 1024,
            options: {
              particles: {
                move: {
                  speed: {
                    min: 33,
                    max: 66,
                  },
                },
              },
            },
          },
        ],
      }}
    />
  );
};

export default ParticleMove;
