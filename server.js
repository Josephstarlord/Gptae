const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());  // Enable CORS for local development

const fonts = {
    mathsans: {
        a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂",
        j: "𝗃", k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋",
        s: "𝗌", t: "𝗍", u: "𝗎", v: "𝗏", w: "𝗎", x: "𝗑", y: "𝗒", z: "𝗓",
        A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
        J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
        S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭"
    }
};

app.post('/chat', async (req, res) => {
    try {
        const { body } = req.body;
        if (!body) {
            return res.status(400).json({ reply: "Please provide a prompt." });
        }

        const response = await axios.get(`https://metoushela-api.vercel.app/gpt4o?context=${encodeURIComponent(body)}`);
        const answer = `🟢 𝘼𝙀-𝙎𝙏𝙃𝙀𝙍 ⚪ :\n\n${response.data.response} 🟡`;

        let formattedAnswer = "";
        for (let letter of answer) {
            formattedAnswer += letter in fonts.mathsans ? fonts.mathsans[letter] : letter;
        }

        res.json({ reply: formattedAnswer });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ reply: 'An error occurred. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
