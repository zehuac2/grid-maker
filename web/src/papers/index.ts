import { Inch } from '../units';

export interface Paper {
  displayName: string;
  width: Inch;
  height: Inch;
}

export const PAPERS: Record<string, Paper> = {
  US_LETTER: {
    displayName: 'US Letter',
    width: 8.5 as Inch,
    height: 11 as Inch,
  },
  US_ENVELOPE_9: {
    displayName: 'US Envelope #9',
    width: 8.87 as Inch,
    height: 3.87 as Inch,
  },
  US_ENVELOPE_10: {
    displayName: 'US Envelope #10',
    width: 9.5 as Inch,
    height: 4.125 as Inch,
  },
};
