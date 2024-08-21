export interface Contest {
  _id: string;
  id: string;
  name: string;
  invitationLink: string;
  startingTime: Date | string;
  endingTime: Date | string;
  students: any[];
}

export interface ContestWithRecords {
  contest: Contest;
  record: any;
}
