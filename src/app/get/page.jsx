"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// https://jsonplaceholder.typicode.com/
// https://jsonplaceholder.typicode.com/comments

export default function Get() {
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false);

    const router = useRouter();

    const buscarComments = async () => {
        setLoading(true);

        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
            setComments(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentários:", error);
        } finally {
            setLoading(false);
        }
    };

    const navegarParaComentario = (commentId) => {
        router.push(`/get/${commentId}`);
    };

    useEffect(() => {
        buscarComments();
    }, []);

    return (
        <div>
            <h1>Lista de Comentários</h1>

            <h2>Comentários ({comments.length})</h2>
            {loading ? (
                "Carregando..."
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li
                            key={comment.id}
                            onClick={() => navegarParaComentario(comment.id)}
                            style={{ cursor: "pointer" }}>
                            <hr />
                            <p>
                                <strong>ID:</strong> {comment.id}
                            </p>
                            <p>
                                <strong>Post ID:</strong> {comment.postId}
                            </p>
                            <p>
                                <strong>Nome:</strong> {comment.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {comment.email}
                            </p>
                            <p>
                                <strong>Comentário:</strong> {comment.body}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
            {error && <p>❌ Ocorreu um erro ao buscar os comentários.</p>}
        </div>
    );
}

