import styles from './styles.module.css';
import Image from "next/image";

export default function ListItem({ data, type }: {
  data: any,
  type: string
}) {
  return (
    <div className={styles['list-item']}>
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
