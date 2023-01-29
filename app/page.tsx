import Image from 'next/image';
import { graphql } from '../__generated__/graphql/gql';
import wave from '../public/wave.png';
import styles from './page.module.css';

const query = graphql(`
  query HomeQuery {
    hello
  }
`);

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <Image src={wave} alt="mizdra のアイコン" width={100} height={100} priority />
        </div>
        <p>HNの読みは「みずどら」です</p>
      </div>

      <div className={styles.center}>工事中</div>
    </main>
  );
}
