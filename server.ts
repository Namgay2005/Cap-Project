import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;

interface ChatHistoryItem {
  role: 'user' | 'model';
  text: string;
}

interface Topic {
  id: string;
  keywords: RegExp[]; // the more of these match, the better the topic fits
  answer: string;
  hints: string[]; // follow-up questions suggested to the student
}

/* -------------------------------------------------------------------------
 * OFFLINE KNOWLEDGE BASE (used when there is no Gemini key or Gemini fails)
 * Each topic is scored by how many keyword patterns match the question,
 * and the best-scoring topic answers. Add more topics here any time.
 * ---------------------------------------------------------------------- */
const TOPICS: Topic[] = [
  // ---------- Computer networks: basics ----------
  {
    id: 'network',
    keywords: [/computer network/, /what is (a )?network/, /network meaning|network definition/, /resource shar|share (files|resources|printer)/, /\bnodes?\b/, /advantages? of (a )?network/],
    answer:
      'A computer network is a group of connected computers and devices that can communicate and share resources such as files, printers, and internet access. The connections can be wired, wireless, or both. Your school Wi-Fi is a simple example of a network.',
    hints: ['What are the types of networks (LAN, MAN, WAN)?', 'What are the parts of a data packet?'],
  },
  {
    id: 'network-types',
    keywords: [/\blan\b/, /\bwan\b/, /\bman\b/, /\bpan\b/, /types? of network/, /local area|wide area|metropolitan|personal area/],
    answer:
      'A PAN (Personal Area Network) connects personal devices within a few metres, like a phone and Bluetooth earphones. A LAN (Local Area Network) covers a small area such as a school or lab. A MAN (Metropolitan Area Network) covers a city, and a WAN (Wide Area Network) covers countries or the world. The internet is the biggest WAN.',
    hints: ['What is the internet and how is it different from the web?', 'What are network devices like a router and a switch?'],
  },
  {
    id: 'topology',
    keywords: [/topolog/, /\bbus\b/, /\bstar\b/, /\bring\b/, /\bmesh\b/, /layout of (a )?network/],
    answer:
      'Network topology is the way devices are arranged and connected. In a star topology every device connects to a central switch or hub, in a bus topology devices share one main cable, in a ring topology devices form a circle, and in a mesh topology devices have many direct links. Star is the most common in schools and offices.',
    hints: ['What is a LAN?', 'What is a router?'],
  },
  {
    id: 'devices',
    keywords: [/modem/, /\bhub\b/, /\bswitch\b/, /\bnic\b|network (interface )?card/, /gateway/, /access point/, /repeater/, /network devices?/],
    answer:
      'A modem connects your network to the internet service provider. A switch connects devices in a LAN and sends data only to the device that needs it, while a hub sends it to everyone. A router connects different networks and finds the best path for packets. A network interface card (NIC) lets a device join a network, and an access point provides Wi-Fi.',
    hints: ['What does a router do with packets?', 'What are wired and wireless transmission media?'],
  },
  {
    id: 'internet',
    keywords: [/internet/, /\bwww\b|world wide web/, /browser/, /website|web page/, /\burl\b/, /\bdns\b/, /ip address/, /\bhttps?\b/],
    answer:
      'The internet is a worldwide system of interconnected networks. The World Wide Web is one service that runs on the internet: it is a collection of linked web pages that you open with a browser using a URL. Every device on the internet has an IP address, and the DNS works like a phone book that turns a website name into that address.',
    hints: ['What is a protocol?', 'What is a data packet?'],
  },
  {
    id: 'protocol',
    keywords: [/protocol/, /\btcp\b/, /\bip\b/, /rules (for|of) (communication|sending)/],
    answer:
      'A protocol is a set of rules that devices follow to communicate. TCP/IP is the main protocol suite of the internet: IP gives addresses and routes packets, and TCP makes sure they arrive complete and in order. HTTP/HTTPS is the protocol used to load web pages.',
    hints: ['How are packets reassembled?', 'What is the internet?'],
  },
  {
    id: 'bandwidth',
    keywords: [/bandwidth/, /\bspeed\b/, /\bbps\b|mbps|gbps/, /data rate|throughput/, /latency|lag/],
    answer:
      'Bandwidth is the amount of data a connection can carry in a given time, measured in bits per second (bps, Mbps, Gbps). A higher bandwidth means faster downloads and smoother video. Fibre-optic cables usually offer much higher bandwidth than twisted-pair or coaxial cables.',
    hints: ['Why is fibre-optic cable so fast?', 'What causes signal loss in a cable?'],
  },

  // ---------- Data packets ----------
  {
    id: 'packet',
    keywords: [/packet/, /packet switching/, /data (is )?(split|divided|broken)/, /small (pieces|chunks|units)/],
    answer:
      'A data packet is a small unit of information sent across a network. A large file or message is split into many packets, they travel across the network (maybe by different routes), and they are put back together at the destination. Each packet has a header, a payload, and sometimes a trailer.',
    hints: ['What do the header, payload and trailer contain?', 'Why are files split into packets?'],
  },
  {
    id: 'packet-parts',
    keywords: [/header/, /payload/, /trailer|footer/, /source address|destination address/, /sequence number/, /checksum|error.?check/, /parts? of (a )?packet|structure of (a )?packet/],
    answer:
      'The header carries control information such as the source address, destination address, and the packet number. The payload is the actual piece of data being sent, like part of an image or message. The trailer (sometimes called the footer) marks the end of the packet and holds error-checking information so the receiver can detect damage.',
    hints: ['How are packets reassembled?', 'What does a router do?'],
  },
  {
    id: 'router',
    keywords: [/router/, /routing/, /\broute\b|\bpath\b|fastest/, /\bhops?\b/, /forward/],
    answer:
      "A router is a device that reads a packet's destination address and forwards it towards its destination along the best available path. A packet may pass through several routers, called hops, on its way. Packets from the same message can take different routes if one path is busy.",
    hints: ['How are packets put back in order?', 'What are network devices like a switch and a modem?'],
  },
  {
    id: 'reassembly',
    keywords: [/reassembl/, /re-?order|out of order|wrong order/, /put (back )?together|rebuild/, /lost packet|missing packet|resend|retransmit/, /sequence/],
    answer:
      'When packets reach the destination, the receiving device uses the packet numbers in the headers to put them back in the correct order, even if they arrived out of order. If a packet is missing or damaged, the receiver asks the sender to send that packet again. Then the full message is rebuilt.',
    hints: ['What is in a packet header?', 'Why are files split into packets?'],
  },
  {
    id: 'why-packets',
    keywords: [/why.*(packet|split|divid|broken)/, /why.*(use|need|important|split|send)/, /advantage|benefit|reason/, /efficien|congestion|reliab/],
    answer:
      'Splitting data into packets makes networks efficient and reliable. Many users can share the same lines because small packets take turns, a damaged packet can be resent without resending the whole file, and packets can take different routes to avoid busy or broken paths.',
    hints: ['What does a router do?', 'How are packets reassembled?'],
  },

  // ---------- Transmission media ----------
  {
    id: 'media',
    keywords: [/transmission media|transmission medium/, /\bmedia\b|\bmedium\b/, /guided|unguided/, /wired/, /wireless/, /types? of (transmission )?media/],
    answer:
      'Transmission media are the paths that carry data signals from sender to receiver. Wired (guided) media are twisted-pair, coaxial, and fibre-optic cables. Wireless (unguided) media are radio waves, microwaves, infrared, and satellite links.',
    hints: ['How does a twisted-pair cable work?', 'Why is fibre-optic cable so fast?'],
  },
  {
    id: 'twisted-pair',
    keywords: [/twisted/, /\butp\b|\bstp\b/, /ethernet/, /cat ?[3-8]/, /lan cable|rj-?45/],
    answer:
      'A twisted-pair cable has pairs of copper wires twisted around each other, which reduces interference and crosstalk. UTP is unshielded and cheap and is used in Ethernet LAN cables, while STP has a metal shield for extra protection. It is easy to install but works best over short distances.',
    hints: ['What is a coaxial cable?', 'What is crosstalk?'],
  },
  {
    id: 'coaxial',
    keywords: [/coax/, /cable tv|tv cable|cable television/, /\bbnc\b/],
    answer:
      'A coaxial cable has a central copper wire, surrounded by insulation, a metal shield, and an outer cover. The shield protects the signal from interference, so it carries data farther and faster than twisted pair. It is used for cable TV and broadband connections.',
    hints: ['How is fibre-optic cable different?', 'What is a twisted-pair cable?'],
  },
  {
    id: 'fibre',
    keywords: [/fib(re|er)/, /optic/, /light (pulse|signal)/, /total internal reflection/, /glass|laser|\bled\b/],
    answer:
      'A fibre-optic cable sends data as pulses of light through very thin strands of glass or plastic. Light signals travel very fast, lose little strength over long distances, and are not affected by electrical interference. It has the highest bandwidth of all wired media but costs more and is harder to install.',
    hints: ['What is bandwidth?', 'Compare twisted-pair, coaxial and fibre-optic cables.'],
  },
  {
    id: 'compare-wired',
    keywords: [/compar/, /difference between (twisted|coax|fib)/, /which (cable|media) is (best|fastest)/, /\bvs\b|versus/],
    answer:
      'Twisted pair is cheap and easy to install but has the shortest range and lowest speed. Coaxial costs a little more, resists interference better, and carries data farther. Fibre-optic is the fastest, travels the longest distance, and is immune to electrical interference, but it is the most expensive.',
    hints: ['What is attenuation?', 'What are wireless media?'],
  },
  {
    id: 'radio',
    keywords: [/radio wave/, /wi-?fi/, /bluetooth/, /\bfm\b|\bam\b|radio/, /omni/],
    answer:
      'Radio waves are electromagnetic waves that can travel in all directions and pass through walls. They are used for FM radio, Wi-Fi, Bluetooth, and mobile phones. They are convenient because no cable is needed, but signals can be weaker, slower, and easier to intercept than wired media.',
    hints: ['What are microwaves?', 'How do mobile phones use radio waves?'],
  },
  {
    id: 'microwave',
    keywords: [/microwave/, /line.?of.?sight/, /dish|antenna/],
    answer:
      'Microwaves are high-frequency radio waves used for point-to-point communication between two towers or dishes. The two antennas must be in line of sight, so towers are built tall and spaced out. Microwaves carry a lot of data, but rain, fog, and obstacles can weaken the signal.',
    hints: ['What is satellite communication?', 'What is infrared?'],
  },
  {
    id: 'infrared',
    keywords: [/infra.?red/, /remote control|tv remote/, /\bir\b/],
    answer:
      'Infrared waves carry data over short distances using invisible light, such as between a TV remote and a TV. They need a clear line of sight and cannot pass through walls, which also makes them fairly secure but limited in range.',
    hints: ['What are microwaves?', 'What are radio waves?'],
  },
  {
    id: 'satellite',
    keywords: [/satellite/, /\bgps\b/, /geostationary|orbit/, /vsat|uplink|downlink/],
    answer:
      'In satellite communication, a ground station sends a signal up (uplink) to a satellite in orbit, and the satellite sends it back down (downlink) to another place. It can cover huge areas, including oceans and remote regions, and is used for TV broadcasting, GPS, and weather data. The long distance can cause delay, and the equipment is expensive.',
    hints: ['What are microwaves?', 'What are the types of wireless media?'],
  },
  {
    id: 'impairments',
    keywords: [/attenuation/, /noise/, /interference/, /crosstalk/, /dispersion|distortion/, /signal (loss|weak)|weaken/, /impairment/],
    answer:
      'Transmission impairments are problems that damage a signal on its way. Attenuation is the loss of signal strength over distance, noise and interference are unwanted signals that mix in, crosstalk is leaking of signals between nearby wires, and distortion changes the shape of the signal. Shielded cables, repeaters, and fibre-optic cables help reduce these problems.',
    hints: ['What is a twisted-pair cable and how does it reduce crosstalk?', 'Why is fibre-optic cable better?'],
  },

  // ---------- Netiquette ----------
  {
    id: 'netiquette',
    keywords: [/netiquette/, /online (manners|behaviou?r|etiquette)/, /\brespect/, /polite/, /rules? (for|of) (the )?(internet|online)/],
    answer:
      "Netiquette means good manners and respectful behaviour online. Use polite language, respect other people's views and privacy, think before you post, check facts before sharing, and give credit for other people's work. A good rule: treat people online as you would face to face.",
    hints: ['How can I protect my privacy online?', 'What is cyberbullying?'],
  },
  {
    id: 'privacy',
    keywords: [/privacy/, /personal (information|details|data)/, /password/, /\bsafe(ty)?\b|secure/, /stranger/],
    answer:
      "Protect your privacy by not sharing personal details such as your address, phone number, school, or passwords with strangers. Use strong passwords, keep them secret, and think about who can see your posts. Also never share someone else's photos or information without their permission.",
    hints: ['What is cyberbullying?', 'How do I spot fake news?'],
  },
  {
    id: 'fake-news',
    keywords: [/fake news/, /misinformation|rumou?r|hoax/, /verify|fact.?check|\bfacts?\b/, /\bsources?\b|trusted|reliable/, /forward(ed)? message/],
    answer:
      'Not everything online is true. Before sharing, check who published it, look for the same news on trusted sources, and watch for shocking headlines or spelling mistakes. If you cannot verify it, do not forward it, because fake news can spread quickly and cause harm.',
    hints: ['What is netiquette?', 'What is plagiarism?'],
  },
  {
    id: 'cyberbullying',
    keywords: [/bully|bullying/, /harass|troll/, /offensive|abus|hate/, /insult|mean comments?/, /report (a )?(user|post)|block/],
    answer:
      'Cyberbullying is using the internet or phones to hurt, scare, or embarrass someone. If it happens to you or someone else, do not reply angrily, save the evidence, block the person, report it on the platform, and tell a trusted adult or teacher. Never join in or forward hurtful content.',
    hints: ['How can I protect my privacy online?', 'What is good email etiquette?'],
  },
  {
    id: 'email-etiquette',
    keywords: [/e-?mail/, /subject line/, /\bcc\b|\bbcc\b|reply all/, /capital letters|all caps|shout/, /emoji|chat language|sms language/, /message|chat etiquette/],
    answer:
      'In emails and chats: write a clear subject, greet politely, keep the message short, and use proper language. Avoid typing in ALL CAPS, which looks like shouting, and use emojis only when appropriate. Check spelling before sending, and do not use Reply All unless everyone needs the reply.',
    hints: ['What is netiquette?', 'What is cyberbullying?'],
  },
  {
    id: 'copyright',
    keywords: [/copyright/, /plagiar/, /piracy|pirated/, /credit|acknowledg|permission/, /download(ing)? (movies|music|software)/],
    answer:
      "Copyright protects the work of creators such as writers, artists, and musicians. Copying and pasting someone's work as your own is plagiarism, and using pirated software or movies is illegal. Always give credit to the source and ask for permission when needed.",
    hints: ['How do I spot fake news?', 'What is netiquette?'],
  },

  // ---------- Mobile communication ----------
  {
    id: 'mobile',
    keywords: [/mobile communication/, /mobile (network|phone)/, /cellular|\bcells?\b/, /how (does|do) (a )?mobile/, /wireless communication/],
    answer:
      'Mobile communication lets devices exchange information wirelessly over a cellular network. The area is divided into cells, and each cell has a tower (base station). Your phone sends radio signals to the nearest tower, which connects the call or data to the network, and your phone can move from cell to cell while staying connected.',
    hints: ['What does a cell tower do?', 'What is a SIM card?'],
  },
  {
    id: 'cell-tower',
    keywords: [/cell tower|mobile tower|base station/, /\btower\b/, /hand.?off|handover/, /coverage|no network|signal strength/],
    answer:
      'A cell tower (base station) sends and receives radio signals to and from mobile phones in its cell. Towers are linked to the wider telephone and internet network. When you travel, your call is handed over from one tower to the next so it does not drop.',
    hints: ['What is a SIM card?', 'What are 2G, 3G, 4G and 5G?'],
  },
  {
    id: 'sim',
    keywords: [/\bsim\b/, /subscriber/, /imsi/, /\bgsm\b|\bcdma\b/, /sim card/],
    answer:
      'A SIM (Subscriber Identity Module) card is a small chip that identifies you, the subscriber, to the mobile network. It stores your phone number and network details, so the network knows who is making a call or using data. You can move your SIM to another phone and keep your number.',
    hints: ['What does a cell tower do?', 'What are the mobile generations?'],
  },
  {
    id: '2g',
    keywords: [/\b2g\b/, /\bgsm\b/, /\bsms\b/],
    answer:
      '2G introduced digital voice calls and text messages (SMS), with much better call quality and security than the first analogue generation. It supports only very slow data, but it was the beginning of mobile messaging.',
    hints: ['What can 3G do?', 'Compare 2G, 3G, 4G and 5G.'],
  },
  {
    id: '3g',
    keywords: [/\b3g\b/, /video call/, /mobile internet/],
    answer:
      '3G brought faster mobile internet, which made web browsing, email, and video calls on phones possible. It was the first generation designed for real mobile data, and it paved the way for smartphones.',
    hints: ['What improved in 4G?', 'Compare 2G, 3G, 4G and 5G.'],
  },
  {
    id: '4g',
    keywords: [/\b4g\b/, /\blte\b/, /volte/, /hd video|streaming/],
    answer:
      '4G (LTE) gives high-speed mobile broadband, so you can stream HD video, play online games, and use apps smoothly. It uses data networks for everything, including voice calls (VoLTE).',
    hints: ['What is special about 5G?', 'Compare 2G, 3G, 4G and 5G.'],
  },
  {
    id: '5g',
    keywords: [/\b5g\b/, /ultra.?low latency|iot|internet of things|self.?driving|smart (city|home)/],
    answer:
      '5G is the latest generation, with very high speeds, very low delay (latency), and the ability to connect many devices at once. It supports things like smart cities, remote surgery, self-driving vehicles, and the Internet of Things.',
    hints: ['Compare 2G, 3G, 4G and 5G.', 'What does a cell tower do?'],
  },
  {
    id: 'generations',
    keywords: [/generation/, /differences?/, /between/, /compar/, /\b[2-5]g\b/, /evolution/, /1g/],
    answer:
      'Each mobile generation improved on the last: 1G offered analogue voice only, 2G added digital calls and SMS, 3G brought mobile internet and video calls, 4G gave fast broadband for streaming, and 5G offers very high speed, very low delay, and support for many connected devices.',
    hints: ['What is special about 5G?', 'What is a SIM card?'],
  },
];

const THANKS = /\b(thanks|thank you|thx|great|nice|awesome)\b/;
const GREETING = /^(hi|hello|hey|hii+|good (morning|afternoon|evening)|namaste)\b/;
const TOUR = /which room|where (should|do) i (go|start)|visit first|navigate|museum tour|start.*tour|what (can|should) i (learn|explore)|what topics|what can you (do|help)|who are you/;
const ROOM_HINTS: Record<string, string[]> = {
  packets: ['What is a data packet?', 'What are the header, payload and trailer?', 'What does a router do?'],
  'transmission-media': ['What are wired and wireless media?', 'Why is fibre-optic cable fast?', 'What is attenuation?'],
  netiquette: ['What is netiquette?', 'How can I protect my privacy online?', 'How do I spot fake news?'],
  'mobile-comm': ['What is a SIM card?', 'What does a cell tower do?', 'Compare 2G, 3G, 4G and 5G.'],
  explore: ['What is a computer network?', 'What are the types of networks?', 'Where should I start the museum tour?'],
};
const GENERAL_HINTS = ['What is a computer network?', 'What is a data packet?', 'What are transmission media?', 'What is netiquette?', 'How does mobile communication work?'];

const OFF_TOPIC_REPLY =
  "Oops! 😊 I don't know about that topic. I can only share information about computer networks: network basics, data packets, transmission media, netiquette, and mobile communication.";

function formatHints(hints: string[]): string {
  return `\n\n💡 You can also ask: ${hints.map((h) => `“${h}”`).join(' or ')}`;
}

function offlineEduGuideReply(message: string, currentRoom = 'lobby'): string {
  const q = message.toLowerCase().trim();

  if (GREETING.test(q) && q.split(/\s+/).length <= 4) {
    return (
      "Hello, explorer! I'm EduGuide, your Virtual Network Museum guide. I can help with computer networks, data packets, transmission media, netiquette, and mobile communication." +
      formatHints(ROOM_HINTS[currentRoom] || GENERAL_HINTS.slice(0, 3))
    );
  }

  if (TOUR.test(q)) {
    return (
      'Welcome to the museum! Start with the Packets Room to see how information travels across a network. Then visit Transmission Media (how data is carried), Netiquette (respectful online behaviour), and Mobile Communication (how phones connect).' +
      formatHints(GENERAL_HINTS.slice(0, 2))
    );
  }

  if (THANKS.test(q) && q.split(/\s+/).length <= 6) {
    return "You're welcome, explorer! Keep exploring the museum." + formatHints(ROOM_HINTS[currentRoom] || GENERAL_HINTS.slice(0, 3));
  }

  // Score every topic; the one matching the most keyword patterns wins.
  let best: Topic | null = null;
  let bestScore = 0;
  for (const topic of TOPICS) {
    // More matched patterns wins; on a tie, the longer (more specific) matched text wins.
    const score = topic.keywords.reduce((n, re) => {
      const m = q.match(re);
      return m ? n + 1000 + m[0].length : n;
    }, 0);
    if (score > bestScore) {
      best = topic;
      bestScore = score;
    }
  }

  if (best) {
    return best.answer + formatHints(best.hints);
  }

  return OFF_TOPIC_REPLY + formatHints(ROOM_HINTS[currentRoom] || GENERAL_HINTS.slice(0, 3));
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  if (!process.env.GEMINI_API_KEY?.trim()) {
    console.warn('GEMINI_API_KEY not found in .env: EduGuide will use its built-in offline answers.');
  }

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post('/api/eduguide/chat', async (req, res) => {
    const body = (req.body || {}) as {
      message?: string;
      currentRoom?: string;
      history?: ChatHistoryItem[];
    };
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const currentRoom = typeof body.currentRoom === 'string' ? body.currentRoom : 'lobby';

    if (!message) {
      res.status(400).json({ error: 'Please enter a message for EduGuide.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY?.trim();

    // No Gemini key: the museum guide still answers every supported topic offline.
    if (!apiKey) {
      res.json({ reply: offlineEduGuideReply(message, currentRoom), mode: 'offline' });
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const history: ChatHistoryItem[] = Array.isArray(body.history)
        ? body.history
            .slice(-10)
            .filter(
              (item): item is ChatHistoryItem =>
                !!item &&
                (item.role === 'user' || item.role === 'model') &&
                typeof item.text === 'string' &&
                item.text.trim().length > 0,
            )
        : [];

      const contents = [
        ...history.map((item) => ({
          role: item.role,
          parts: [{ text: item.text }],
        })),
        { role: 'user' as const, parts: [{ text: message }] },
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction:
            `You are EduGuide, a friendly museum guide for a Class IX Virtual Network Museum about Chapter 5: Computer Networks. ` +
            `Explain in clear, encouraging language suitable for Class IX students, using 2 to 5 short sentences. ` +
            `Answer any question about computer networks: network types, devices, data packets (header, payload, trailer, routers, reassembly), ` +
            `transmission media (twisted-pair, coaxial, fibre-optic, radio waves, microwaves, infrared, satellite), transmission impairments, ` +
            `netiquette (respect, privacy, fake news, cyberbullying, copyright), and mobile communication (SIM, cell towers, 2G to 5G). ` +
            `End each answer with one short follow-up question the student could explore next. ` +
            `IMPORTANT: Only answer questions about computer networks and the topics above. If the question is about anything else (for example maths, science, sports, movies, homework in other subjects, or general chat), do not answer it. ` +
            `Instead reply exactly in this spirit: "Oops! I don't know about that topic. I can only share information about computer networks." and then suggest one computer-network question they could ask. ` +
            `The visitor is currently in: ${currentRoom}.`,
        },
      });

      const reply = response.text?.trim();

      if (!reply) {
        res.json({ reply: offlineEduGuideReply(message, currentRoom), mode: 'offline' });
        return;
      }

      res.json({ reply, mode: 'online' });
    } catch (error) {
      console.error('Gemini request failed; using offline guide:', error instanceof Error ? error.message : error);
      res.json({ reply: offlineEduGuideReply(message, currentRoom), mode: 'offline' });
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
    console.log(`Virtual Network Museum server running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to start Virtual Network Museum server:', error);
  process.exit(1);
});
