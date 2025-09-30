"use client";
import { useState } from "react";
import axios from "axios";

export default function Update() {
  const [comment, setCommentId] = useState("");
  const [form, setForm] = useState({ name: "", email: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const buscarComentario = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/comments/${comment}`
      );
      setForm({ name: data.name, email: data.email, body: data.body });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const editarComentario = async () => {
    setLoading(true);
    setError(false);
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
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  return (
    <div>
      <h1>Editar Comentário</h1>

      <div>
        <input
          type="number"
          value={comment}
          onChange={(e) => setCommentId(e.target.value)}
          placeholder="ID do comentário"
        />
        <button onClick={buscarComentario} disabled={loading}>
          {loading ? "Carregando..." : "Buscar Comentário"}
        </button>
      </div>

      {form.name && (
        <div>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nome"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <textarea
            name="body"
            value={form.body}
            onChange={handleChange}
            placeholder="Comentário"
          />
          <button onClick={editarComentario} disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      )}

      {success && <p>Comentário atualizado com sucesso!</p>}
      {error && <p>Ocorreu um erro. Tente novamente.</p>}
    </div>
  );
}