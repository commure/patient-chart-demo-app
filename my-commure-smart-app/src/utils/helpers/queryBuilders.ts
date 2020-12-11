export const buildNameQuery = (searchName: string): string => {
  const trimmedName = searchName.trim();
  if (trimmedName === "") return "";
  const query = trimmedName
    .split(" ")
    .filter(namePart => namePart !== "")
    .join(",");
  return `name=${query}`;
};
