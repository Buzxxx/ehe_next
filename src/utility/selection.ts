/**
 * Toggles the selection state of an item in a list.
 * @param items - The array of items.
 * @param index - The index of the item to toggle.
 * @returns A new array with the item's `isSelected` state toggled.
 */
export const toggleItemSelection = <T extends { isSelected: boolean }>(
  items: T[],
  index: number
): T[] => {
  return items.map((item, idx) =>
    idx === index ? { ...item, isSelected: !item.isSelected } : item
  );
};

/**
 * Marks all items in the array as selected.
 * @param items - The array of items.
 * @returns A new array where all items have `isSelected` set to `true`.
 */
export const selectAllItems = <T extends { isSelected: boolean }>(
  items: T[]
): T[] => {
  return items.map((item) => ({ ...item, isSelected: true }));
};

/**
 * Unselects all items in the array.
 * @param items - The array of items.
 * @returns A new array where all items have `isSelected` set to `false`.
 */
export const unselectAllItems = <T extends { isSelected: boolean }>(
  items: T[]
): T[] => {
  return items.map((item) => ({ ...item, isSelected: false }));
};

/**
 * Retrieves the IDs of all selected items.
 * @param items - The array of items.
 * @returns An array of IDs for items where `isSelected` is `true`.
 */
export const getSelectedItems = <T extends { id: number; isSelected: boolean }>(
  items: T[]
): number[] => {
  return items.filter((item) => item.isSelected).map((item) => item.id);
};

/**
 * Counts the number of selected items in the array.
 * @param items - The array of items.
 * @returns The number of items where `isSelected` is `true`.
 */
export const getSelectedCount = <T extends { isSelected: boolean }>(
  items: T[]
): number => {
  return items.filter((item) => item.isSelected).length;
};

/**
 * Returns the total number of items in the array.
 * @param items - The array of items.
 * @returns The total number of items in the array.
 */
export const getTotalItems = <T>(items: T[]): number => {
  return items.length;
};
