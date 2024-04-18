export function fromTextToDate(text: string) {
    const year = +text.substring(0, 4);
    const month = +text.substring(5, 7) - 1;
    const day = +text.substring(8, 10);
    return new Date(year, month, day);
  }