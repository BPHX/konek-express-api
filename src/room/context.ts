import { asClass } from 'awilix';
import RoomService from './room-service';
import RoomStore from './room-store';

const roomContext = {
  roomStore: asClass(RoomStore).scoped(),
  roomService: asClass(RoomService).scoped(),
};

export default roomContext;


// TypeScript is build upon on top of JavaScript so it has everything in JS and some additional features
// So any JS code is a valid TS code.

// Transpilation - give the TS code Typescript Compiler 
// and translate it to JS on run time so that the browser can read the code.

// npm is used to manage the packages and dependencies in your project, 
// while npx is used to execute the packages that are already installed in your project.

