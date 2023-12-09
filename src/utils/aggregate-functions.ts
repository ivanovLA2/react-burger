export default function groupCountStrings(strings: string[]): {string: string, count: number}[] {
  const counts: {[key: string]: number} = {};

  strings.forEach(str => {
    counts[str] = (counts[str] || 0) + 1;
  });

  return Object.entries(counts).map(([str, count]) => ({
    string: str,
    count: count
  }));
}