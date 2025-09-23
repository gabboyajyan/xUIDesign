import { useEffect, useState } from 'react';
import type { FormInstance } from '../types/form';

export function useWatchError(form: FormInstance, name: string): string[] | undefined {
  const [errors, setErrors] = useState<string[] | undefined>(form.getFieldError(name));

  useEffect(() => {
    // Subscribe directly to error changes
    const unsubscribe = form.subscribeToError?.(name, (newErrors: string[] | undefined) => {
      setErrors(newErrors);
    });

    // Initialize on mount
    setErrors(form.getFieldError(name));

    return unsubscribe;
  }, [form, name]);

  return errors;
}
