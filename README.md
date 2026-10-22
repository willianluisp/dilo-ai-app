# Dilo — protótipo de login

## Abrir localmente

Requer Node.js 22.12+ (ou 24).

```powershell
npm install
npm run dev
```

Abra http://127.0.0.1:5173. Para parar, pressione Ctrl+C no terminal.

```powershell
npm test
npm run build
npm run preview
```

## Escopo

Design system, componentes reutilizáveis e login responsivo. Campos obrigatórios, validação de e-mail, mostrar/ocultar senha, recuperação/cadastro explicativos e confirmação demonstrativa. Nenhuma autenticação, API, IA, persistência ou envio de credenciais. Use dados fictícios. A senha é limpa após uma submissão válida.

As fontes Inter e Manrope são distribuídas localmente pelos pacotes Fontsource. A assinatura tipográfica é provisória, não uma reprodução exata do lettering de referência.

## Mascote

`public/assets/dilo-mascote-original.png` é uma cópia intacta da referência. O original permanece preservado. A imagem não foi redesenhada, recortada ou deformada. O movimento atual consiste em entrada por opacidade e inclinação pontual de até 1,5 grau; sem animação contínua. Com redução de movimento, não há deslocamento ou rotação.

`DiloMascot` aceita os estados idle, tracking, passwordHidden, passwordVisible, success e error. O renderer opcional recebe alvos globais suavizados como MotionValues. O campo de senha e o botão de visibilidade compartilham o grupo de foco. Olhos, mãos, piscadas e expressões NÃO estão animados no PNG atual. Consulte [o contrato e a lista exata de assets](docs/MASCOTE-ANIMACAO.md).

O login usa duas metades iguais sem margens externas no desktop e uma coluna compacta no celular. Avisos decorativos foram removidos; mensagens de cadastro, recuperação e envio continuam informando a ausência de autenticação quando acionados.
## Organização

- `src/styles/tokens.css`: cores semânticas e estilos globais.
- `src/components`: controles, marca, mascote e layout.
- `src/App.tsx`: comportamento demonstrativo do formulário.
- `src/App.test.tsx`: testes das interações.
- `docs/PLANO.md`: escopo e sequência da entrega aprovada.

Sem commit, push ou deploy nesta etapa.

