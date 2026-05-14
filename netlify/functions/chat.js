// Netlify serverless function — Sips & Creations chat proxy
// OpenRouter API key stored in Netlify env vars, never exposed to browser

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server misconfigured' }) };
  }

  let body;
  try { body = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { messages, pageContext } = body;
  if (!messages || !Array.isArray(messages)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'messages required' }) };
  }

  const BASE_SYSTEM_PROMPT = `Social media growth coach. Channel: "Sips & Creations" (YouTube ~65 subs, Shorts get 10x more views than long videos; Instagram ~256 followers; Canadian DIY, son Amane age 6 crochets and sells at community stands).

STRICT RULES:
1. Plain text only. No asterisks, no pound signs, no dashes, no numbered lists.
2. Two sentences maximum. Not three. Two.
3. Start with the actual answer. No opener. No name.
4. One idea only per message.
If asked for a script, write it as plain text with no intro or commentary.`;

  // Inject live page context so the bot knows exactly what Akiko sees on screen
  const SYSTEM_PROMPT = pageContext
    ? `${BASE_SYSTEM_PROMPT}\n\n${pageContext}`
    : BASE_SYSTEM_PROMPT;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://portal.netherlabs.ai',
      'X-Title': 'Sips & Creations Coach',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      max_tokens: 120,
      temperature: 0,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Upstream error' }) };
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'https://portal.netherlabs.ai' },
    body: JSON.stringify({ reply }),
  };
};
