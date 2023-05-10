import { Inch } from '../units';

export interface Paper {
  displayName: string;
  width: Inch;
  height: Inch;
}

export const PAPERS = {
  US_ENVELOPE_9: {
    displayName: 'US Envelope #9',
    width: 8.87,
    height: 3.87,
  } as Paper,
  US_ENVELOPE_10: {
    displayName: 'US Envelope #10',
    width: 9.5,
    height: 4.125,
  } as Paper,
};
