import { Component, ElementRef, ViewChild } from '@angular/core';

const num_icons = 7;

// Mapping of indexes to icons: start from banana in middle of initial position and then upwards
const iconMap = [
  'bell',
  'cherries',
  'grapes',
  'lemon',
  'melon',
  'orange',
  'scatter',
];
// Width of the icons
const icon_width = 79;
// Height of one icon in the strip
const icon_height = 68.4;
// Max-speed in ms for animating one icon down
const time_per_icon = 100;
// Holds icon indexes
const indexes = [0, 0, 0];

@Component({
  selector: 'app-slot-machine-v2',
  standalone: true,
  imports: [],
  templateUrl: './slot-machine-v2.component.html',
  styleUrl: './slot-machine-v2.component.scss',
})
export class SlotMachineV2Component {
  @ViewChild('debugEle') debugEle: ElementRef;

  constructor() {
    setTimeout(() => this.rollAll(), 1000);
  }

  roll(reel, offset = 0) {
    // Minimum of 2 + the reel offset rounds
    const delta = (offset + 2) * num_icons + 2;

    // Return promise so we can wait for all reels to finish
    return new Promise((resolve, reject) => {
      const style = getComputedStyle(reel),
        // Current background position
        backgroundPositionY = parseFloat(style['background-position-y']),
        // Target background position
        targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
        // Normalized background position, for reset
        normTargetBackgroundPositionY =
          targetBackgroundPositionY % (num_icons * icon_height);

      console.log('role timer 1', (8 + 1 * delta) * time_per_icon);
      // Delay animation with timeout, for some reason a delay in the animation property causes stutter
      setTimeout(() => {
        // Set transition properties ==> https://cubic-bezier.com/#.41,-0.01,.63,1.09
        reel.style.transition = `background-position-y ${(8 + 1 * delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        // Set background position
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
      }, offset * 150);

      // After animation
      console.log(
        'role timer 2',
        (8 + 1 * delta) * time_per_icon + offset * 150,
      );
      setTimeout(
        () => {
          // Reset position, so that it doesn't get higher without limit
          reel.style.transition = `none`;
          reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
          // Resolve this promise
          resolve(delta % num_icons);
        },
        (8 + 1 * delta) * time_per_icon + offset * 150,
      );
    });
  }

  /**
   * Roll all reels, when promise resolves roll again
   */

  rollAll() {
    this.debugEle.nativeElement.textContent = 'rolling...';

    const reelsList = document.querySelectorAll('.slots > .reel');

    Promise
      // Activate each reel, must convert NodeList to Array for this with spread operator
      .all([...(reelsList as any)].map((reel, i) => this.roll(reel, i)))

      // When all reels done animating (all promises solve)
      .then((deltas) => {
        // add up indexes
        deltas.forEach(
          (delta: number, i) => (indexes[i] = (indexes[i] + delta) % num_icons),
        );
        this.debugEle.nativeElement.textContent = indexes
          .map((i) => iconMap[i])
          .join(' - ');

        // Win conditions
        if (indexes[0] === indexes[1] || indexes[1] == indexes[2]) {
          const winCls = indexes[0] == indexes[2] ? 'win2' : 'win1';
          document.querySelector('.slots').classList.add(winCls);
          setTimeout(
            () => document.querySelector('.slots').classList.remove(winCls),
            2000,
          );
        }

        // Again!
        // setTimeout(rollAll, 3000);
      });
  }
}
