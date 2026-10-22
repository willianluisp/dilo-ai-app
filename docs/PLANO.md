# Dilo — primeira entrega aprovada

Objetivo: design system, componentes reutilizáveis e login demonstrativo, sem autenticação, banco ou IA. Implementação autorizada no chat; sem commit, push ou deploy.

Arquitetura: React + TypeScript + Vite, CSS Modules e tokens semânticos, Motion para movimentos pontuais. Assets originais preservados. Fontes locais Manrope e Inter.

1. Configurar projeto e testes de comportamento do formulário (campos ausentes, visibilidade de senha, conclusão demonstrativa, cadastro e recuperação).
2. Criar tokens e componentes Button, TextField, PasswordField, BrandLogo, FormFeedback, DiloMascot e AuthLayout.
3. Integrar login responsivo: foco no primeiro erro, feedback acessível, nenhum armazenamento ou transmissão de credenciais.
4. Verificar testes, TypeScript, build e apresentação no navegador quando disponível.

Revisão: telas estreitas; teclado e zoom; redução de movimento; autofill; ausência de assets; contraste; mensagens que não confundam protótipo com serviço ativo.

Mascote: imagem original intacta. Estados idle, email, password, password-visible, thinking, success, curious. Renderer substituível recebe estado e alvo normalizado do ponteiro; a imagem estática não simula pupilas ou pálpebras. Nenhuma expressão facial nova é prometida nesta entrega.
