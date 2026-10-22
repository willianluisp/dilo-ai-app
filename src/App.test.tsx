import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Protótipo de login', () => {
  it('aponta os campos ausentes e leva o foco ao primeiro erro', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^Entrar/ }));
    expect(screen.getByLabelText('E-mail')).toHaveFocus();
    expect(screen.getByText('Informe seu e-mail.')).toBeVisible();
    expect(screen.getByText('Informe sua senha.')).toBeVisible();
  });
  it('permite revelar a senha sem enviar o formulário', async () => {
    render(<App />);
    const password = screen.getByLabelText('Senha', { exact: true });
    expect(password).toHaveAttribute('type', 'password');
    await userEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(password).toHaveAttribute('type', 'text');
    await userEvent.click(screen.getByRole('button', { name: 'Ocultar senha' }));
    expect(password).toHaveAttribute('type', 'password');
  });
  it('conclui somente a demonstração e limpa a senha', async () => {
    render(<App />);
    await userEvent.type(screen.getByLabelText('E-mail'), 'teste@example.com');
    await userEvent.type(screen.getByLabelText('Senha', { exact: true }), 'senha-ficticia');
    await userEvent.click(screen.getByRole('button', { name: /^Entrar/ }));
    expect(await screen.findByText('Tudo certo com o formulário!')).toBeVisible();
    expect(screen.getByLabelText('Senha', { exact: true })).toHaveValue('');
    expect(screen.getByText(/Nenhuma conta foi acessada/)).toBeVisible();
  });
  it('explica recuperação e cadastro sem prometer operações reais', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Esqueceu a senha?' }));
    expect(screen.getByText(/Nenhum e-mail será enviado/)).toBeVisible();
    await userEvent.click(screen.getByRole('button', { name: 'Cadastre-se' }));
    expect(screen.getByText(/O cadastro estará disponível/)).toBeVisible();
  });
});

it('mantém o estado de senha ao alternar visibilidade e retorna ao sair do grupo', async () => {
  const { container } = render(<App />);
  const mascot = () => container.querySelector('[data-mascot-state]');
  await userEvent.click(screen.getByLabelText('Senha', { exact: true }));
  expect(mascot()).toHaveAttribute('data-mascot-state', 'passwordHidden');
  await userEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));
  expect(mascot()).toHaveAttribute('data-mascot-state', 'passwordVisible');
  await userEvent.click(screen.getByRole('button', { name: 'Ocultar senha' }));
  expect(mascot()).toHaveAttribute('data-mascot-state', 'passwordHidden');
  await userEvent.tab();
  expect(screen.getByRole('button', { name: 'Esqueceu a senha?' })).toHaveFocus();
  expect(mascot()).toHaveAttribute('data-mascot-state', 'idle');
});
