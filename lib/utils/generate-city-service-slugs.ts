import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";

export interface CityServiceParam {
  cityService: string;
}

export interface CityServiceContext {
  locationId: string;
  serviceId: string;
  slug: string;
}

export function generateAllCityServiceParams(): CityServiceParam[] {
  return locations.flatMap((loc) =>
    loc.services.map((serviceId) => ({
      cityService: `${loc.slug}-${serviceId}`,
    }))
  );
}

export function parseCityServiceSlug(
  slug: string
): CityServiceContext | null {
  for (const loc of locations) {
    const prefix = `${loc.slug}-`;
    if (slug.startsWith(prefix)) {
      const serviceId = slug.slice(prefix.length);
      if (loc.services.includes(serviceId)) {
        return {
          locationId: loc.id,
          serviceId,
          slug,
        };
      }
    }
  }
  return null;
}

export function getAllValidSlugs(): string[] {
  return generateAllCityServiceParams().map((p) => p.cityService);
}

export function getServiceForCity(
  locationId: string,
  serviceId: string
): { location: (typeof locations)[number]; service: (typeof services)[number] } | null {
  const location = locations.find((l) => l.id === locationId);
  const service = services.find((s) => s.id === serviceId);

  if (!location || !service) return null;
  if (!location.services.includes(serviceId)) return null;

  return { location, service };
}
