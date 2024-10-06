// export function generateRotatingToDesiredMap(numPositions: number = 5): any {
//   const rotatingToDesiredMap = {};
//
//   for (
//     let currentPosition = 1;
//     currentPosition <= numPositions;
//     currentPosition++
//   ) {
//     rotatingToDesiredMap[currentPosition] = {};
//
//     for (let desiredImage = 1; desiredImage <= numPositions; desiredImage++) {
//       rotatingToDesiredMap[currentPosition][desiredImage] = {};
//
//       for (
//         let desiredPosition = 1;
//         desiredPosition <= numPositions;
//         desiredPosition++
//       ) {
//         let offset =
//           (desiredPosition - currentPosition + numPositions) % numPositions;
//         let translateY =
//           (offset - desiredImage + 1 + numPositions) % numPositions;
//
//         if (translateY > Math.floor(numPositions / 2)) {
//           translateY -= numPositions;
//         }
//
//         rotatingToDesiredMap[currentPosition][desiredImage][desiredPosition] =
//           translateY * 120;
//       }
//     }
//   }
//
//   return rotatingToDesiredMap;
// }

export const POSITION_UNIT = 88;

export const translationMap = {
  1: POSITION_UNIT * 6,
  2: POSITION_UNIT * 5,
  3: POSITION_UNIT * 4,
  4: POSITION_UNIT * 3,
  5: POSITION_UNIT * 2,
  6: POSITION_UNIT,
  7: 0,
  8: -POSITION_UNIT,
};

export const dataPositionMap = {
  [`${POSITION_UNIT * 6}`]: 1,
  [`${POSITION_UNIT * 5}`]: 2,
  [`${POSITION_UNIT * 4}`]: 3,
  [`${POSITION_UNIT * 3}`]: 4,
  [`${POSITION_UNIT * 2}`]: 5,
  [`${POSITION_UNIT}`]: 6,
  ['0']: 7,
  [`-${POSITION_UNIT}`]: 8,
};

export const visibilityMap = {
  1: 'hidden',
  2: 'visible',
  3: 'visible',
  4: 'visible',
  5: 'hidden',
  6: 'hidden',
  7: 'hidden',
  8: 'hidden',
};

export const rotatingToDesiredMap: {
  [symbolPosition: number]: {
    [desiredImage: number]: { [desiredPosition: number]: number };
  };
} = {
  1: {
    1: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 2,
      7: -POSITION_UNIT * 3,
      8: -POSITION_UNIT * 4,
    },
    2: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 2,
      7: -POSITION_UNIT * 3,
      8: -POSITION_UNIT * 4,
    },
    3: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: -POSITION_UNIT * 2,
      7: -POSITION_UNIT * 3,
      8: -POSITION_UNIT * 4,
    },
    4: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
      6: -POSITION_UNIT * 2,
      7: -POSITION_UNIT * 3,
      8: -POSITION_UNIT * 4,
    },
    5: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
      6: -POSITION_UNIT * 2,
      7: -POSITION_UNIT * 3,
      8: -POSITION_UNIT * 4,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  2: {
    1: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    2: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    3: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    4: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
    },
    5: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  3: {
    1: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    2: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    3: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    4: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    5: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  4: {
    1: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
    },
    2: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    3: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    4: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    5: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  5: {
    1: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    2: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
    },
    3: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    4: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    5: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  6: {
    1: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    2: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    3: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    4: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    5: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  7: {
    1: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 6,
      4: POSITION_UNIT * 5,
      5: POSITION_UNIT * 4,
      6: POSITION_UNIT * 3,
      7: POSITION_UNIT * 2,
      8: POSITION_UNIT,
    },
    2: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    3: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    4: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    5: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
  8: {
    1: {
      1: -POSITION_UNIT,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
    },
    2: {
      1: 0,
      2: -POSITION_UNIT,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
    },
    3: {
      1: POSITION_UNIT,
      2: 0,
      3: -POSITION_UNIT,
      4: POSITION_UNIT * 3,
      5: POSITION_UNIT * 2,
    },
    4: {
      1: POSITION_UNIT * 2,
      2: POSITION_UNIT,
      3: 0,
      4: -POSITION_UNIT,
      5: POSITION_UNIT * 3,
    },
    5: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
    },
    6: {
      1: POSITION_UNIT * 3,
      2: POSITION_UNIT * 2,
      3: POSITION_UNIT,
      4: 0,
      5: -POSITION_UNIT,
      6: -POSITION_UNIT * 4,
      7: -POSITION_UNIT * 5,
      8: -POSITION_UNIT * 6,
    },
    7: {
      1: POSITION_UNIT * 4,
      2: POSITION_UNIT * 3,
      3: POSITION_UNIT * 2,
      4: POSITION_UNIT,
      5: 0,
      6: -POSITION_UNIT * 3,
      7: -POSITION_UNIT * 4,
      8: -POSITION_UNIT * 5,
    },
    8: {
      1: POSITION_UNIT * 5,
      2: POSITION_UNIT * 4,
      3: POSITION_UNIT * 3,
      4: POSITION_UNIT * 2,
      5: POSITION_UNIT,
      6: 0,
      7: -POSITION_UNIT,
      8: -POSITION_UNIT * 2,
    },
  },
};

export function generateRotatingToDesiredMap(
  n: number,
): Record<number, Record<number, Record<number, number>>> {
  const arrayMap: Record<number, Record<number, Record<number, number>>> = {};
  const positionLoop: number[] = Array.from({ length: n }, (_, i) => n - i - 2);
  let indexLoop: number = 0;

  for (let k = 1; k <= n; k++) {
    arrayMap[k] = {};
    for (let i = 1; i <= n; i++) {
      arrayMap[k][i] = {};
      for (let j = 1; j <= n; j++) {
        arrayMap[k][i][j] = positionLoop[indexLoop] * POSITION_UNIT;
        if (j === n) continue;
        if (indexLoop === n - 1) {
          indexLoop = 0;
        } else {
          indexLoop++;
        }
      }
    }
    indexLoop++;
  }

  return arrayMap;
}
