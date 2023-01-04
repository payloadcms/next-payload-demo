import Link from 'next/link';
import React from 'react';
import { useBackgroundColor } from '../BackgroundColor';
import { Chevron } from '../icons/Chevron';
import classes from './index.module.scss';

export type Props = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
}

const elements = {
  a: 'a',
  link: Link,
  button: 'button',
}

export const Button: React.FC<Props> = ({
  el = 'button',
  label,
  newTab,
  href,
  appearance,
  className: classNameFromProps
}) => {
  const backgroundColor = useBackgroundColor();
  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  const Element = elements[el];
  const className = [classNameFromProps, classes[`appearance--${appearance}`], classes[`${appearance}--${backgroundColor}`], classes.button].filter(Boolean).join(' ');

  const elementProps = {
    ...newTabProps,
    href,
    className,
  }
  
  const content = (
    <div className={classes.content}>
      <Chevron />
      <span className={classes.label}>
        {label}
      </span>
    </div>
  )

  return null

  // return (
  //   <Element {...elementProps}>
  //     <React.Fragment>
  //       {el === 'link' && (
  //         <a {...newTabProps} href={href} className={elementProps.className}>
  //           {content}
  //         </a>
  //       )}
  //       {el !== 'link' && (
  //         <React.Fragment>
  //           {content}
  //         </React.Fragment>
  //       )}
  //     </React.Fragment>
  //   </Element>
  // )
}
