import { NextResponse } from 'next/server'

const RETELL_API_KEY = process.env.RETELL_API_KEY
const RETELL_VOICE_AGENT_ID = process.env.RETELL_VOICE_AGENT_ID ?? 'agent_01f72643f56ef16629f99c0b7f'
const RETELL_CHAT_AGENT_ID  = process.env.RETELL_CHAT_AGENT_ID  ?? 'agent_af8ede01698b483f7376e8be2f'

export async function POST(req: Request) {
  try {
    if (!RETELL_API_KEY) {
      return NextResponse.json(
        { error: 'RETELL_API_KEY is not configured on the server.' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { mode, firstName, lastName, email, phone, chatId, message } = body

    // ── Voice: create a web call session, return accessToken ──
    if (mode === 'voice') {
      const retellRes = await fetch('https://api.retellai.com/v2/create-web-call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: RETELL_VOICE_AGENT_ID,
          retell_llm_dynamic_variables: {
            first_name: firstName ?? '',
            last_name:  lastName  ?? '',
            email:      email     ?? '',
            phone:      phone     ?? '',
          },
        }),
      })

      if (!retellRes.ok) {
        const errText = await retellRes.text()
        console.error('[retell/voice] Retell API error:', retellRes.status, errText)
        return NextResponse.json(
          { error: `Retell voice error: ${retellRes.status}` },
          { status: retellRes.status }
        )
      }

      const data = await retellRes.json()

      if (!data.access_token) {
        console.error('[retell/voice] No access_token in Retell response:', data)
        return NextResponse.json(
          { error: 'Retell did not return an access token.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ accessToken: data.access_token })
    }

    // ── Chat: create a new chat session, return chatId ──
    if (mode === 'text') {
      const retellRes = await fetch('https://api.retellai.com/v2/create-chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RETELL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: RETELL_CHAT_AGENT_ID,
          retell_llm_dynamic_variables: {
            first_name: firstName ?? '',
            last_name:  lastName  ?? '',
            email:      email     ?? '',
            phone:      phone     ?? '',
          },
        }),
      })

      if (!retellRes.ok) {
        const errText = await retellRes.text()
        console.error('[retell/text] Retell API error:', retellRes.status, errText)
        return NextResponse.json(
          { error: `Retell chat error: ${retellRes.status}` },
          { status: retellRes.status }
        )
      }

      const data = await retellRes.json()

      if (!data.chat_id) {
        console.error('[retell/text] No chat_id in Retell response:', data)
        return NextResponse.json(
          { error: 'Retell did not return a chat ID.' },
          { status: 500 }
        )
      }

      return NextResponse.json({ chatId: data.chat_id })
    }

    // ── Chat message: send a message and return the agent reply ──
    if (mode === 'chat_message') {
      if (!chatId || !message) {
        return NextResponse.json(
          { error: 'chatId and message are required for chat_message mode.' },
          { status: 400 }
        )
      }

      const retellRes = await fetch(
        `https://api.retellai.com/v2/send-chat-message/${encodeURIComponent(chatId)}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RETELL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        }
      )

      if (!retellRes.ok) {
        const errText = await retellRes.text()
        console.error('[retell/chat_message] Retell API error:', retellRes.status, errText)
        return NextResponse.json(
          { error: `Retell message error: ${retellRes.status}` },
          { status: retellRes.status }
        )
      }

      const data = await retellRes.json()

      // Normalise reply shape — Retell may use content or message
      const replyText =
        data?.content ??
        data?.message ??
        data?.response ??
        'Sorry, I could not get a reply. Please try again.'

      return NextResponse.json({ reply: { content: replyText } })
    }

    // ── Unknown mode ──
    return NextResponse.json(
      { error: `Unknown mode: "${mode}". Expected "voice", "text", or "chat_message".` },
      { status: 400 }
    )

  } catch (err: any) {
    console.error('[retell] Unhandled error:', err)
    return NextResponse.json(
      { error: err?.message ?? 'An unexpected server error occurred.' },
      { status: 500 }
    )
  }
}
