import React, { ReactElement } from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  children: ReactElement;
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
