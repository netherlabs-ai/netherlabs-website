# Contact data operations

## Production path

The homepage drawer and `/contact/` route submit the same limited workflow diagnostic payload to:

```text
/.netlify/functions/intake-form
```

The function validates size, field lengths, email format, timing and source values. It rejects unsupported methods and content types, blocks defined abuse patterns, and sends accepted fields to the single `workflow-diagnostic` Netlify Forms sink. It never logs submitted names, email addresses, workflow descriptions or challenge text.

The form fields are name, work email, company, timing, workflow or process, challenge, and source. Name, work email and challenge are required. A hidden Netlify form declaration on `/contact/` enables build-time form detection.

## Data lifecycle

Netlify Forms and the Nether Labs organizational mailbox are the approved processing systems. Submissions and related correspondence may be retained for up to 24 months after the last interaction. A documented legal requirement, legal hold, active legal claim, regulatory matter or security investigation may require longer retention.

The Nether Labs privacy lead handles access, correction, deletion and complaint requests through hello@netherlabs.ai, subject to applicable law and identity verification.

## Security and monitoring

- The browser calls only the same-origin intake function.
- The function accepts JSON bodies up to 16,384 bytes.
- The downstream sink must use HTTPS and must be `netherlabs.ai` or a Netlify deploy host.
- Downstream calls time out and retry no more than three times.
- Responses disable caching and MIME sniffing.
- Logs contain stable operational metadata only, never submitted content.
- Synthetic monitoring must use the unit-test sink, not a real production submission.
- Alert when the function returns repeated 5xx responses or the Netlify Forms sink stops acknowledging submissions.

## Incident handling

If delivery fails, the browser preserves a prepared diagnostic brief for user recovery. Operators should inspect function status, Netlify Forms detection, sink acknowledgement, and non-personal logs. Do not copy live submission content into tickets, logs or chat.
