"use client";
import { useState } from "react";
import axios from "axios";

export default function Update() {
  const [comment, setCommentId] = useState("");
  const [form, setForm] = useState({ name: "", email: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const buscarComentario = async () => {
    if (!comment) {
      setError("Por favor, insira o ID do comentário.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${comment}`
      );
      setForm({ name: data.name, email: data.email, body: data.body });
    } catch (error) {
      setError("Erro ao buscar o comentário. Verifique o ID e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const editarComentario = async () => {
    if (!form.name || !form.email || !form.body) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/comments/${comment}`,
        {
          name: form.name,
          email: form.email,
          body: form.body,
        }
      );
      setSuccess(true);
    } catch (error) {
      setError("Erro ao atualizar o comentário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
          <h1>Editar Comentário</h1>
      
          <div style={{ width: "100%", maxWidth: "400px", textAlign: "center" }}>
            <input
              type="number"
              value={comment}
              onChange={(e) => setCommentId(e.target.value)}
              placeholder="ID do comentário"
              disabled={loading}
              style={{ display: "block", margin: "10px auto", width: "100%" }}
            />
            <button onClick={buscarComentario} disabled={loading} style={{ margin: "10px auto", width: "100%" }}>
              {loading ? "Carregando..." : "Buscar Comentário"}
            </button>
          </div>
      
          {form.name && (
            <div style={{ width: "100%", maxWidth: "400px", textAlign: "center", marginTop: "20px" }}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome"
                disabled={loading}
                style={{ display: "block", margin: "10px auto", width: "100%" }}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                disabled={loading}
                style={{ display: "block", margin: "10px auto", width: "100%" }}
              />
              <textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="Comentário"
                disabled={loading}
                style={{ display: "block", margin: "10px auto", width: "100%" }}
              />
              <button onClick={editarComentario} disabled={loading} style={{ margin: "10px auto", width: "100%" }}>
                {loading ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          )}
      
          {success && <p style={{ color: "green", textAlign: "center" }}>Comentário atualizado com sucesso!</p>}
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        </div>
      
  );
}