import styles from './BrandLogo.module.css';
/** Assinatura tipográfica provisória; não é o lettering final da marca. */
export function BrandLogo() { return <a className={styles.logo} href="#" aria-label="Dilo — início" onClick={event => event.preventDefault()}>dilo<span>.</span></a>; }
