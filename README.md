# 📦 DevBox AI

![DevBox AI Banner](https://via.placeholder.com/800x400/09090b/4f46e5?text=DevBox+AI+-+Developer+Toolkit)

DevBox AI is a modern, open-source developer toolkit built to make your daily coding tasks easier. Supercharged with **Google Gemini AI**, it provides smart code analysis alongside essential developer utilities.

## ✨ Features

*   **🤖 AI Code Assistant:** Powered by Gemini 3.1 Pro.
    *   **Explain:** Understand complex code blocks instantly.
    *   **Refactor:** Clean up and optimize your code.
    *   **Find Bugs:** Detect vulnerabilities and logical errors.
*   **❴❵ JSON Formatter & Validator:** Prettify minified JSON and catch syntax errors easily.
*   **🔑 JWT Decoder:** Instantly decode JSON Web Tokens to inspect Header and Payload data securely.
*   **∿ Base64 Converter:** Quickly encode to or decode from Base64 format.
*   **🔗 URL Encoder / Decoder:** Safely encode or decode URLs and query parameters.
*   **🌙 Dark Mode First:** A beautiful, eye-friendly UI designed for developers.

## 🛠️ Tech Stack

*   **Frontend:** React 19, Vite
*   **Styling:** Tailwind CSS v4
*   **AI Integration:** `@google/genai` (Gemini API)
*   **Icons:** Lucide React
*   **Markdown:** React Markdown

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/KULLANICI_ADINIZ/devbox-ai.git
cd devbox-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your Google Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```
*(Note: You can get your free API key from [Google AI Studio](https://aistudio.google.com/))*

### 4. Run the development server
```bash
npm run dev
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page. 
If you want to add a new tool (e.g., Hash Generator, Regex Tester), please open a Pull Request!

## 📝 License
This project is [MIT](LICENSE) licensed.
