// ===================================================
// Funções de acesso aos dados (Supabase)
// ===================================================

// Mostra uma mensagem de sucesso ou erro abaixo do formulário
function mostrarMensagem(texto, tipo) {
  const elemento = document.getElementById("mensagem");
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = "mensagem " + tipo;
}

// Procura um usuário pelo telefone; se não existir, cria um novo.
// Essa busca/criação é feita por uma função do banco (RPC), que
// roda "por dentro" do Supabase, sem expor a tabela "usuarios"
// (que contém nome e telefone) para leitura pública.
async function buscarOuCriarUsuario(nome, telefone) {
  const { data, error } = await supabaseClient.rpc("obter_ou_criar_usuario", {
    p_nome: nome,
    p_telefone: telefone
  });

  if (error) throw error;
  return data;
}

// Cadastra uma nova doação
async function cadastrarDoacao(dados) {
  try {
    const usuarioId = await buscarOuCriarUsuario(dados.nome, dados.telefone);

    const { error } = await supabaseClient.from("doacoes").insert({
      usuario_id: usuarioId,
      categoria: dados.categoria,
      item: dados.item,
      descricao: dados.descricao,
      quantidade: parseInt(dados.quantidade, 10) || 1,
      status: "disponivel"
    });

    if (error) throw error;

    mostrarMensagem("Doação cadastrada com sucesso. Obrigado por ajudar a comunidade!", "sucesso");
    document.getElementById("form-doacao").reset();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Não foi possível cadastrar a doação agora. Tente novamente em alguns minutos.", "erro");
  }
}

// Cadastra uma nova solicitação
async function cadastrarSolicitacao(dados) {
  try {
    const usuarioId = await buscarOuCriarUsuario(dados.nome, dados.telefone);

    const { error } = await supabaseClient.from("solicitacoes").insert({
      usuario_id: usuarioId,
      categoria: dados.categoria,
      item: dados.item,
      descricao: dados.descricao,
      quantidade: parseInt(dados.quantidade, 10) || 1,
      status: "pendente"
    });

    if (error) throw error;

    mostrarMensagem("Pedido registrado com sucesso. A comunidade poderá entrar em contato.", "sucesso");
    document.getElementById("form-solicitacao").reset();
  } catch (erro) {
    console.error(erro);
    mostrarMensagem("Não foi possível registrar o pedido agora. Tente novamente em alguns minutos.", "erro");
  }
}

// Lista as doações disponíveis na página inicial
async function listarDoacoes() {
  const container = document.getElementById("lista-doacoes");
  if (!container) return;

  try {
    const { data, error } = await supabaseClient
      .from("doacoes")
      .select("categoria, item, descricao, quantidade")
      .eq("status", "disponivel")
      .order("criado_em", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      container.innerHTML = '<p class="estado-vazio">Nenhuma doação disponível no momento.</p>';
      return;
    }

    container.innerHTML = data.map(montarCardItem).join("");
  } catch (erro) {
    console.error(erro);
    container.innerHTML = '<p class="estado-erro">Não foi possível carregar as doações agora.</p>';
  }
}

// Lista os pedidos da comunidade na página inicial
async function listarSolicitacoes() {
  const container = document.getElementById("lista-solicitacoes");
  if (!container) return;

  try {
    const { data, error } = await supabaseClient
      .from("solicitacoes")
      .select("categoria, item, descricao, quantidade")
      .eq("status", "pendente")
      .order("criado_em", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      container.innerHTML = '<p class="estado-vazio">Nenhum pedido registrado no momento.</p>';
      return;
    }

    container.innerHTML = data.map(montarCardItem).join("");
  } catch (erro) {
    console.error(erro);
    container.innerHTML = '<p class="estado-erro">Não foi possível carregar os pedidos agora.</p>';
  }
}

// Monta o HTML de um item (doação ou pedido) para exibição em lista
function montarCardItem(item) {
  const quantidade = item.quantidade > 1 ? item.quantidade + " unidades" : "1 unidade";
  const descricao = item.descricao ? "<p>" + item.descricao + "</p>" : "";

  return (
    '<div class="item-card">' +
    '<span class="categoria">' + item.categoria + "</span>" +
    "<h3>" + item.item + "</h3>" +
    "<p>" + quantidade + "</p>" +
    descricao +
    "</div>"
  );
}