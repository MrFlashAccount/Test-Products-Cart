import React, { FC, memo } from 'react';
import { css } from 'astroturf';

export const WithPrint: FC = memo(({ children }) => {
  return <span className={styles.withprint}>{children}</span>;
});

export const WithoutPrint: FC = memo(({ children }) => {
  return <span className={styles.withoutprint}>{children}</span>;
});

const styles = css`
  .withprint {
    display: none;

    @media print {
      display: initial;
    }
  }

  .withoutprint {
    @media print {
      display: none;
    }
  }
`;
