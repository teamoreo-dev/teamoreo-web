
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[0.35rem] px-5 py-2.5 text-sm font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export const btnPrimary = `${base} border border-brand bg-brand text-white hover:bg-brand-dark`;
export const btnSecondary = `${base} border border-ink/20 bg-white text-ink hover:border-ink hover:bg-surface`;
export const btnDanger = `${base} border border-red-700 bg-red-700 text-white hover:bg-red-800`;
export const btnSmall = "min-h-9 px-3 py-1.5 text-xs";

export const inputClass =
  "mt-1 block w-full rounded-[0.35rem] border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 aria-[invalid=true]:border-red-600";
export const labelClass = "block text-sm font-semibold text-ink";
export const errorTextClass = "mt-1 text-sm text-red-700";

export const tableWrap = "overflow-x-auto rounded-lg border border-line bg-white";
export const th = "whitespace-nowrap border-b border-line bg-surface px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted";
export const td = "border-b border-line px-4 py-3 align-middle text-sm text-ink last:border-b-0";
