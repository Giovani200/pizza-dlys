/**
 * Formats a euro amount the way the restaurant's menu shows it:
 * "6 €" for whole amounts, "8,50 €" otherwise, "+1 €" when signed.
 * The space before € is a non-breaking space so a price never wraps.
 */
export function formatPrice(amount: number, { signed = false } = {}): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    signDisplay: signed ? "always" : "auto",
  }).format(amount);
}

export function formatTime(time: string): string {
  return time.replace(":", "h");
}

/**
 * Replaces `{name}` placeholders in a text from content/ui.json.
 * Throws on a missing value so a typo never reaches the page as "{count}".
 */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    if (!(name in values)) throw new Error(`Missing value "${name}" for template "${template}"`);
    return String(values[name]);
  });
}

export function lowercaseFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}
