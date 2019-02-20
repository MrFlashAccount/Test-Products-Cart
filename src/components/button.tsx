import React from 'react';
import { Omit } from 'types';
import { css } from 'astroturf';

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  buttonStyle?: 'primary' | 'null';
  extraClass?: string;
};

export const Button: React.FC<ButtonProps> = ({ buttonStyle = 'primary', extraClass = '', ...props }) => {
  return <button className={`${styles.button} ${styles[buttonStyle]} ${extraClass}`} {...props} />;
};

const styles = css`
  .button {
    padding: 8px;
    width: 100%;

    font-size: 1rem;
    line-height: 24px;
    font-weight: 500;
    font-family: inherit;
    white-space: nowrap;

    border-radius: 100px;
    border: 1px solid transparent;

    transition: color 0.3s, background-color 0.3s;

    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.primary {
      color: #fff;
      background: #17c486;
    }

    &.null {
      &:hover {
        background-color: rgba(242, 243, 246, 0.5);
      }
    }

    &[disabled] {
      opacity: 0.5;
      cursor: initial;
    }
  }
`;
