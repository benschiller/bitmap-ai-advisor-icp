const express = require('express');
const path = require('path');
const { fetchBitmapListings } = require('./okx-bitmap-listings');
const { getAIRecommendation } = require('./bitmap-ai-advisor');

const app = express();
const port = process.env.PORT || 8080;  // Change this line

// Serve static files from the current directory
app.use(express.static(__dirname));

// API endpoint for bitmap recommendation
app.get('/api/bitmap-recommendation', async (req, res) => {
    try {
        const listings = await fetchBitmapListings();
        const recommendation = await getAIRecommendation(listings);
        res.send(recommendation);
    } catch (error) {
        console.error("Error generating recommendation:", error);
        res.status(500).send("Sorry, I couldn't generate a recommendation at this time.");
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Add this error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something went wrong!');
});

// Modify the listen call to include error handling
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

// Add this to catch any unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});