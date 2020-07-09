import React from 'react';
import {Lists} from '../../common/interfaces';
import {bemClasses, defaultMods} from '../../common/bem';

export const List: React.FC<Lists.IList> = ({children, ...props}) => {
  const classBase = 'rcy-list';
  const className = bemClasses(classBase, defaultMods(props.mods), props.className);
    return (
      <ul className={className}>
        {children instanceof Array ? children.map((child, i) => (
          <li className={`${classBase}__item`} key={i}>{child}</li>
        )) : ''}
      </ul>
    );
};
