export type FieldSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface Field {
  id: string;
  name: string;
  size: FieldSize;
  row: string;
  column: number;
  sectionId: string;
}

export interface Row {
  id: string;
  fields: Field[];
}
