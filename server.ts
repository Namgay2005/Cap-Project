import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

function getGenAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please check the Settings > Secrets panel.'
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/eduguide/chat', async (req, res) => {
    try {
      const { message, currentRoom, history } = req.body as {
        message?: string;
        currentRoom?: string;
        history?: ChatHistoryItem[];
      };

      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Please enter a message for EduGuide.' });
        return;
      }

      const ai = getGenAIClient();

      const safeHistory = Array.isArray(history)
        ? history
            .slice(-10)
            .filter(
              (item) =>
                item &&
                (item.role === 'user' || item.role === 'model') &&
                typeof item.text === 'string' &&
                item.text.trim().length > 0
            )
            .map((item) => ({
              role: item.role,
              parts: [{ text: item.text }],
            }))
        : [];

      const systemInstruction = `You are EduGuide, the friendly, knowledgeable personal museum guide for the Virtual Network Museum (Class IX — Digital Technology and Innovation, Chapter 5: Computer Networks).
The museum has four main exhibit rooms, the Museum Lobby ('lobby'), and Back to Explore ('explore'):
1. Packets Room: What a packet is (small chunk of data), how data is split, numbered, routed independently via routers, and reassembled; Packet Anatomy (Header with source/destination IP & sequence number, Payload with actual data, Trailer with error-checking CRC); Packet Journey simulation; 19-slide Teacher Presentation and Packets Quiz.
2. Transmission Media Room: Wired/Bounded Media (Twisted-Pair Cable — UTP & STP, Coaxial Cable — copper core, insulation, braided metallic shield, outer jacket, and Fibre-Optic Cable — Single-mode 8-10 µm core, Multimode 50-62.5 µm core, and Plastic Optical Fibre ~980 µm core carrying pulses of light) and Wireless/Unbounded Media (Radio Waves, Microwaves, Infrared, and Satellite).
3. Netiquette Room: Six Rules of Netiquette (respectful communication, avoiding offensive language, respecting privacy, checking facts before sharing, thinking before posting, matching language to context), Scenario Gallery, and Classroom Roleplay Scripts.
4. Mobile Communication Room: Wireless mobile devices, radio waves, cell towers, SIM cards across 2G/3G/4G/5G networks, everyday mobile uses, and the 60-mark Presentation Rubric.
5. Back to Explore ('explore'): Review key ideas across all 4 rooms (Packets/Efficiency, Transmission Media/Connection, Netiquette/Respect, Mobile Communication/Mobility), Video Theatre, and the 4-question Reflection Wall.

The visitor is currently viewing room: "${currentRoom || 'lobby'}".
Keep answers clear, encouraging, accurate for Class IX students, and concise (2 to 5 short sentences or clean bullet points). Use relatable analogies when helpful.`;

      const contents = [
        ...safeHistory,
        {
          role: 'user',
          parts: [{ text: message.trim() }],
        },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          thinkingConfig: {
            thinkingLevel: ThinkingLevel.LOW,
          },
        },
      });

      const replyText =
        response.text ||
        "I'm right here with you in the museum! Ask me anything about packets, cables, wireless signals, netiquette, or mobile networks.";

      res.json({ reply: replyText });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Unable to reach EduGuide right now.';
      console.error('EduGuide chat error:', errorMessage);
      res.status(500).json({ error: errorMessage });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Virtual Network Museum server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
