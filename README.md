# Technology Genome AI

> AI-powered Engineering Design Evolution Platform for automotive OEMs and R&D teams to design, simulate, and analyze vehicle technologies with real-time dependency intelligence.

![Model Context Protocol](https://img.shields.io/badge/Model%20Context%20Protocol-MCP-blue) ![Built with Nitrostack](https://img.shields.io/badge/Built%20with-Nitrostack-0A66FF) ![Status](https://img.shields.io/badge/status-live-brightgreen)

**Technology Genome AI** is an **MCP (Model Context Protocol)** server that enables AI assistants such as Claude, Cursor, and other MCP-compatible clients to perform intelligent vehicle engineering analysis. Built with **React, TypeScript, Express, Google Gemini, and Nitrostack**, it allows engineers to design, evolve, and compare vehicle architectures using AI-powered dependency analysis.

---

# Table of Contents

- [Overview](#overview)
- [What is MCP?](#what-is-mcp)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Connect to an MCP Client](#connect-to-an-mcp-client)
- [FAQ](#faq)
- [Keywords](#keywords)
- [License](#license)

---

# Overview

Technology Genome AI is an enterprise engineering platform that models a vehicle as an interconnected **Technology Genome** instead of independent components.

The application enables engineers to:

- Browse different vehicle platforms
- Edit vehicle subsystem configurations
- Analyze engineering dependencies using AI
- Visualize component relationships
- Compare multiple vehicle designs
- Track design evolution through version history

The AI backend uses **Google Gemini** to reason about engineering changes and predict how modifications to one subsystem affect the rest of the vehicle architecture.

---

# What is MCP?

The **Model Context Protocol (MCP)** is an open standard that allows AI assistants to securely interact with external tools, APIs, and services.

Technology Genome AI exposes its engineering capabilities as an MCP server, allowing AI assistants to perform intelligent design analysis using live engineering data.

Learn more at **https://nitrostack.ai**

---

# Features

- 🚗 Interactive Vehicle Repository
- 🧬 Genome Editor for vehicle subsystem modification
- 🤖 Google Gemini AI-powered dependency analysis
- 🔗 Interactive Dependency Graph visualization
- 📈 Engineering Dashboard with vehicle analytics
- 🕒 Version Timeline for tracking design evolution
- ⚖️ Design Comparison between multiple vehicle configurations
- 🔌 MCP-compatible architecture for AI assistants
- ⚡ Built using Nitrostack deployment platform

---

# Technology Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- Recharts

### Backend

- Node.js
- Express
- TypeScript

### AI

- Google Gemini API (@google/genai)

### Deployment

- Nitrostack
- MCP Server

---

# Project Structure

```
src/
│
├── components/
│   ├── LandingPage.tsx
│   ├── Dashboard.tsx
│   ├── VehicleRepo.tsx
│   ├── GenomeEditor.tsx
│   ├── DependencyGraph.tsx
│   ├── VehicleVisualizer.tsx
│   ├── VersionTimeline.tsx
│   └── DesignCompare.tsx
│
├── data/
│   └── vehicles.ts
│
├── App.tsx
├── main.tsx
└── types.ts

server.ts
package.json
```

---

# Live Demo

🚀 **MCP Endpoint**

```
https://technology-genome-mvp-veda-amrita-university-amritapuri-campus.app.nitrocloud.ai
```

Connect your preferred MCP-compatible AI client to begin using the platform.

---

# Getting Started

## Prerequisites

- Node.js 18+
- npm
- Google Gemini API Key

---

## Installation

```bash
git clone https://github.com/your-username/technology-genome-ai.git

cd technology-genome-ai

npm install
```

---

## Environment Variables

Create a `.env` file (or copy `.env.example`) and configure your Gemini API key.

```env
GEMINI_API_KEY=YOUR_API_KEY
```

---

## Run Development Server

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

---

## Production

```bash
npm start
```

---

# Connect to an MCP Client

Example MCP configuration:

```json
{
  "mcpServers": {
    "technology-genome-ai": {
      "url": "https://technology-genome-mvp-veda-amrita-university-amritapuri-campus.app.nitrocloud.ai"
    }
  }
}
```

Restart your MCP-compatible client, and Technology Genome AI will become available as an engineering analysis tool.

---

# FAQ

### What does Technology Genome AI do?

It helps engineers model vehicle architectures, modify subsystem configurations, visualize dependencies, compare designs, and obtain AI-generated engineering impact analysis.

---

### Which AI model is used?

Google Gemini powers the dependency analysis and engineering reasoning.

---

### Which technologies are used?

- React
- TypeScript
- Express
- Vite
- Tailwind CSS
- Google Gemini
- Nitrostack
- MCP

---

### Can it work with AI assistants?

Yes. It is built as an MCP server and works with any MCP-compatible AI client.

---

# Keywords

`Technology Genome AI` · `Vehicle Engineering` · `Electric Vehicles` · `Automotive AI` · `Engineering Design` · `Google Gemini` · `Dependency Analysis` · `MCP` · `Model Context Protocol` · `Nitrostack` · `React` · `TypeScript`

---

# License

MIT © 2026

---

Built with ❤️ using **React**, **Google Gemini**, **Nitrostack**, and the **Model Context Protocol (MCP)**.
