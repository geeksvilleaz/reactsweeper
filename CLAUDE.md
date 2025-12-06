# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReactSweeper is a classic Minesweeper game implementation built with React, Redux, TypeScript, and React Router. This is a learning project demonstrating modern React patterns and state management.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### State Management

The application uses Redux for global state management with a single `game` slice:

- **Store**: Configured in `src/store/store.ts` using Redux's `createStore`
- **Root Reducer**: Combines reducers in `src/store/rootReducer.ts`
- **Game Reducer**: Located at `src/store/game/game.reducers.ts`, manages all game state
- **Game Actions**: TypeScript discriminated union types in `src/store/game/game.actions.ts`

Redux actions:
- `init.game` - Initialize a new game with difficulty level
- `game.start` - Mark game as active (on first cell click)
- `game.over` - End game with loss
- `game.won` - End game with win
- `check.cell` - Update individual cell state (flagging/unknown)
- `update.cells` - Batch update cells (for recursive checking)

### Game Logic Hook

The `useGame` hook (`src/hooks/useGame.ts`) is the core game logic layer. It:

1. **Initializes games**: Creates cell grid, randomizes mine placement, calculates adjacent mine counts for each cell
2. **Handles cell interactions**:
   - Left-click checking with recursive reveal for zero-count cells
   - Right-click flag cycling (untouched → flagged → unknown → untouched)
3. **Manages game state**: Detects win/loss conditions, triggers game over states
4. **Returns callbacks**: `initGameCB`, `checkCellCB`, `setFlagStateCB`, `getNumMinesRemainingCB`, `gameOverCB`

**Important game mechanics**:
- Cells are stored in a flat array, indexed by position
- Position calculations use grid math: `id ± width` for vertical, `id ± 1` for horizontal
- Edge detection prevents out-of-bounds neighbor checks
- Recursive neighbor checking uses local cell array mutation before dispatching

### Type System

Global TypeScript types are defined in `src/typings/index.d.ts` under the `RS` namespace:

```typescript
RS.Game      // Game state interface
RS.Cell      // Individual cell data
RS.Store     // Redux store shape
```

### Constants

- `src/constants/gameConst.ts` - Difficulty levels (width, height, numMines)
- `src/constants/cellConst.ts` - Cell states (UNTOUCHED, FLAGGED, UNKNOWN, CHECKED, EXPLODED)

### Component Structure

- **Routes**: Configured in `src/components/Routes/Routes.tsx`
- **Pages**: `HomePage` and `AboutPage` in `src/pages/`
- **Game Components**:
  - `Gameboard` - Main game container
  - `GameHead` - Top panel with mine counter and reset button
  - `GameBody` - Cell grid
  - `Cell` - Individual cell component with click handlers
  - `Smiley` - Reset button with state-based expressions
  - `Timer` - Game timer display
  - `NumberDisplay` - Seven-segment style number display
  - `Digit` - Individual digit component

### Styling

- Uses SCSS (node-sass) for styling
- Component-specific styles co-located with components
- Global styles defined at app level

## Project Setup Notes

- Built with Create React App (React 17, TypeScript 4.0)
- Deployed to GitHub Pages at `http://geeksvilleaz.github.io/reactsweeper`
- No Redux DevTools currently configured
- Strict TypeScript mode enabled
