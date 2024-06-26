export interface Contest {
  _id: string;

  id: string;

  name: string;

  invitationLink: string;

  startingTime: Date;

  endingTime: Date;

  students: any[];
}
