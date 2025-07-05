import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // server: {
  //   host: "192.168.1.42", // 🔁 Yahan apna IP address daal do
  //   port: 5173, // ✅ Port optional hai, default 5173 hota hai
  //   open: true, // 🔓 Optional: browser khud open kare
  // },
});
