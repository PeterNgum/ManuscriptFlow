import { useState } from 'react';
import { z } from 'zod';

interface UseFormProps<T> {
  schema: z.ZodType<T>;
  initialValues: T;
  onSubmit: (values: T) => Promise<void>;
}

export function useForm<T>({ schema, initialValues, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name as string]) {
      setErrors(prev => {
        const { [name as string]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      const validatedData = schema.parse(values);
      await onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            formattedErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  };
}