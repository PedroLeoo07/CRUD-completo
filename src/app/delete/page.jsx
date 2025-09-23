"use client";

import { useState } from "react";
import axios from "axios";

export default function DeletePage() {
    const [commentId, setCommentId] = useState("");
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const buscarComentario = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setComment(response.data);
        } catch (error) {
            setError("Erro ao buscar comentário");
            setComment(null);
        } finally {
            setLoading(false);
        }
    };

    const deleteComentario = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.delete(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setSuccess("Comentário deletado com sucesso");
            setComment(null);
            setCommentId("");
        } catch (error) {
            setError("Erro ao deletar comentário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Deletar Comentário</h1>
            <input
                type="number"
                placeholder="Digite o ID do comentário"
                value={commentId}
                onChange={(e) => setCommentId(e.target.value)}
            />
            <button onClick={buscarComentario} disabled={loading || !commentId}>
                {loading ? "Carregando..." : "Buscar Comentário"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {comment && (
                <div>
                    <h2>Comentário Encontrado:</h2>
                    <p><strong>Nome:</strong> {comment.name || "N/A"}</p>
                    <p><strong>Email:</strong> {comment.email || "N/A"}</p>
                    <pre>{JSON.stringify(comment, null, 2)}</pre>
                    <button onClick={deleteComentario} disabled={loading}>
                        {loading ? "Deletando..." : "Deletar Comentário"}
                    </button>
                </div>
            )}
        </div>
    );
}