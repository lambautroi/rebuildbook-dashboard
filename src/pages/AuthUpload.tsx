import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../services/firebaseConfig"; // Import Firebase Auth và Storage

const AuthUpload = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);

    // Đăng nhập người dùng
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("Logged in as: ", user);

            // Upload file lên Firebase Storage sau khi xác thực
            if (file) {
                const storageRef = ref(storage, "uploads/" + file.name);
                await uploadBytes(storageRef, file);
                console.log("File uploaded successfully!");
            }
        } catch (error) {
            console.error("Error during login: ", error.message);
        }
    };

    // Lấy file từ input
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            <input type="file" onChange={handleFileChange} />
            <button onClick={handleLogin}>Upload File</button>
        </div>
    );
};

export default AuthUpload;
