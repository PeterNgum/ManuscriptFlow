import React from 'react';
import { RatingInput } from './inputs/RatingInput';
import { TextInput } from './inputs/TextInput';
import { BooleanInput } from './inputs/BooleanInput';
import type { ReviewCriteria } from '../../../types/reviewTemplate';
import type { ReviewResponseInput } from '../../../types/reviewResponse';

interface ReviewCriterionInputProps {
  criterion: ReviewCriteria;
  value?: ReviewResponseInput;
  onChange: (value: ReviewResponseInput) => void;
  disabled?: boolean;
}

export function ReviewCriterionInput({
  criterion,
  value,
  onChange,
  disabled = false
}: ReviewCriterionInputProps) {
  const renderInput = () => {
    switch (criterion.response_type) {
      case 'rating':
        return (
          <RatingInput
            value={value?.rating_value}
            onChange={(rating) => onChange({ rating_value: rating })}
            disabled={disabled}
          />
        );
      case 'text':
        return (
          <TextInput
            value={value?.text_value}
            onChange={(text) => onChange({ text_value: text })}
            disabled={disabled}
          />
        );
      case 'boolean':
        return (
          <BooleanInput
            value={value?.boolean_value}
            onChange={(bool) => onChange({ boolean_value: bool })}
            disabled={disabled}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="text-sm font-medium text-gray-900 mb-1">
        {criterion.question}
        {criterion.required && <span className="text-red-500 ml-1">*</span>}
      </h4>
      {criterion.description && (
        <p className="text-sm text-gray-500 mb-2">
          {criterion.description}
        </p>
      )}
      <div className="mt-2">
        {renderInput()}
      </div>
    </div>
  );
}