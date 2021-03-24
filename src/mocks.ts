export interface MockUser {
}

export interface MockPost {
}

export function createMockUser(): MockUser {
  return {
  };
}

export function createMockPost(): MockPost {
  return {
  };
}

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomCount(): number {
  return random(10, 50000);
}

function randomDate(): number {
  return Date.now() - random(100000000, 10000000000);
}
