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

export interface CreateContestDto {
  id: string;
  name: string;
  invitationLink: string;
  students: string[];
  startingTime: string;
  endingTime: string;
}

export type UpdateContestDto = Partial<CreateContestDto> & { _id: string };
