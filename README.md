# Wodah Burner ⚡️

A zero-knowledge, end-to-end encrypted (E2EE) "ghost bin" for sharing sensitive snippets that self-destruct.

### 🛡️ Why it's secure
Most "secret link" tools store your data in plain text or encrypt it on the server. **Wodah Burner is different:**

1. **Client-Side Encryption:** Your data is encrypted in your browser using AES-GCM 256-bit encryption before it ever touches the internet.
2. **Zero-Knowledge:** The decryption key is stored in the URL fragment (`#`). Browsers do not send this fragment to the server. We physically cannot read your data.
3. **Automatic Destruction:** Secrets are stored in a volatile Redis cache. Once the link is clicked, the data is deleted from the server immediately.
4. **Bot Protection:** The secret is not "burned" until a human clicks the "Reveal" button, preventing Slack or Discord bots from accidentally destroying your link.

### 🚀 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** Upstash Redis (Serverless)
- **Encryption:** Web Crypto API (Native Browser AES-GCM)
- **Styling:** Tailwind CSS

### 🛠️ Installation
1. Clone the repo.
2. Install dependencies: `npm install`
3. Set up your `.env.local`:
   ```env
   UPSTASH_REDIS_REST_URL=your_url
   UPSTASH_REDIS_REST_TOKEN=your_token
