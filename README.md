# Bitmap AI Advisor (Hackathon Project)

## Overview

Bitmap AI Advisor is an intelligent assistant designed to help users choose the perfect Bitmap in the Bitcoin Metaverse. This project leverages the power of AI to analyze live marketplace listings and provide personalized recommendations based on user queries.

## Decentralized AI with Internet Computer (ICP)

A key feature of this project is its integration with the Internet Computer Protocol (ICP), showcasing the potential of decentralized AI:

- The AI prompt is stored as an asset on the Internet Computer, ensuring:
  - Immutable storage of the AI's core knowledge, enhancing transparency
  - Resilience against single points of corruption or censorship
  - Decentralized access and potential for community governance

By leveraging ICP's decentralized infrastructure, we enhance the project's resilience and openness, demonstrating how blockchain technologies can be combined with AI to create more transparent and robust intelligent systems.

The AI Prompt Text is generated and stored on ICP using [this repository](https://github.com/benschiller/hackathon-prompt-text-icp).

## Features

- Decentralized AI prompt storage on the Internet Computer
- AI-powered bitmap recommendations
- Integration with OKX marketplace API for real-time bitmap listings
- Interactive web interface for user queries
- Background knowledge of Bitmap Theory and Digital Matter Theory

## Technology Stack

- Decentralized Storage: Internet Computer Protocol (ICP)
- AI: OpenAI GPT model
- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript
- API Integration: OKX Marketplace API

## Live Demo

Check out the live deployed hackathon project [here](https://hackathon-bitmap-ai-advisor-icp-production.up.railway.app/).

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/hackathon-bitmap-ai-advisor-icp.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   OPENAI_API_KEY=your_openai_api_key
   OKX_API_KEY=your_okx_api_key
   OKX_SECRET_KEY=your_okx_secret_key
   OKX_PASSPHRASE=your_okx_passphrase
   OKX_PROJECT=your_okx_project
   ```

4. Start the server:
   ```
   npm start
   ```

5. Open your browser and navigate to `http://localhost:8080`

## Usage

1. Enter a question about buying or recommending bitmaps in the input field.
2. The AI will analyze current bitmap listings and provide personalized recommendations.
3. Review the AI's suggestions and use the provided links to purchase bitmaps.

## Project Structure

- `server.js`: Main server file
- `bitmap-ai-advisor.js`: AI recommendation logic
- `okx-bitmap-listings.js`: OKX API integration
- `index.html`: Main web interface
- `styles.css`: Styling for the web interface
- `src/data/`: Background information on Bitmap Theory and Digital Matter Theory
- `icp/`: Contains ICP-related code for storing and retrieving AI prompts

## Limitations

This project was developed as part of a hackathon and serves as a proof-of-concept demonstration. As such, it has several limitations:

1. Prototype Status: This is not a production-ready application. It's an experimental project designed to showcase the potential of decentralized AI in the context of Bitcoin Ordinals, specifically Bitmap.

2. AI Model Limitations: The AI model used in this project is not highly trained on Bitmap or Bitcoin Ordinals data. It relies on general knowledge and the provided background information to generate recommendations.

3. Closed-Source Execution: While the prompt is stored on the decentralized Internet Computer, the actual execution of the AI model still occurs on closed-source infrastructure (OpenAI's servers).

4. Limited Dataset: The project uses real-time data from a single marketplace (OKX), which may not represent the entire Bitmap ecosystem.

Despite these limitations, this project offers an optimistic view of what is possible at the intersection of blockchain technology, the Bitcoin Metaverse, and decentralized AI. It demonstrates how we can begin to create more transparent, resilient, and community-governed AI systems. As blockchain and AI technologies continue to evolve, projects like this pave the way for more sophisticated, decentralized AI applications in the future.

## Contributing

This project was created as part of a hackathon and is not actively maintained. However, feel free to fork the repository and make your own improvements!

## License

This project is licensed under the MIT License. This permissive license is simple and allows for free use, modification, and distribution of the software, while providing limited liability for the author. It's a good choice for open-source projects, especially those created during hackathons.

See the [LICENSE](LICENSE) file in the repository root for the full license text.