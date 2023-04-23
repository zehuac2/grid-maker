import { Inch } from '../units';

interface Paper {
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
};
