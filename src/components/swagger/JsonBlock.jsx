/* Syntax-highlight a JSON string */
export function syntaxHighlight(json) {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
    .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
    .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
    .replace(/: (null)/g, ': <span class="json-null">$1</span>');
}

export function formatJson(obj) {
  return syntaxHighlight(JSON.stringify(obj, null, 2));
}

/* Simple JSON viewer block */
export default function JsonBlock({ data }) {
  const html = formatJson(data);
  return (
    <div className="sw-json-block">
      <pre dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
