'use client'

import React from 'react';
// import { Label } from 'payload/components/forms'
import './index.scss'

export const UIField: React.FC = () => {
  return (
    <React.Fragment>
      {/* <Label label="Hello from a custom UI component" required /> */}
      <p className="test">hello from a custom UI component</p>
    </React.Fragment>
  );
}