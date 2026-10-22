import { useState, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react';
import { Eye, EyeOff, ArrowRight, CircleCheck, Info } from 'lucide-react';
import styles from './Controls.module.css';

export function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={styles.primary} {...props}><span>{children}</span><ArrowRight size={18} aria-hidden="true" /></button>;
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; trailing?: ReactNode };
export function TextField({ label, error, trailing, id, ...props }: FieldProps) {
  return <div className={styles.field}><label htmlFor={id}>{label}</label><div className={styles.inputWrap}><input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} {...props} />{trailing}</div>{error && <p className={styles.error} id={`${id}-error`}>{error}</p>}</div>;
}

export function PasswordField({ onVisibilityChange, ...props }: Omit<FieldProps, 'type' | 'trailing'> & { onVisibilityChange?: (visible: boolean) => void }) {
  const [visible, setVisible] = useState(false);
  return <TextField {...props} type={visible ? 'text' : 'password'} trailing={<button className={styles.eye} type="button" aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={visible} onClick={() => { setVisible(!visible); onVisibilityChange?.(!visible); }}>{visible ? <EyeOff size={19} /> : <Eye size={19} />}</button>} />;
}

export function FormFeedback({ title, children, success = false }: { title: string; children: ReactNode; success?: boolean }) {
  return <div className={styles.feedback} role="status">{success ? <CircleCheck size={19} aria-hidden="true" /> : <Info size={19} aria-hidden="true" />}<div><strong>{title}</strong><p>{children}</p></div></div>;
}
