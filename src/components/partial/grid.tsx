import React from 'react';
import { css } from 'astroturf';

export interface GridProps {}

export const Grid = React.memo<GridProps>(({ children }) => {
  return (
    <ul className={styles.list}>
      {React.Children.map(children, ch => {
        return <li className={styles.listItem} children={ch} />;
      })}
    </ul>
  );
});

const styles = css`
  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0 calc(var(--gap) * -1 / 2);

    list-style: none;
  }

  .listItem {
    --columns: 3;
    --width: calc(100% / var(--columns));
    --min: 280px;

    min-width: var(--min);
    width: var(--width);
    max-width: var(--width);

    flex: 0 1 var(--width);

    padding: calc(var(--gap) / 2);

    @media (max-width: 850px) {
      --columns: 2;
    }

    @media (max-width: 600px) {
      --columns: 1;
    }
  }
`;
