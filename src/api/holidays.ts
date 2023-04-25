export function getHolidays(): Promise<any> {
  return fetch(
    "https://calendrier.api.gouv.fr/jours-feries/metropole.json"
  ).then((response) => response.json());
}
