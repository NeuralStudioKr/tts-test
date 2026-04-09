const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.static('public'))

// TTS proxy to OpenAI
app.post('/tts', async (req, res) => {
  const { text, voice = 'alloy' } = req.body
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return res.status(503).json({ error: 'OPENAI_API_KEY not set' })
  }
  if (!text) {
    return res.status(400).json({ error: 'text required' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: text.slice(0, 4096),
        voice,
        response_format: 'mp3',
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(response.status).json({ error: err })
    }

    const buffer = await response.arrayBuffer()
    res.set('Content-Type', 'audio/mpeg')
    res.set('Content-Length', buffer.byteLength)
    res.send(Buffer.from(buffer))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3100
app.listen(PORT, () => {
  console.log(`TTS Test Server running at http://localhost:${PORT}`)
  console.log(`Set OPENAI_API_KEY env variable to use OpenAI TTS`)
})
