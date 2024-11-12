import styles from './index.module.scss';

import { Button } from '@fluentui/react-components';
import { SectionItem } from '../section-item';

import { IoIosAdd } from 'react-icons/io';
import { Section } from '../../interfaces';

interface SectionListProps {
  sections: Section[];
  onAddSection: () => void;
  onDeleteSection: (sectionId: string) => void;
  onSectionNameChange: (sectionId: string, name: string) => void;
}

export const SectionList: React.FC<SectionListProps> = ({ sections, onAddSection, onDeleteSection, onSectionNameChange }) => {
  return (
    <div className={styles.section_list_container}>
      {
        sections?.map((item: Section) => (
          <SectionItem id={item.id} name={item.name} onSectionNameChange={onSectionNameChange} onDeleteSection={onDeleteSection} />
        ))
      }

      <Button className={`full-width ${styles.add_section_button}`} onClick={onAddSection}>
        <IoIosAdd size={23} />
        <span> Add section </span>
      </Button>
    </div>
  );
}
