import { Organizer } from './organizer';

export interface Conference {
  id: number;
  picture: string;
  title: string;
  date: Date;
  adress: string;
  available_Places: number;
  organizers: Organizer[];
}
