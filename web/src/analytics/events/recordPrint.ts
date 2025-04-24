import gtag from '@/analytics/gtag';
import { type Paper } from '@/papers';

export interface PrintEventParameters {
  paper: Paper;
  cellSize: number;
  fontSize: number;
}

export default function recordPrint({
  paper,
  cellSize,
  fontSize,
}: PrintEventParameters) {
  gtag('event', 'print', {
    paper: paper.displayName,
    cell_size: cellSize,
    font_size: fontSize,
  });
}
