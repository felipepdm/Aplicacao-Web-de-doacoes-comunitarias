-- ============================================
-- Banco de dados - Mutirão Solidário
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

-- A tabela "usuarios" guarda nome e telefone das pessoas, então
-- NÃO criamos políticas de leitura/escrita pública para ela.
-- Em vez disso, o site usa a função abaixo, que busca ou cria
-- o usuário "por dentro" do banco, sem expor a tabela.

create or replace function obter_ou_criar_usuario(p_nome text, p_telefone text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
begin
  select id into v_id from usuarios where telefone = p_telefone limit 1;

  if v_id is null then
    insert into usuarios (nome, telefone) values (p_nome, p_telefone)
    returning id into v_id;
  end if;

  return v_id;
end;
$$;

grant execute on function obter_ou_criar_usuario(text, text) to anon;

create policy "permitir leitura publica doacoes" on doacoes
  for select using (true);
create policy "permitir insercao publica doacoes" on doacoes
  for insert with check (true);

create policy "permitir leitura publica solicitacoes" on solicitacoes
  for select using (true);
create policy "permitir insercao publica solicitacoes" on solicitacoes
  for insert with check (true);