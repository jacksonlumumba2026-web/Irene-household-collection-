export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function formatKES(amount: number) {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}
