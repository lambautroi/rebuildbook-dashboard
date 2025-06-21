// Tạo component Dashboard để hiển thị danh sách
// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { fetchBooks, Book } from "../services/bookService";

const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks()
            .then((data) => setBooks(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Danh sách Sách</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div
                        key={book.id}
                        className="p-4 rounded-xl shadow bg-white"
                    >
                        <div className="font-semibold">{book.title}</div>
                        <div className="text-sm text-gray-500">
                            {book.author}
                        </div>
                        <div className="text-xs mt-2">
                            Status:{" "}
                            <span className="font-bold">{book.status}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                            Created:{" "}
                            {book.createdAt
                                ? new Date(book.createdAt).toLocaleString()
                                : "N/A"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
