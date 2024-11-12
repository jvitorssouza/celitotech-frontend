import { FieldSize } from "../interfaces/field";

export const getFieldSizeNumber = (fieldSize: FieldSize) => {
  switch (fieldSize) {
    case 'small': return 33;
    case 'medium': return 50;
    case 'large': return 66;
    case 'xlarge': return 100;
    default: return 0;
  }
};