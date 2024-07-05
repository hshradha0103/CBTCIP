const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one event
router.get('/events/:id', getEvent, (req, res) => {
    res.json(res.event);
});

// Create an event
router.post('/events', async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        venue: req.body.venue,
        organizer: req.body.organizer
    });

    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an event
router.patch('/events/:id', getEvent, async (req, res) => {
    if (req.body.title != null) {
        res.event.title = req.body.title;
    }
    if (req.body.description != null) {
        res.event.description = req.body.description;
    }
    if (req.body.date != null) {
        res.event.date = req.body.date;
    }
    if (req.body.venue != null) {
        res.event.venue = req.body.venue;
    }
    if (req.body.organizer != null) {
        res.event.organizer = req.body.organizer;
    }

    try {
        const updatedEvent = await res.event.save();
        res.json(updatedEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an event
router.delete('/events/:id', getEvent, async (req, res) => {
    try {
        await res.event.remove();
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getEvent(req, res, next) {
    let event;
    try {
        event = await Event.findById(req.params.id);
        if (event == null) {
            return res.status(404).json({ message: 'Cannot find event' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.event = event;
    next();
}

module.exports = router;
