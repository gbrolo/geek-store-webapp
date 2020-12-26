import {
  MOUNT,
  UNMOUNT,
} from './constants';

export function mount() {
  return {
    type: MOUNT,
  };
}

export function unmount() {
  return {
    type: UNMOUNT,
  };
}