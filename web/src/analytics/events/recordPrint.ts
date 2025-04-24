import gtag from '@/analytics/gtag';
import { type Paper } from '@/papers';
import { type UnitName, NumberUnit } from '@/units';

export interface PrintEventParameters<
  CellUnit extends UnitName,
  FontUnit extends UnitName
> {
  paper: Paper;
  cellSize: NumberUnit<CellUnit>;
  cellUnit: CellUnit;
  fontSize: NumberUnit<FontUnit>;
  fontUnit: FontUnit;
}

export default function recordPrint<
  CellUnit extends UnitName,
  FontUnit extends UnitName
>({
  paper,
  cellSize,
  cellUnit,
  fontSize,
  fontUnit,
}: PrintEventParameters<CellUnit, FontUnit>) {
  gtag('event', 'print', {
    paper: paper.displayName,
    cell_size: cellSize,
    font_size: fontSize,
    cell_unit: cellUnit,
    font_unit: fontUnit,
  });
}
