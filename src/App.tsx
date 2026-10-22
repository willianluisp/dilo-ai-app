import { useState, type FormEvent } from 'react';

import { AuthLayout } from './components/AuthLayout';
import { Button, TextField, PasswordField, FormFeedback } from './components/Controls';
import { type MascotState } from './components/DiloMascot';
import styles from './App.module.css';

type Feedback = 'success' | 'signup' | 'recovery' | null;
export default function App() {
  const [state, setState] = useState<MascotState>('idle');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [feedback, setFeedback] = useState<Feedback>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next = { email: !email.trim() ? 'Informe seu e-mail.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? 'Confira o formato do e-mail.' : undefined, password: !password ? 'Informe sua senha.' : undefined };
    setErrors(next); setFeedback(null);
    if (next.email || next.password) { (form.elements.namedItem(next.email ? 'email' : 'password') as HTMLInputElement).focus(); setState('error'); return; }
    setState('success'); setPassword(''); setFeedback('success');
  }
  return <AuthLayout mascotState={state}>
    <div className={styles.intro}><h2>Bem-vindo de volta!</h2><p>Entre na sua conta.</p></div>
    <form className={styles.form} noValidate onSubmit={submit}>
      <TextField id="email" name="email" label="E-mail" type="email" autoComplete="email" inputMode="email" placeholder="voce@exemplo.com" required value={email} error={errors.email} onFocus={() => setState('idle')} onBlur={() => setState('idle')} onChange={event => { setEmail(event.target.value); setErrors(previous => ({ ...previous, email: undefined })); setFeedback(null); }} />
      <div onFocus={() => setState(visible ? 'passwordVisible' : 'passwordHidden')} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setState('idle'); }}>
      <PasswordField id="password" name="password" label="Senha" autoComplete="off" placeholder="Digite sua senha" required value={password} error={errors.password} onVisibilityChange={value => { setVisible(value); setState(value ? 'passwordVisible' : 'passwordHidden'); }} onChange={event => { setPassword(event.target.value); setErrors(previous => ({ ...previous, password: undefined })); setFeedback(null); }} />
      </div>
      <div className={styles.recovery}><button type="button" className={styles.textButton} onClick={() => setFeedback('recovery')}>Esqueceu a senha?</button></div>
      <Button type="submit">Entrar</Button>
    </form>
    <div className={styles.feedbackArea}>
      {feedback === 'success' && <FormFeedback title="Tudo certo com o formulário!" success>Nenhuma conta foi acessada. Esta é uma demonstração visual, e sua senha foi limpa.</FormFeedback>}
      {feedback === 'recovery' && <FormFeedback title="Recuperação de senha">Nenhum e-mail será enviado nesta prévia. A recuperação será conectada na etapa de autenticação.</FormFeedback>}
      {feedback === 'signup' && <FormFeedback title="Seu espaço no Dilo">O cadastro estará disponível na próxima etapa. Esta prévia não cria contas.</FormFeedback>}
    </div>
    <p className={styles.signup}>Não tem uma conta? <button type="button" className={styles.textButton} onClick={() => setFeedback('signup')}>Cadastre-se</button></p>
  </AuthLayout>;
}

