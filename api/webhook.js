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

}
