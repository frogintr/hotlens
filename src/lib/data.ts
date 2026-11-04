import type { KolRecord, TeardownRecord } from '../types/hotlens';
import { kolRegistry, teardownRegistry } from './registry';

export function getAllTeardowns(): TeardownRecord[] {
  return [...teardownRegistry].sort((a, b) => b.heatScore - a.heatScore);
}

export function getTeardownBySlug(slug: string): TeardownRecord | undefined {
  return teardownRegistry.find((t) => t.slug === slug);
}

export function getAllKols(): KolRecord[] {
  return [...kolRegistry];
}

export function getKolByHandle(handle: string): KolRecord | undefined {
  return kolRegistry.find((k) => k.handle === handle);
}
