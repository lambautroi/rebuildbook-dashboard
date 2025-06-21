// tạo hàm lấy danh sách books từ firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firestore";

export interface Book {
    id: string;
    title: string;
    author: string;
    status: string;
    createdAt: string;
    // Thêm các field khác nếu cần
}

export async function fetchBooks(): Promise<Book[]> {
    const booksCol = collection(db, "books");
    const booksSnap = await getDocs(booksCol);
    const books: Book[] = [];
    booksSnap.forEach((doc) => {
        books.push({
            id: doc.id,
            ...(doc.data() as Omit<Book, "id">),
        });
    });
    return books;
}
