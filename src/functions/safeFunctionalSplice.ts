export function safeFunctionalSplice<T>(list: T[], item: T) {
  const indexFirst = list.findIndex((listItem) => listItem === item);
  if (indexFirst >= 0) {
    const copy = list.slice();
    copy.splice(indexFirst, 1);
    return copy;
  } else return list;
}
