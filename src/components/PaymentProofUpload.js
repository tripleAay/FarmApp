import React, { useState } from "react";

export default function PaymentProofUpload({ orderId }) {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage("");
        setError("");
    };

    const handleUpload = () => {
        if (!file) {
            setError("Please select an image file.");
            return;
        }

        setUploading(true);
        setProgress(0);
        setError("");
        setMessage("");

        const formData = new FormData();
        formData.append("paymentImage", file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", `http://localhost:5000/api/products/upload-payment-proof/${orderId}`, true);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                setProgress(percent);
            }
        };

        xhr.onload = () => {
            setUploading(false);
            if (xhr.status === 200) {
                setMessage("✅ Payment proof uploaded successfully!");
            } else {
                setError(`❌ Upload failed: ${xhr.statusText || xhr.responseText}`);
            }
        };

        xhr.onerror = () => {
            setUploading(false);
            setError("❌ Network error occurred during upload.");
        };

        xhr.send(formData);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Upload Payment Proof</h2>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
            />

            {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-green-500 h-4 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            {message && (
                <p className="text-green-600 font-semibold">{message}</p>
            )}
            {error && (
                <p className="text-red-600 font-semibold">{error}</p>
            )}

            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`w-full py-2 px-4 rounded text-white font-bold ${uploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                    }`}
            >
                {uploading ? "Uploading..." : "Upload Proof"}
            </button>
        </div>
    );
}
