import type { ReactNode } from 'react';
import { BrandLogo } from './BrandLogo';
import { DiloMascot, type MascotState } from './DiloMascot';
import { ReferenceMascotRenderer } from './ReferenceMascotRenderer';
import styles from './AuthLayout.module.css';

export function AuthLayout({ children, mascotState }: { children: ReactNode; mascotState: MascotState }) {
  return <div className={styles.shell}>
    <aside className={styles.brandPanel} aria-label="Dilo">
      <header className={styles.brandHeader}><BrandLogo /></header>
      <div className={styles.brandContent}>
        <div className={styles.mascotFrame}><DiloMascot state={mascotState} renderer={ReferenceMascotRenderer} /></div>
        <div className={styles.brandCopy}>
          <h1>Suas palavras,<br />{' '}do <span>seu jeito.</span></h1>
          <p>Transforme suas ideias em mensagens claras, naturais e prontas para enviar.</p>
        </div>
      </div>
    </aside>
    <main className={styles.main}><div className={styles.formArea}>{children}</div></main>
  </div>;
}

