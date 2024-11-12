import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Controller } from 'react-hook-form';
import { TabList, Tab, Switch } from '@fluentui/react-components';
import { CustomInput, SectionList, SectionPanel } from '@celitoorg/components';
import styles from './index.module.scss';

interface PageBuilderFormViewProps {
  errors: any;
  control: any;
  formValues: Record<string, any>;
  updateValidationSchema: (schema: any) => void;
}

export const PageBuilderFormView: React.FC<PageBuilderFormViewProps> = ({
  errors,
  control,
  formValues,
  updateValidationSchema,
}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    setSections([generateSection()]);
  }, []);

  const generateSection = () => ({
    id: uuidv4(),
    name: '',
  });

  const onSectionNameChange = (sectionId: string, name: string) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, name } : section
    );
    setSections(updatedSections);
  };

  const onAddSection = () => setSections([...sections, generateSection()]);

  const onDeleteSection = (sectionId: string) =>
    setSections(sections.filter((section) => section.id !== sectionId));

  return (
    <>
      <TabList selectedValue="tab1">
        <Tab value="tab1">Design</Tab>
        <Tab value="tab2" disabled>
          Related Objects
        </Tab>
      </TabList>

      <div className={styles.container}>
        <div className="grid_container">
          <div className="grid_col_medium">
            <Controller
              name="label"
              control={control}
              render={({ field }) => (
                <CustomInput
                  label="Label"
                  component="input"
                  name="label"
                  required
                  errors={errors}
                  {...field}
                />
              )}
            />
          </div>

          <div className="grid_col_medium">
            <Controller
              control={control}
              name="view_type"
              render={({ field }) => (
                <CustomInput
                  label="View Type"
                  component="dropdown"
                  options={[
                    { text: 'Create', value: 'create' },
                    { text: 'Edit', value: 'edit' },
                    { text: 'View', value: 'view' },
                  ]}
                  errors={errors}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <div className={`${styles.section_switch} ${styles.alignLeft}`}>
          <Controller
            control={control}
            name="showSections"
            render={({ field: { onChange } }) => (
              <Switch
                label="Show Sections"
                checked={showSections}
                onChange={(_, data) => {
                  setShowSections(data.checked);
                  onChange(data.checked);
                }}
              />
            )}
          />
        </div>

        <div className={styles.sections_main_container}>
          {showSections && (
            <div className={styles.sections_sidebar}>
              <SectionList
                sections={sections}
                onAddSection={onAddSection}
                onDeleteSection={onDeleteSection}
                onSectionNameChange={onSectionNameChange}
              />
            </div>
          )}

          <div
            className={`${styles.sections_wrapper} ${!showSections ? 'full-width' : ''}`}
          >
            {sections.map((section) => (
              <SectionPanel
                errors={errors}
                key={section.id}
                control={control}
                name={section.name}
                sectionId={section.id}
                formValues={formValues}
                updateValidationSchema={updateValidationSchema}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
