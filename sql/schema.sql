-- ============================================
-- Banco de dados - Desenvolver site para doações comunitárias
-- Conjunto Dom Helder Câmara - Candeias/PE
-- ============================================
-- Execute este script no SQL Editor do Supabase
-- para criar as tabelas usadas pelo site.

-- Tabela de usuários (doadores e solicitantes)
create table usuarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  telefone text,
  email text,
  criado_em timestamp with time zone default now()
);

-- Tabela de doações cadastradas
create table doacoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references usuarios(id),
  categoria text not null,
  item text not null,
  descricao text,
  quantidade integer default 1,
  status text default 'disponivel',
  criado_em timestamp with time zone default now()
);

-- Tabela de solicitações cadastradas
create table solicitacoes (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references usuarios(id),
  categoria text not null,
  item text not null,
  descricao text,
  quantidade integer default 1,
  status text default 'pendente',
  criado_em timestamp with time zone default now()
);

-- ============================================
-- Permissões de acesso (RLS)
-- ============================================
-- Habilita o acesso público de leitura e escrita.
-- Em uma fase posterior, essas regras podem ser
-- refinadas (por exemplo, exigindo autenticação).

alter table usuarios enable row level security;
alter table doacoes enable row level security;
alter table solicitacoes enable row level security;

create policy "permitir leitura publica usuarios" on usuarios
  for select using (true);
create policy "permitir insercao publica usuarios" on usuarios
  for insert with check (true);

create policy "permitir leitura publica doacoes" on doacoes
  for select using (true);
create policy "permitir insercao publica doacoes" on doacoes
  for insert with check (true);

create policy "permitir leitura publica solicitacoes" on solicitacoes
  for select using (true);
create policy "permitir insercao publica solicitacoes" on solicitacoes
  for insert with check (true);
