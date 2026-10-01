// No emulador Android, 10.0.2.2 aponta para o localhost da maquina host.
const BASE_URL = "http://10.0.2.2:3000";

export async function buscarLivros() {
  try {
    const response = await fetch(`${BASE_URL}/livros`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: falha ao buscar livros.`);
    }
    return response.json();
  } catch (erro) {
    console.error("Buscar livros: ", erro.message);
    throw erro;
  }
}

export async function buscarLivroPorId(id) {
  try {
    const response = await fetch(`${BASE_URL}/livros/${id}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: Livro não encontrado.`);
    }
    return response.json();
  } catch (erro) {
    console.error("buscarLivroPorId: ", erro.message);
    throw erro;
  }
}

export async function adicionarFavorito(livroId, observacao = "") {
  try {
    const response = await fetch(`${BASE_URL}/favoritos`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ livroId, observacao }),
    });
    if (!response.ok) {
      const corpo = await response.json().catch(() => ({}));
      const erro = new Error(
        corpo.erro ??
          `Erro ${response.status}: falha ao adicionar aos favoritos.`,
      );
      erro.status = response.status;
      throw erro;
    }
    return response.json();
  } catch (erro) {
    console.error("adicionarFavorito: ", erro.message);
    throw erro;
  }
}

export async function listarFavoritos() {
  try {
    const response = await fetch(`${BASE_URL}/favoritos`);
    if (!response.ok) {
      new Error(`Erro: ${response.status}: falha ao listar favoritos.`);
    }
    return response.json();
  } catch (erro) {
    console.error("listarFavoritos: ", erro.message);
    throw erro;
  }
}

export async function editarFavorito(id, observacao) {
  try {
    const response = await fetch(`${BASE_URL}/favoritos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ observacao }),
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: falha ao editar favorito.`);
    }
    return response.json();
  } catch (erro) {
    console.error("editarFavorito: ", erro.message);
    throw erro;
  }
}

export async function removerFavorito(id) {
  try {
    const response = await fetch(`${BASE_URL}/favoritos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: falha ao remover favorito.`);
    }
    
  } catch (erro) {
    console.error("removerFavorito", erro.message);
    throw erro;
  }
}
