# Mini Seller Console - Usage Instructions

## 🚀 How to Run the Project

### 1. Install Dependencies

```bash
bun install
```

### 2. Run in Development Mode

```bash
bun run dev
```

The application will be available at: **http://localhost:5173**

### 3. Build for Production

```bash
bun run build
```

### 4. Preview Build

```bash
bun run preview
```

## 📱 How to Use the Application

### Main Navigation

- **"Leads" Tab**: View and manage leads
- **"Opportunities" Tab**: View converted opportunities

### Lead Features

#### 🔍 Search and Filters

- **Search**: Type name or company in the search bar
- **Status Filter**: Select "All Status", "New", "Contacted" or "Qualified"
- **Sorting**: Choose field (Score, Name, Company, Status) and direction (↑↓)

#### 📝 View and Edit Lead

1. Click on any row in the leads table
2. The side panel will open with details
3. Click "Edit Lead" to edit
4. Modify desired fields (name, email, company, status)
5. Click "Save" to save or "Cancel" to discard

#### 🔄 Convert Lead to Opportunity

1. Open the lead detail panel
2. Click "Convert to Opportunity"
3. Fill in the opportunity data:
   - **Name**: Opportunity name
   - **Account Name**: Account name
   - **Stage**: Opportunity stage
   - **Amount**: Value (optional)
4. Click "Convert"

### Opportunity Features

- View all converted opportunities
- Information includes: name, stage, value, account, creation date
- Data is persisted in localStorage

## 🎨 UX Features

### Visual States

- **Loading**: Spinner during loading
- **Empty**: Message when no data
- **Error**: Error message with "Try Again" button

### Responsiveness

- **Desktop**: Full layout with side panel
- **Mobile**: Adapted layout with full-screen modals

### Persistence

- Filters and sorting are automatically saved
- Opportunities are persisted in browser
- Settings are restored when reloading the page

## 🧪 Included Simulations

### Network Latency

- Lead loading: ~800ms
- Lead update: ~500ms
- Conversion: ~600ms

### Simulated Failures

- Lead update: 10% failure chance
- Conversion: 5% failure chance
- Realistic error messages

## 📊 Sample Data

The project includes 100 sample leads with:

- **Names**: Realistic Brazilian names
- **Companies**: Startups and technology companies
- **Emails**: Valid formats
- **Sources**: Website, Referral, LinkedIn, Email Campaign
- **Scores**: 76-95 (realistic distribution)
- **Status**: New, Contacted, Qualified

## 🔧 Troubleshooting

### Lead Loading Error

- Check if `public/data/leads.json` file exists
- Reload the page
- Use "Try Again" button if available

### Persistence Issues

- Check if localStorage is enabled
- Clear browser cache if necessary

### Performance

- Application is optimized for ~100 leads
- For larger volumes, consider implementing pagination

## 🎯 Implemented Features

### ✅ MVP (Required Requirements)

- [x] Leads list with search, filter and sorting
- [x] Detail panel with inline editing
- [x] Lead to opportunity conversion
- [x] UX states (loading, empty, error)
- [x] Performance optimized for 100 leads

### ✅ Nice-to-Haves

- [x] localStorage persistence
- [x] Optimistic updates with rollback
- [x] Responsive layout (desktop → mobile)

## 🏆 Technologies Used

- **React 18**: User interface
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **ESLint**: Code quality

## 📚 Additional Documentation

- **README.md**: Project overview
- **INSTRUCTIONS.md**: This file with usage instructions

---

# Mini Seller Console - Instruções de Uso

## 🚀 Como Executar o Projeto

### 1. Instalação das Dependências

```bash
bun install
```

### 2. Executar em Modo de Desenvolvimento

```bash
bun run dev
```

A aplicação estará disponível em: **http://localhost:5173**

### 3. Build para Produção

```bash
bun run build
```

### 4. Preview da Build

```bash
bun run preview
```

## 📱 Como Usar a Aplicação

### Navegação Principal

- **Tab "Leads"**: Visualizar e gerenciar leads
- **Tab "Opportunities"**: Visualizar oportunidades convertidas

### Funcionalidades dos Leads

#### 🔍 Busca e Filtros

- **Busca**: Digite nome ou empresa na barra de busca
- **Filtro por Status**: Selecione "All Status", "New", "Contacted" ou "Qualified"
- **Ordenação**: Escolha o campo (Score, Name, Company, Status) e direção (↑↓)

#### 📝 Visualizar e Editar Lead

1. Clique em qualquer linha da tabela de leads
2. O painel lateral será aberto com os detalhes
3. Clique em "Edit Lead" para editar
4. Modifique os campos desejados (nome, email, empresa, status)
5. Clique em "Save" para salvar ou "Cancel" para descartar

#### 🔄 Converter Lead para Oportunidade

1. Abra o painel de detalhes do lead
2. Clique em "Convert to Opportunity"
3. Preencha os dados da oportunidade:
   - **Nome**: Nome da oportunidade
   - **Account Name**: Nome da conta
   - **Stage**: Estágio da oportunidade
   - **Amount**: Valor (opcional)
4. Clique em "Convert"

### Funcionalidades das Oportunidades

- Visualize todas as oportunidades convertidas
- Informações incluem: nome, stage, valor, conta, data de criação
- Dados são persistidos no localStorage

## 🎨 Recursos de UX

### Estados Visuais

- **Loading**: Spinner durante carregamento
- **Empty**: Mensagem quando não há dados
- **Error**: Mensagem de erro com botão "Try Again"

### Responsividade

- **Desktop**: Layout completo com painel lateral
- **Mobile**: Layout adaptado com modais full-screen

### Persistência

- Filtros e ordenação são salvos automaticamente
- Oportunidades são persistidas no navegador
- Configurações são restauradas ao recarregar a página

## 🧪 Simulações Incluídas

### Latência de Rede

- Carregamento de leads: ~800ms
- Atualização de lead: ~500ms
- Conversão: ~600ms

### Falhas Simuladas

- Atualização de lead: 10% de chance de falha
- Conversão: 5% de chance de falha
- Mensagens de erro realísticas

## 📊 Dados de Exemplo

O projeto inclui 100 leads de exemplo com:

- **Nomes**: Brasileiros realísticos
- **Empresas**: Startups e empresas de tecnologia
- **Emails**: Formatos válidos
- **Sources**: Website, Referral, LinkedIn, Email Campaign
- **Scores**: 76-95 (distribuição realística)
- **Status**: New, Contacted, Qualified

## 🔧 Solução de Problemas

### Erro de Carregamento de Leads

- Verifique se o arquivo `public/data/leads.json` existe
- Recarregue a página
- Use o botão "Try Again" se disponível

### Problemas de Persistência

- Verifique se o localStorage está habilitado
- Limpe o cache do navegador se necessário

### Performance

- A aplicação é otimizada para ~100 leads
- Para volumes maiores, considere implementar paginação

## 🎯 Funcionalidades Implementadas

### ✅ MVP (Requisitos Obrigatórios)

- [x] Lista de leads com busca, filtro e ordenação
- [x] Painel de detalhes com edição inline
- [x] Conversão de leads para oportunidades
- [x] Estados de UX (loading, empty, error)
- [x] Performance otimizada para 100 leads

### ✅ Nice-to-Haves

- [x] Persistência no localStorage
- [x] Atualizações otimistas com rollback
- [x] Layout responsivo (desktop → mobile)

## 🏆 Tecnologias Utilizadas

- **React 18**: Interface de usuário
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Estilização
- **Lucide React**: Ícones
- **ESLint**: Qualidade de código

## 📚 Documentação Adicional

- **README.md**: Visão geral do projeto
- **INSTRUCTIONS.md**: Este arquivo com instruções de uso
