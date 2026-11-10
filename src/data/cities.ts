export type City = {
  name: string
  aliases?: string[]
  districts?: string[]
  parent?: string
}

export const cities: City[] = [
  {
    name: 'Heilbronn',
    districts: [
      'Böckingen',
      'Sontheim',
      'Neckargartach',
      'Frankenbach',
      'Horkheim',
      'Klingenberg',
      'Biberach',
      'Kirchhausen',
    ],
  },
  { name: 'Neckarsulm' },
  { name: 'Weinsberg' },
  { name: 'Flein' },
  { name: 'Leingarten' },
  { name: 'Untergruppenbach' },
  { name: 'Bad Friedrichshall' },
  { name: 'Schwäbisch Hall' },
  { name: 'Stuttgart' },
  { name: 'Ludwigsburg' },
  { name: 'Heidelberg' },
  { name: 'Mannheim' },
  { name: 'Karlsruhe' },
  { name: 'Berlin' },
  { name: 'Hamburg' },
  { name: 'Bremen' },
  { name: 'Leipzig' },
  { name: 'Dresden' },
  { name: 'München', aliases: ['Munich'] },
  { name: 'Köln', aliases: ['Cologne'] },
  { name: 'Nürnberg', aliases: ['Nuremberg'] },
  { name: 'Frankfurt am Main', aliases: ['Frankfurt'] },
  { name: 'Hannover', aliases: ['Hanover'] },
  { name: 'Braunschweig', aliases: ['Brunswick'] },
  { name: 'Düsseldorf' },
  { name: 'Dortmund' },
  { name: 'Essen' },
  { name: 'Bonn' },
]

// "München", "Muenchen", "munchen" and " MÜNCHEN " all become "munchen"
export function normalize(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // ü → u
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u') // ue → u
}

export function findCity(input: string): City | undefined {
  const key = normalize(input)

  for (const city of cities) {
    // 1. City name or alias: "Heilbronn", "Munich"
    if (
      [city.name, ...(city.aliases ?? [])].some((n) => normalize(n) === key)
    ) {
      return city
    }
    // 2. District: "Sontheim" → only Sontheim, but remember it belongs to Heilbronn
    const district = city.districts?.find((d) => normalize(d) === key)
    if (district) {
      return { name: district, parent: city.name }
    }
  }
  return undefined
}

export function isInCity(location: string, city: City): boolean {
  const key = normalize(location)
  return [city.name, ...(city.districts ?? [])].some(
    (n) => normalize(n) === key,
  )
}
