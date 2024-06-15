export interface Contest {
  _id: string;

  id: string;

  name: string;

  startingTime: Date;

  endingTime: Date;

  students: any[];
}
