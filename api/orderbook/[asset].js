
const btcOrderbook = require('../../server/data/btc_orderbook.json');
const ethOrderbook = require('../../server/data/eth_orderbook.json');

module.exports = (req, res) => {
    const { asset } = req.query;

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    let data = null;

    switch ((asset || '').toUpperCase()) {
        case 'BTC':
            data = btcOrderbook;
            break;
        case 'ETH':
            data = ethOrderbook;
            break;
        default:
            res.status(404).json({ error: 'Unknown asset' });
            return;
    }

    res.status(200).json(data);
};