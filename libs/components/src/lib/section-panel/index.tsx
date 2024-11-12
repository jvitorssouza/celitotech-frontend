import React, { useEffect, useState } from 'react';
import { Field, Button, Accordion, AccordionItem, AccordionPanel, AccordionHeader } from '@fluentui/react-components';
import { v4 as uuidv4 } from 'uuid';
import { IoIosAdd } from 'react-icons/io';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';
import styles from './index.module.scss';
import { CustomInput } from '../custom-input';
import { Row, Field as IField, FieldSize } from '../../interfaces/field';
import { calculateColumnsOccupied } from '../../helpers/column';
import { fieldsMetadata } from '../../config/metadata';

interface SectionPanelProps {
  errors: any;
  control: any;
  name: string;
  sectionId: string;
  updateValidationSchema: (schema: any) => void;
}

const rowClassNames = `${styles.row} ${styles.mt16} grid_container`;

export const SectionPanel: React.FC<SectionPanelProps> = ({ sectionId, name, control, errors, updateValidationSchema }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [options, setOptions] = useState<any[]>([]);
  const [usedMetadata, setUsedMetadata] = useState<Record<string, any>>({});

  const loadOptions = (metadata: Record<string, any>): any => {
    const keys = Object?.keys(metadata);
    return fieldsMetadata?.map((item) => {
      const isFieldUsed = keys.some((key: string) => metadata[key] === item.value);
      // Desabilita as opções já selecionadas
      if (isFieldUsed) return { text: item.label, value: item.value, disabled: true };
      return { text: item.label, value: item.value, disabled: false };
    });
  };

  useEffect(() => {
    setOptions(loadOptions(usedMetadata)); // Atualiza as opções quando o metadado mudar
  }, [usedMetadata]); // Recalcula as opções quando usedMetadata mudar

  const generateField = (rowId: string, columnIndex: number): IField => {
    const fieldName = uuidv4().replaceAll('-', '');

    updateValidationSchema({
      [fieldName]: yup.string().required('Field Required'),
    });

    return {
      id: uuidv4(),
      size: 'small',
      name: fieldName,
      sectionId,
      row: rowId,
      column: columnIndex + 1,
    };
  };

  const generateFieldsArray = (rowId: string): IField[] => {
    return [...Array(3)].map((_, idx) => generateField(rowId, idx));
  };

  const generateRow = () => {
    const id = uuidv4();
    return {
      id,
      fields: generateFieldsArray(id),
    };
  };

  const addRow = () => setRows([...rows, generateRow()]);

  const canAddColumn = (row: Row) => {
    const columnsOccupied = calculateColumnsOccupied(row);
    return columnsOccupied < 99;
  };

  const addColumn = (rowId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId && canAddColumn(row)
          ? { ...row, fields: [...row.fields, generateField(rowId, row.fields.length)] }
          : row
      )
    );
  };

  const updateFieldSize = (rowId: string, fieldId: string, newSize: FieldSize) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              fields: row.fields.map((field) =>
                field.id === fieldId ? { ...field, size: newSize } : field
              ),
            }
          : row
      )
    );
  };

  const deleteField = (rowId: string, fieldId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? { ...row, fields: row.fields.filter((field) => field.id !== fieldId) }
          : row
      )
    );
  };

  const handleFieldChange = (fieldName: string, data: any) => {
    const newMetadata = { ...usedMetadata, [fieldName]: data };
    setUsedMetadata(newMetadata); // Atualiza o metadado com o novo valor
  };

  const getMetadataLabelByValue = (value: string) => fieldsMetadata.find((item) => item.value === value)?.label;

  const renderFields = (row: Row) =>
    row.fields.map((field) => (
      <div className={`grid_col_${field.size}`} key={field.id}>
        <Controller
          control={control}
          name={field.name}
          rules={{ required: { value: true, message: 'Field required' } }}
          render={({ field: controlled }) => {
            return (
              <CustomInput
                showMenu
                row={row}
                errors={errors}
                fieldData={field}
                component="dropdown"
                options={options} // Usa as opções atualizadas
                placeholder="+ Add Input"
                onDeleteField={() => deleteField(row.id, field.id)}
                {...controlled}
                value={getMetadataLabelByValue(controlled.value) ?? ''}
                onChange={(data: any) => {
                  controlled.onChange(data);
                  handleFieldChange(field.name, data); // Atualiza o metadado ao mudar o valor
                }}
                onUpdateFieldSize={(newSize: FieldSize) => updateFieldSize(row.id, field.id, newSize)}
              />
            );
          }}
        />
      </div>
    ));

  const renderRow = (row: Row) => (
    <div className={rowClassNames} key={row.id}>
      {renderFields(row)}
      {canAddColumn(row) && (
        <div className="grid_col_small">
          <Button onClick={() => addColumn(row.id)}>
            <IoIosAdd size={22} />
            <span>Add Column</span>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Accordion collapsible className={styles.accordion}>
      <AccordionItem value="1">
        <AccordionHeader className={styles.accordionHeader}>{name ?? 'Section Name'}</AccordionHeader>
        <AccordionPanel className={styles.accordionPanel}>
          {rows.map((row) => renderRow(row))}
          <Button className={`${styles.add_row} ${styles.mt16}`} onClick={addRow}>
            <IoIosAdd size={22} />
            <span>Add Row</span>
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
