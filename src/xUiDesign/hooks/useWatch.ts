import { useContext, useEffect, useState } from 'react';
import { FormContext } from '@/xUiDesign/components/Form';
import { RuleType } from '@/xUiDesign/types';
import { FormInstance } from '@/xUiDesign/types/form';

type UseWatchProps = {
  name?: string;
  defaultValue?: RuleType;
  form?: FormInstance;
};

export const useWatch = ({ name, defaultValue, form }: UseWatchProps) => {
  const formContext = useContext(FormContext);
  const formInstance = form || formContext;

  if (!formInstance) {
    throw new Error(
      'useWatch must be used within a Form or with a form instance.'
    );
  }

  const [value, setValue] = useState(() => {
    return name
      ? formInstance.getFieldValue(name) ?? defaultValue
      : formInstance.getFieldsValue() ?? defaultValue;
  });

  useEffect(() => {
    if (!name) {
      const unsubscribe = formInstance.subscribeToForm(setValue);

      return () => unsubscribe();
    }

    const unsubscribe = formInstance.subscribeToField(name, setValue);

    return () => unsubscribe();
  }, [name, formInstance]);

  return value;
};
