"use client";

import { useState } from "react";
import axios from "axios";

export default function Post() {
    const [ loading, setLoading ] = useState(false);
    const [ addComent, setAddComment ] = useState([]);
    const [ error, setError] = useState(false);
    const [ form, setForm ] = useState({
        name: "",
        email: "",
        body: ""
    });

    const criarNovoComentario = async () => {
        setLoading(true);
        try {
          const response = await axios.post("https://jsonplaceholder.typicode.com/comments", {
            name: form.name.trim(),
            email: form.email.trim(),
            body: form.body.trim()
          });  

          setAddComment([response.data, ...addComent]); 
          setForm({ name: "", email: "", body: "" });
          setError(false);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao criar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    const atualizarForm = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <div>
            <h1>Criar Comentário</h1>

            <div>
                <input type="text"
                    name="name"
                    value={form.name}
                    onChange={atualizarForm}
                    placeholder="Digite o seu Nome"
                    required
                />
                <br />
                <input type="email"
                    name="email"
                    value={form.email}
                    onChange={atualizarForm}
                    placeholder="Digite o seu Email"
                    required
                />
                <br />
                <textarea
                    name="body"
                    value={form.body}
                    onChange={atualizarForm}
                    placeholder="Digite o seu Comentário"
                    required
                />
                <br />
                <button onClick={criarNovoComentario} disabled={!form.name.trim() || loading}>
                    {loading ? "Carregando..." : "Criar Comentário"}
                </button>
            </div>

            {error && <p style={{ color: "red" }}>❌ Erro ao criar comentário</p>}

            <h2>Comentários ({addComent.length})</h2>
            <ul>
                {addComent.map((comentario) => (
                    <li key={comentario.id}>
                        <hr />
                        <p><strong>Nome:</strong> {comentario.name}</p>
                        <p><strong>Email:</strong> {comentario.email}</p>
                        <p><strong>Comentário:</strong> {comentario.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}