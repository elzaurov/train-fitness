import {personalBestExercises} from '../constants';
import {AppStorage} from './storage';

import moment from 'moment';
class PersonalBest {
  storage = new AppStorage('personal-best.logs');
  exercises = {};
  logs = {};

  constructor(exercises) {
    this.exercises = exercises;
    this.logs = Object.keys(this.exercises).reduce(
      (accumulator, item) => ({
        ...accumulator,
        [item]: [],
      }),
      {},
    );
    this.initialize();
  }

  async initialize() {
    let stored = {};
    try {
      stored = await this.storage.get();
      this.storage.set(this.logs);
    } finally {
      this.logs = Object.keys(this.exercises).reduce(
        (accumulator, item) => ({
          ...accumulator,
          [item]: stored[item] || [],
        }),
        {},
      );
      this.storage.set(this.logs);
    }
  }

  store(key, value) {
    if (this.logs[key]) {
      const createdAt = new Date();
      this.logs[key].push({value, createdAt});
      this.logs[key].sort((a, b) => b.value - a.value);
      this.storage.set(this.logs);
    }
  }

  getExerciseById(id) {
    const target = this.exercises[id];
    if (target) {
      target.id = id;
      target.logs = this.logs[id] ? this.logs[id].slice(0, 3) : [];
      return target;
    }
    return target;
  }

  getExerciseList(id) {
    return Object.keys(this.exercises).map((item) => ({
      key: item,
      label: this.exercises[item].name,
    }));
  }
}

export const personalBest = new PersonalBest(personalBestExercises);
