# AI Assistant Backend

Backend proxy for a streaming AI assistant built with OpenAI Responses API.

## 🚀 Features

- OpenAI Responses API
- Server-side API key (no secrets in frontend)
- Streaming via Server-Sent Events (SSE)
- Abort / cancel support
- Clean separation from frontend
- Production-ready structure

## 🧱 Tech Stack

- Node.js
- Express
- TypeScript
- OpenAI SDK
- Server-Sent Events (SSE)

## 🧠 Architecture

- Frontend (React)
- ↓ SSE
- Backend Proxy (Express)
- ↓ Streaming
- OpenAI Responses API

## 📡 Streaming Endpoint

POST /ai/stream
Content-Type: application/json

{
"input": "Your prompt"
}

Response is streamed as SSE events compatible with OpenAI Responses API.

## 🛠️ Local Development

git clone https://github.com/your-username/AIAssistant-backend.git
cd AIAssistant-backend
npm install

Create .env file:
OPENAI_API_KEY=your_api_key
PORT=3001

Run dev server:
npm run dev

## Security

- OpenAI API key is stored only on the backend
- .env is excluded from git
- Frontend communicates only with backend proxy

## Related Project

Frontend repository:
AI Assistant Frontend (Vite + React + TypeScript)

## License

MIT
