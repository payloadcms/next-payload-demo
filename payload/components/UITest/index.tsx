import React from 'react';
import { Label } from 'payload/components/forms'

export const UIField: React.FC = () => {
  return (
    <Label label="Hello from a custom UI component" required />
  )
}