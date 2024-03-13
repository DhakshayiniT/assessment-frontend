import React, { ReactNode } from 'react';

interface ConditionProps {
  condition: boolean;
  children: ReactNode;
}

const ConditionComponent: React.FC<ConditionProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default ConditionComponent;
