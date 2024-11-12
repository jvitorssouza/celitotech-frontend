import styles from './index.module.scss';

import React, { forwardRef, useId, useState } from 'react';

// Icon Imports
import { IoIosMore } from 'react-icons/io';
import { FaRegEdit } from "react-icons/fa";
import { PiGitBranchThin } from "react-icons/pi";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoChevronDownSharp } from 'react-icons/io5';
import { AiOutlineColumnWidth } from "react-icons/ai";

// Types & Helpers Imports
import { FieldSize, Field as IField, Row } from '../../interfaces/field';
import { canResizeFieldColumn } from '../../helpers/column';

// Components Imports
import { Combobox, Option, Input, Button, Field, OptionGroup } from '@fluentui/react-components';
import { Menu, MenuItem, MenuList, MenuPopover, MenuProps, MenuTrigger } from '@fluentui/react-menu';

type ComponentType = 'input' | 'dropdown';

interface OptionType {
  text: string;
  value: string;
  disabled?: boolean;
  [key: string]: any;
}

type UpdateFieldSize = (newSize: FieldSize) => void;

interface CustomInputProps {
  row?: Row;
  errors: any;
  name: string;
  fieldData?: IField;
  label?: string;
  showMenu?: boolean;
  required?: boolean;
  placeholder?: string;
  component?: ComponentType;
  options?: Array<OptionType>;
  onDeleteField: () => void;
  onUpdateFieldSize: UpdateFieldSize;
  [key: string]: any;
}

type CombinedProps = CustomInputProps;

const FieldWidthSubmenu: React.FC<{ row?: Row; field?: IField, onUpdateFieldSize: UpdateFieldSize }> = ({ row, field, onUpdateFieldSize }) => {
  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps["onOpenChange"] = (e, data) => {
    setOpen(data.open);
  };

  const canResizeSmall = canResizeFieldColumn(row!, field!.size, 'small');
  const canResizeMedium = canResizeFieldColumn(row!, field!.size, 'medium');
  const canResizeLarge = canResizeFieldColumn(row!, field!.size, 'large');
  const canResizeXlarge = canResizeFieldColumn(row!, field!.size, 'xlarge');

  return (
    <Menu open={open} onOpenChange={onOpenChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem icon={<AiOutlineColumnWidth size={18} />}>Field Width</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem disabled={!canResizeSmall} onClick={() => onUpdateFieldSize('small')}>Small</MenuItem>
          <MenuItem disabled={!canResizeMedium} onClick={() => onUpdateFieldSize('medium')}>Medium</MenuItem>
          <MenuItem disabled={!canResizeLarge} onClick={() => onUpdateFieldSize('large')}>Large</MenuItem>
          <MenuItem disabled={!canResizeXlarge} onClick={() => onUpdateFieldSize('xlarge')}>Extra Large</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export const CustomInput = forwardRef<HTMLInputElement, CombinedProps>(({
  row,
  name,
  fieldData,
  label,
  errors,
  options,
  showMenu,
  required,
  component,
  placeholder,
  onDeleteField,
  onUpdateFieldSize,
  ...props
}, ref) => {
  const inputId = useId();
  const [isOpen, setOpen] = useState(false);

  const renderComponent = () => {
    if (component === 'dropdown') {
      return (
        <>
          <Combobox
            ref={ref}
            name={name}
            {...props}
            autoComplete="on"
            placeholder={placeholder}
            onClick={() => setOpen(!isOpen)}
            className={`${showMenu ? 'combobox_show_menu' : ''}`}
            expandIcon={showMenu ? null : <IoChevronDownSharp />}
            onOptionSelect={(_, data) => props.onChange(data.optionValue)}
            title='Select Field'
          >
            <OptionGroup label="Select Field">
              {options?.map((option) => (
                <Option key={option.value} value={option.value} disabled={option.disabled} text='OI'>
                  {option.text}
                </Option>
              ))}
            </OptionGroup>
          </Combobox>

          {showMenu && (
            <Menu>
              <MenuTrigger>
                <Button
                  appearance="transparent"
                  icon={<IoIosMore />}
                  title="Abrir Menu"
                  className='menu_trigger'
                />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<PiGitBranchThin size={18} />}>Set layout rules</MenuItem>
                  <FieldWidthSubmenu row={row} field={fieldData} onUpdateFieldSize={onUpdateFieldSize} />
                  <MenuItem icon={<FaRegEdit size={16} />}>Edit field</MenuItem>
                  <MenuItem icon={<RiDeleteBin5Fill size={18} color='#c50f1f' />} onClick={onDeleteField}>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          )}
        </>
      );
    }

    return <Input id={inputId} placeholder={label} {...props} />;
  };

  return (
    <Field
      label={label}
      className={styles.field} {...props}
      validationState={errors[name]?.message ? 'error' : 'none'}
      validationMessage={errors[name]?.message}
    >
      {renderComponent()}
    </Field>
  );
});
