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

          setAddComment([response.data, ...addComment]); 
          setForm({ name: "", email: "", body: "" });
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
            </div>
        </div>
    )
}