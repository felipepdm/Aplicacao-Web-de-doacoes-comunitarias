# Mutirão Solidário - Site de Doações Comunitárias

Site para cadastro de doações e solicitações da comunidade do
Conjunto Dom Helder Câmara, Candeias, Jaboatão dos Guararapes - PE.

## Estrutura do projeto

- `index.html` - página inicial, com a lista de doações disponíveis e de pedidos da comunidade
- `cadastrar-doacao.html` - formulário para cadastrar uma doação
- `cadastrar-solicitacao.html` - formulário para registrar um pedido
- `css/style.css` - estilos do site
- `js/supabase-config.js` - configuração de conexão com o Supabase
- `js/app.js` - funções de cadastro e listagem de doações e solicitações
- `sql/schema.sql` - script para criar as tabelas no Supabase

## Como configurar

1. Crie um projeto gratuito em https://supabase.com
2. No SQL Editor do Supabase, execute o conteúdo do arquivo `sql/schema.sql`
3. Em "Project Settings > API", copie a "Project URL" e a chave "anon public"
4. Abra `js/supabase-config.js` e substitua `SUPABASE_URL` e `SUPABASE_ANON_KEY` pelos valores copiados
5. Abra `index.html` em um navegador (ou hospede o projeto, por exemplo, no GitHub Pages)

## Próximas etapas

Esta versão corresponde à fase de Projeto. Nas fases de Análise e
Implementação, o site será testado e aplicado junto às famílias do
Conjunto Dom Helder Câmara, com ajustes a partir do uso real.
