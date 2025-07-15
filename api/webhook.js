import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const VERIFY_TOKEN = 'test1234';
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Forbidden');
    }
  }

  if (req.method === 'POST') {
    try {
      // Forward payload to your real server
      await axios.post('https://planning.sandervh.nl/webhook.php', req.body, {
        headers: { 'Content-Type': 'application/json' }
      });
      return res.status(200).send('Forwarded');
    } catch (err) {
      console.error('Forwarding failed:', err.message);
      return res.status(500).send('Error forwarding');
    }
  }

  return res.status(405).send('Method Not Allowed');
}
