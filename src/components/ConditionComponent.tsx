// ConditionComponent.tsx
import React from 'react';

interface ConditionProps {
  condition: boolean;
}

const ConditionComponent: React.FC<ConditionProps> = ({ condition, children }) => {
  return (
    <>
      {condition && children}
    </>
  );
};

export default ConditionComponent;
