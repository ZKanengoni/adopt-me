export default async function fetchSearch(queryKey) {
  const { animal, location, breed } = queryKey;

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok) {
    throw new Error(`pet search not okay: ${animal}, ${location}, ${breed}`);
  }

  return res.json();
}
