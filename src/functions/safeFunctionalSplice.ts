export function safeFunctionalSplice<T>(list: T[], item: T) {
  const indexFirst = list.findIndex((listItem) => listItem === item);
  if (indexFirst >= 0) return list.slice().splice(indexFirst, 1);
  else return list;
}
