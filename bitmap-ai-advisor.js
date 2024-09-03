const OpenAI = require('openai');
const fs = require('fs').promises;
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getBitmapBackground() {
    const whitepaperFolderPath = path.join(__dirname, 'src', 'data', 'bitmap-101', 'bitmap-theory-whitepaper');
    const dmtFilePath = path.join(__dirname, 'src', 'data', 'dmt-101', 'dmt-101.txt');
    let backgroundInfo = '';

    // Read Bitmap Whitepaper files
    const files = await fs.readdir(whitepaperFolderPath);
    for (const file of files) {
        if (file.endsWith('.md')) {
            const content = await fs.readFile(path.join(whitepaperFolderPath, file), 'utf-8');
            backgroundInfo += `${file}:\n${content}\n\n`;
        }
    }

    // Read DMT-101 file
    const dmtContent = await fs.readFile(dmtFilePath, 'utf-8');
    backgroundInfo += `dmt-101.txt:\n${dmtContent}\n\n`;

    return backgroundInfo;
}

async function fetchBitmapContent(inscriptionId) {
    const url = `https://api.hiro.so/ordinals/v1/inscriptions/${inscriptionId}/content`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text.trim();
    } catch (error) {
        console.error(`Error fetching content for ${inscriptionId}:`, error);
        return inscriptionId;
    }
}

async function fetchBitmapImage(listingUrl) {
    try {
        const response = await fetch(listingUrl);
        const html = await response.text();
        const match = html.match(/<meta name="og:image" content="(.*?)"/);
        if (match) {
            const imageUrl = match[1].split('?')[0]; 
            return imageUrl.replace('/type=detail', '');
        }
        return null;
    } catch (error) {
        console.error(`Error fetching image for ${listingUrl}:`, error);
        return null;
    }
}

async function fetchPromptText01() {
    const url = 'https://wiamy-rqaaa-aaaag-alo4q-cai.icp0.io/promptText01.html';
    return fetchTextFromUrl(url);
}

async function fetchPromptText02() {
    const url = 'https://wiamy-rqaaa-aaaag-alo4q-cai.icp0.io/promptText02.html';
    return fetchTextFromUrl(url);
}

async function fetchPromptText03() {
    const url = 'https://wiamy-rqaaa-aaaag-alo4q-cai.icp0.io/promptText03.html';
    return fetchTextFromUrl(url);
}

async function fetchTextFromUrl(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        return text.trim();
    } catch (error) {
        console.error(`Error fetching prompt text from ${url}:`, error);
        return '';
    }
}

async function getAIRecommendation(listings) {
    const listingsWithContent = await Promise.all(listings.map(async l => {
        const content = await fetchBitmapContent(l.inscriptionId);
        const imageUrl = await fetchBitmapImage(l.listingUrl);
        return {
            ...l,
            content: content,
            imageUrl: imageUrl
        };
    }));

    const listingsText = listingsWithContent.map(l => {
        return `
        
1. **${l.content}**
   - **Price: ${l.price} BTC**
   - **<a href="${l.listingUrl}" target="_blank">Buy Now</a>**
   ${l.imageUrl ? `<img src="${l.imageUrl}" class="bitmap-image">` : ''}`;
    }).join('\n\n');

    const bitmapBackground = await getBitmapBackground();
    const promptText01 = await fetchPromptText01();
    const promptText02 = await fetchPromptText02();
    const promptText03 = await fetchPromptText03();
    const promptText = `${promptText01}\n\n${promptText02}\n\n${promptText03}`;

    const prompt = `${promptText01}\n\n${listingsText}\n\n${promptText02}\n\n${bitmapBackground}\n\n${promptText03}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an AI assistant specializing in Bitcoin ordinals, specifically Bitmap which is digital land in the Bitcoin Metaverse. Prioritize analysis of specific listings while using background knowledge to inform your recommendations." },
                { role: "user", content: prompt }
            ],
            max_tokens: 2048
        });

        let aiResponse = response.choices[0].message.content;

        // Ensure the links are not modified by the AI
        aiResponse = aiResponse.replace(
            /\*\*<a href="(https:\/\/www\.okx\.com\/web3\/marketplace\/nft\/asset\/btc\/[a-zA-Z0-9]+i0)" target="_blank">.*?<\/a>\*\*/g,
            '**<a href="$1" target="_blank">Buy Now</a>**'
        );

        return aiResponse;
    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return "Sorry, I couldn't generate a recommendation at this time.";
    }
}

module.exports = { getAIRecommendation };