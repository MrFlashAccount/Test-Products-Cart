import React, { memo, FC } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Omit } from 'types';
import { css } from 'astroturf';
import { WithoutPrint } from './print';

export interface LinkProps extends Omit<RouterLinkProps, 'className'> {
  extraClass?: string;
}

export const Link: FC<LinkProps> = ({ extraClass = '', ...linkProps }) => {
  return (
    <WithoutPrint>
      <RouterLink {...linkProps} className={`${styles.link} ${extraClass}`} />
    </WithoutPrint>
  );
};

export const MemoizedLink = memo(Link);

const styles = css`
  .link {
    padding: 4px 8px;

    color: black;

    font-size: 1rem;
    line-height: 24px;
    font-weight: 500;
    font-family: inherit;
    white-space: nowrap;
    text-decoration: none;

    border: 1px solid transparent;

    transition: color 0.3s, background-color 0.3s;

    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    outline: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: #3f51b5;
    }

    &:visited {
      border: none;
    }

    &:active,
    &:focus,
    &:active:focus {
      color: #3f51b5;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;
