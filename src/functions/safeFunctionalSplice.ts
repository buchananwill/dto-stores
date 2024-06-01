/**
 * IMPORTANT: This method exists to remove ONLY the first matching item.
 * This allows lists to effectively track the number of subscribers, and the last un-subscriber can turn the lights off.
 * */
export function safeFunctionalSplice<T>(list: T[], item: T) {
  const indexFirst = list.findIndex((listItem) => listItem === item);
  if (indexFirst >= 0) {
    const copy = list.slice();
    copy.splice(indexFirst, 1);
    return copy;
  } else return list;
}
