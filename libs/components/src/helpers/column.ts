import { Field, FieldSize, Row } from "../interfaces/field";
import { getFieldSizeNumber } from "./fields";

export const calculateColumnsOccupied = (row: Row) => row?.fields
  ?.map((item: Field) => getFieldSizeNumber(item.size))
  ?.reduce((acc: number, size: number) => acc + size, 0);

export const canResizeFieldColumn = (row: Row, currentSize: FieldSize, newSize: FieldSize): boolean => {
  if (!row) return false;

  const columnsOccupied = calculateColumnsOccupied(row);

  const currenSizeNumber = getFieldSizeNumber(currentSize);
  const newSizeNumber = getFieldSizeNumber(newSize);

  return (columnsOccupied - currenSizeNumber + newSizeNumber) <= 100;
}