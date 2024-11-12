import styles from './index.module.scss';

import { RiDeleteBin5Fill } from 'react-icons/ri';

import { Button, ButtonProps, Input, InputOnChangeData } from '@fluentui/react-components';
import React from 'react';

interface SectionItemProps {
  id: string;
  name: string;
  onDeleteSection: (sectionId: string) => void;
  onSectionNameChange: (sectionId: string, name: string) => void;
}

const DeleteButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      appearance="transparent"
      icon={<RiDeleteBin5Fill size={18} />}
      size="small"
    />
  );
};

export const SectionItem: React.FC<SectionItemProps> = ({ id, name, onDeleteSection, onSectionNameChange }) => {
  return (
    <div className={styles.section_item_container} key={id}>
      <Input
        size='large'
        color='#fff'
        value={name}
        appearance='underline'
        className='full-width m-16'
        contentAfter={<DeleteButton onClick={() => onDeleteSection(id)} />}
        onChange={(_, data: InputOnChangeData) => onSectionNameChange(id, data.value)}
      />
    </div>
  );
}
