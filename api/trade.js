const { v4: uuidv4 } = require('uuid');

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const order = req.body || {};

    if (!order.asset) {
        return res.status(422).json({ error: 'Asset is required' });
    }
    if (!order.side) {
        return res.status(422).json({ error: 'Side is required' });
    }
    if (!order.type) {
        return res.status(422).json({ error: 'Type is required' });
    }
    if (order.quantity == null || order.quantity <= 0) {
        return res.status(422).json({ error: 'Quantity is invalid' });
    }
    if (order.type === 'LIMIT' && (order.price == null || order.price <= 0)) {
        return res.status(422).json({ error: 'Price is invalid' });
    }
    if (order.notional == null || order.notional <= 0) {
        return res.status(422).json({ error: 'Notional is invalid' });
    }

    return res.status(200).json({
        ...order,
        id: uuidv4(),
        timestamp: Date.now(),
    });
};