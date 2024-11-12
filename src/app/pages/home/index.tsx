import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogActions,
  DialogSurface,
} from '@fluentui/react-components';
import { PageBuilderFormView } from '../../views/page-builder-form.view';

export const FIELD_REQUIRED_MESSAGE = 'Field Required';

export const YUP_REQUIRED_STRING = yup.string().required(FIELD_REQUIRED_MESSAGE);

export interface SetSchemaParameter {
  [key: string]: yup.StringSchema<string, yup.AnyObject, undefined, "">
}

export const HomePage = () => {
  const [validationSchema, setValidationSchema] = useState({
    label: yup.string().required(FIELD_REQUIRED_MESSAGE)
  });

  const getSchema = () => yup.object().shape(validationSchema);

  const { 
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(getSchema()),
  });

  const formId = "page-layout-builder-form";

  const formValues = getValues();

  const updateValidationSchema = (newFieldSchema: SetSchemaParameter) => {
    setValidationSchema((prevSchema) => ({
      ...prevSchema,
      ...newFieldSchema,
    }));
  };

  const onSubmit = (data: any) => {
    console.log({ data });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface className='full-width max-width-full-size' style={{ minHeight: '100%' }}>
          <DialogBody>
            <DialogTitle>Page Layout Builder</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit(onSubmit)} id={formId}>
                <PageBuilderFormView 
                  errors={errors}
                  control={control}
                  formValues={formValues}
                  updateValidationSchema={updateValidationSchema}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary" type='submit' form={formId}>Submit</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};
