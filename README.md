# 🗡️ TOUTOS GUIDE TO COMBAT ⚔️

Um guia completo e imersivo para criaturas de Dungeons & Dragons, construído com Vue 3 e Vite para uma experiência medieval autêntica.

## 🌟 Características

- **📖 Interface Medieval**: Design inspirado em pergaminhos antigos e temas D&D
- **🎨 Visual Imersivo**: Cores temáticas douradas, marrons e detalhes medievais
- **🔍 Busca Inteligente**: Encontre criaturas rapidamente com pesquisa em tempo real
- **📱 Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **⚡ Performance Otimizada**: Carregamento paginado para experiência fluida
- **🎲 Detalhes Técnicos**: Estatísticas completas, habilidades e magias destacadas

## 🛠️ Tecnologias Utilizadas

- **Vue 3** - Framework progressivo para interfaces modernas
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Framework CSS utilitário
- **Markdown** - Sistema de conteúdo baseado em arquivos .md

## 📁 Estrutura do Projeto

```
src/
├── assets/creatures/     # Arquivos markdown das criaturas
├── components/
│   ├── CreatureList.vue  # Lista paginada de criaturas
│   ├── CreatureModal.vue # Modal detalhado da criatura
│   └── Title.vue         # Componente de título
├── utils/
│   └── creatureLoader.js # Utilitário de carregamento
└── views/
    └── HomeView.vue      # Página principal
```

## 🚀 Instalação e Uso

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd toutos_guide

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Build para Produção

```bash
# Gere os arquivos otimizados
npm run build

# Preview da build
npm run preview
```

## 🎮 Como Usar

1. **Busca**: Use a barra de pesquisa para encontrar criaturas específicas
2. **Navegação**: Clique em qualquer criatura para ver detalhes completos
3. **Paginação**: Use o botão "🗡️ Load More Creatures 🗡️" para carregar mais
4. **Detalhes**: No modal, veja estatísticas, habilidades e magias destacadas

## 🎨 Sistema de Destaques

O app destaca automaticamente elementos importantes:
- **🟡 Amarelo**: Estatísticas importantes, DCs, modificadores
- **🟤 Marrom**: Texto descritivo e narrativo
- **⚔️ Ícones**: Representação visual do tipo de criatura

## 📝 Adicionando Novas Criaturas

Para adicionar uma nova criatura:

1. Crie um arquivo `.md` em `src/assets/creatures/`
2. Use o formato frontmatter YAML + markdown
3. Exemplo:

```yaml
---
name: "Nome da Criatura"
size: "Medium monstrosity"
alignment: "chaotic evil"
challenge: "5 (1,800 XP)"
---

***Habilidade Especial.*** Descrição da habilidade.

### Actions

***Ataque.*** Descrição do ataque.
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir melhorias
- Adicionar novas criaturas
- Melhorar a documentação

## 📜 Licença

Este projeto é distribuído sob a licença MIT.

## 🙏 Agradecimentos

- Comunidade D&D por inspiração
- Vue.js e Vite por ferramentas incríveis
- Todos os contribuidores e jogadores de D&D

---

*"In a world of magic and mystery, knowledge is the greatest weapon."* ⚔️📚
