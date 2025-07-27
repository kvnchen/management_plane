import styles from './styles.module.css';
import Image from "next/image";

export default function ListItem({ data, type, index, selected }: {
  data: any,
  type: string,
  index: number,
  selected: boolean
}) {
  return (
    <div 
      id={`${type}-${index}`}
      className={selected ? `${styles['list-item']} ${styles.selected}` : styles['list-item']}
    >
      {type === 'Environments' && (
        <>
          <h4>{data.title}</h4>
          <Image
            aria-hidden
            src="/kafka.svg"
            alt="Apache Kafka logo"
            width={70}
            height={70}
          />
          <div>{`Version: ${data.version}`}</div>
        </>
      )}
    </div>
  )
}
