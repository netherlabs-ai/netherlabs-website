// Illustrative mock of the NetherGuard v0.2 one-page report. The layout and section names follow the real
// report (engineering/state/guard-ship-v02-20261126/proof/report-mac-full.png); the findings and counts are an
// example, not a real machine. Pure markup and CSS, no JavaScript.

const fixFirst = [
  { title: "Risky AI tool connections", detail: "A connector runs a local program and has an API key pasted into its settings." },
  { title: "AI assistants that act without asking", detail: "One coding agent is set to run commands without a confirmation." },
  { title: "API keys saved in plain files", detail: "2 keys found by name in config files. Values are never shown." },
];

const chains = [
  { title: "An injected prompt can reach your keys", detail: "Agent acts alone + key in a plain file" },
];

const worth = [
  { title: "Browser extensions that can read every site", detail: "3 extensions, 1 is an AI helper" },
];

export default function GuardReport() {
  return (
    <div className="gr" aria-hidden="true">
      <div className="gr-head">
        <span className="gr-score"><b>3</b><small>to fix</small></span>
        <div>
          <p className="gr-kicker">NETHERGUARD · ONE-PAGE REPORT</p>
          <p className="gr-title">3 things need your attention first.</p>
          <p className="gr-sub">Example Mac · scanned on this computer · nothing uploaded</p>
        </div>
      </div>
      <p className="gr-section">FIX THESE FIRST</p>
      <ul className="gr-list">
        {fixFirst.map((item, index) => (
          <li key={item.title} className="gr-item gr-important" style={{ animationDelay: `${index * 140}ms` }}>
            <span className="gr-badge">IMPORTANT</span>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </li>
        ))}
      </ul>
      <p className="gr-section">HOW THESE PROBLEMS COMBINE</p>
      <ul className="gr-list">
        {chains.map((item) => (
          <li key={item.title} className="gr-item gr-chain">
            <span className="gr-badge">CHAIN</span>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </li>
        ))}
      </ul>
      <p className="gr-section">WORTH FIXING</p>
      <ul className="gr-list">
        {worth.map((item) => (
          <li key={item.title} className="gr-item">
            <span className="gr-badge gr-badge-muted">WORTH FIXING</span>
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
