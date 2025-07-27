'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import ListItem from 'components/listitem/listitem';

export default function List({ step, set, path }: {
  step: number,
  set: Function,
  path: string
}) {
  const [data, setData] = useState<any>(null);
  const stepHeader = ['Environments', 'Channels', 'Messages']

  useEffect(() => {
    async function getData() {
      const res = await fetch(path);
      const parsed = await res.json();
      setData(parsed);
    }
    getData();
  }, []);

  return (
    <article>
      <h2>{stepHeader[step]}</h2>
      <div className={styles['list-container']}>
        {data && data.map((item: any, index: number) => <ListItem key={index} type={stepHeader[step]} data={item} />)}
      </div>
    </article>
  )
}
