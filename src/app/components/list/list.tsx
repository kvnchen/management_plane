'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ListItem from 'components/listitem/listitem';

export default function List({ step, set, path, mode, isDisabled }: {
  step: number,
  set: Function,
  path: string,
  mode: 'one' | 'many',
  isDisabled: boolean
}) {
  const [data, setData] = useState<any>(null);
  const [selection, setSelection] = useState<Set<number>>(new Set());
  const stepHeader = ['Environments', 'Channels', 'Messages']

  useEffect(() => {
    async function getData() {
      const res = await fetch(path);
      const parsed = await res.json();
      setData(parsed);
    }
    getData();
  }, []);

  function selectionHandler(target: HTMLElement) {
    let ele;

    // don't capture clicks on the container
    if (target.id === `list-container-${step}`)
      return;
    else if (target.id === '') {
      ele = target.parentElement as HTMLElement;
    } else 
      ele = target;

    const index: number = Number(ele.id.split('-')[1]);

    if (mode === 'one') {
      const temp: Set<number> = new Set();

      if (!selection.has(index)) {
        temp.add(index);
      }
      setSelection(temp);

      if (temp.size > 0)
        set(data[index]);
      else
        set(null);
    } else {
      const temp: Set<number> = new Set(selection);

      if (temp.has(index)) {
        temp.delete(index);
      } else {
        temp.add(index);
      }
      
      setSelection(temp);

      if (temp.size > 0) {
        set(Array.from(temp).map((index) => data[index]));
      } else
        set(null);
    }
  }

  return (
    <article className={styles.list}>
      <h2>{stepHeader[step]}</h2>
      <div
        id={`list-container-${step}`}
        className={styles['list-container']}
        onClick={(e) => {
          if (!isDisabled)
            selectionHandler(e.target as HTMLElement)
        }}
      >
        {data && data.map((item: any, index: number) => {
          return <ListItem 
                  key={index} 
                  type={stepHeader[step]} 
                  index={index}
                  data={item}
                  selected={selection.has(index)}
                  />
        })}
      </div>
    </article>
  )
}
