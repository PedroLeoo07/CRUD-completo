"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function GetByIdPage() {
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const params = useParams();
    const commentId = params.id;

    const buscarComentario = async () => {
        setLoading(true);

        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/comments/${commentId}`
            );
            setComment(response.data);
        } catch (error) {
            setError(true);
            console.error("❌ Erro ao buscar comentário:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarComentario();
    }, [commentId]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>❌ Erro ao carregar o comentário</div>;
    if (!comment) return <div>Comentário não encontrado</div>;

    return (
        <div>
            <h1>Comentário #{comment.id}</h1>
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
        </div>
    );
}

