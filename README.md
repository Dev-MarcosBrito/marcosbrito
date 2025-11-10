# Portfólio - Marcos Brito

<div align="center">
  
  
  Portfólio pessoal desenvolvido com **HTML5**, **CSS3** e **JavaScript vanilla**, sem frameworks externos.
  
  [🌐 Ver Site ao Vivo](https://dev-marcosbrito.github.io/marcosbrito/) • [📖 Documentação](#-descrição) • [🚀 Como Rodar](#-como-rodar-localmente)
</div>

---

O projeto foca em semântica, SEO, responsividade, acessibilidade e interações modernas.

## 📋 Descrição

Site portfólio profissional que apresenta projetos, habilidades e informações de contato do desenvolvedor Marcos Brito. Desenvolvido seguindo as melhores práticas de desenvolvimento web moderno, com foco em performance, acessibilidade e experiência do usuário.

## 🎨 Características

- ✅ **HTML5 Semântico** - Estrutura semântica com tags apropriadas
- ✅ **SEO Otimizado** - Meta tags, Open Graph e Twitter Cards
- ✅ **Design Responsivo** - Mobile-first com breakpoints em 480px, 768px e 1024px
- ✅ **Acessibilidade** - ARIA labels, navegação por teclado, contraste adequado
- ✅ **Menu Mobile** - Menu sempre visível com design elegante em formato de pills
- ✅ **Menu Ativo** - Destaque automático da seção atual durante o scroll
- ✅ **Carrossel de Projetos** - Navegação horizontal com scroll e botões
- ✅ **Botão Voltar ao Topo** - Aparece automaticamente ao rolar a página
- ✅ **Indicador de Progresso** - Barra de progresso de leitura no topo
- ✅ **Formulário de Contato** - Validação e integração com WhatsApp
- ✅ **Animações Suaves** - Fade-in nas seções e efeitos hover respeitando `prefers-reduced-motion`
- ✅ **Performance** - Lazy loading de imagens, preload de fontes, preconnect e otimizações
- ✅ **Skip Link** - Link de acessibilidade para pular ao conteúdo principal

## 📁 Estrutura de Pastas

```
/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos principais (inclui variáveis de cores)
├── js/
│   └── main.js            # JavaScript com todas as funcionalidades
├── src/
│   └── assets/            # Imagens e recursos
│       ├── about/         # Foto de perfil
│       ├── projects/      # Screenshots dos projetos
│       └── skills/        # Logos das tecnologias
└── README.md              # Este arquivo
```

## 🌐 Deploy

O site está disponível em: **[🔗 Ver Site ao Vivo](https://dev-marcosbrito.github.io/marcosbrito/)**

> 💡 **Deploy:** Site hospedado no GitHub Pages

## 🚀 Como Rodar Localmente

1. **Clone ou baixe o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd marcosbrito
   ```

2. **Abra o arquivo `index.html` no navegador**
   - Você pode usar um servidor local simples:
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js (http-server)
   npx http-server
   
   # Com PHP
   php -S localhost:8000
   ```

3. **Acesse no navegador**
   - Abra `http://localhost:8000` no seu navegador

## ⚙️ Configurações

### 📱 Editar Número do WhatsApp

Para configurar o número do WhatsApp, você precisa editar em **três lugares**:

1. **No arquivo `js/main.js`** - Botão "Contatar" (linha ~32):
   ```javascript
   const whatsappNumber = '+55SEUNUMEROAQUI'; // Substitua pelo seu número
   ```

2. **No arquivo `js/main.js`** - Formulário de contato (linha ~308):
   ```javascript
   const whatsappNumber = '+55SEUNUMEROAQUI'; // Substitua pelo seu número
   ```

3. **No arquivo `index.html`** - Link no footer (linha ~381):
   ```html
   <a href="https://wa.me/+55SEUNUMEROAQUI?text=Olá%20Marcos!" ...>
   ```

**Formato do número:**
- Use o formato internacional: `+5511999999999`
- Sem espaços, parênteses ou hífens
- Exemplo: `+5511987654321`

### 🎨 Personalizar Cores

As cores estão definidas no arquivo `css/style.css` nas variáveis CSS (linhas 4-11):

```css
:root {
    --primary: #4f46e5;      /* Cor primária (azul) */
    --secondary: #7c3aed;    /* Cor secundária (roxo) */
    --dark: #0f172a;         /* Fundo escuro */
    --darker: #0a0f1c;       /* Fundo mais escuro */
    --light: #e2e8f0;        /* Texto claro */
    --glass: rgba(255, 255, 255, 0.1); /* Efeito glass */
}
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização e animações
- **JavaScript (Vanilla)** - Funcionalidades interativas
- **Font Awesome** - Ícones (via CDN)

## 📱 Funcionalidades

### Menu Mobile
- Menu sempre visível em todas as resoluções
- Design elegante em formato de "pills" (botões arredondados) no mobile
- Links com fundo semitransparente e efeitos hover suaves
- Layout horizontal compacto que se adapta ao tamanho da tela
- **Menu Ativo**: Destaque automático da seção atual durante o scroll
- Atributos ARIA para acessibilidade

### Carrossel de Projetos
- Exibe 3 projetos por vez no desktop, 2 no tablet e 1 no mobile
- Navegação horizontal com scroll suave
- Botões "Anterior" e "Próximo" que navegam por grupos de projetos
- Suporte a arrastar (drag) em desktop
- Suporte a touch/swipe em mobile
- Imagens dos projetos em formato quadrado pequeno (180px de altura)
- Descrições concisas e elegantes
- Fallback para listagem vertical quando JS está desabilitado

### Formulário de Contato
- Validação de campos em tempo real
- Integração com WhatsApp
- Mensagens de erro/sucesso
- Labels acessíveis e placeholders descritivos

### Animações
- **Fade-in nas seções**: Animações de entrada suaves ao entrar na viewport
- Efeitos hover em cards e botões
- Transições suaves em todos os elementos interativos
- Respeita `prefers-reduced-motion` para acessibilidade

### Navegação e UX
- **Botão Voltar ao Topo**: Aparece após 300px de scroll com animação suave
- **Indicador de Progresso**: Barra no topo mostrando o progresso de leitura
- **Skip Link**: Link de acessibilidade para navegação por teclado
- Scroll suave entre seções

## ♿ Acessibilidade

O site foi desenvolvido seguindo as diretrizes WCAG 2.1:

- ✅ Navegação por teclado completa
- ✅ Skip link para pular ao conteúdo principal
- ✅ Atributos ARIA apropriados em todos os elementos interativos
- ✅ Contraste de cores adequado (WCAG AA)
- ✅ Foco visível em elementos interativos
- ✅ Textos alternativos descritivos em todas as imagens
- ✅ Estrutura semântica HTML5
- ✅ Suporte completo a leitores de tela
- ✅ Respeita `prefers-reduced-motion` para usuários sensíveis a movimento
- ✅ Indicadores de progresso com atributos ARIA

## 🌐 Compatibilidade

Testado e compatível com:
- ✅ Chrome (últimas versões)
- ✅ Firefox (últimas versões)
- ✅ Edge (últimas versões)
- ✅ Safari (últimas versões)
- ✅ Navegadores mobile (iOS Safari, Chrome Mobile)

## 📝 Licença

Este projeto é de uso pessoal. Todos os direitos reservados.

## 👤 Autor

**Marcos Brito**
- GitHub: [@dev-marcosbrito](https://github.com/Dev-MarcosBrito)
- LinkedIn: [Marcos Brito](https://www.linkedin.com/in/dev-marcos-brito/)

## 📞 Contato

Para entrar em contato, use o formulário no site ou envie uma mensagem via WhatsApp.

---

**Desenvolvido com ❤️ usando HTML5, CSS3 e JavaScript Vanilla**

