// Cache for loaded creatures
let creaturesCache = null;
let creaturesIndex = null;

// Utility to load creatures from markdown files with performance optimizations
export async function loadCreatures(options = {}) {
  const { limit, offset = 0, searchTerm = '', forceReload = false } = options;

  try {
    // Check cache first
    if (!forceReload && creaturesCache) {
      let filtered = creaturesCache;

      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(creature =>
          creature.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply pagination
      if (limit) {
        filtered = filtered.slice(offset, offset + limit);
      }

      return {
        creatures: filtered,
        total: creaturesCache.length,
        hasMore: limit ? (offset + limit) < creaturesCache.length : false
      };
    }

    // Load all creatures (only once)
    if (!creaturesCache) {
      const creatureModules = import.meta.glob('/src/assets/creatures/*.md', {
        as: 'raw',
        eager: true
      });

      const creatures = [];

      for (const [path, content] of Object.entries(creatureModules)) {
        try {
          const creature = parseCreatureMarkdown(content);
          if (creature) {
            creatures.push(creature);
          }
        } catch (error) {
          console.warn(`Failed to parse creature file ${path}:`, error);
        }
      }

      // Sort creatures by name for consistent ordering
      creatures.sort((a, b) => a.name.localeCompare(b.name));

      creaturesCache = creatures;

      // Create index for faster searches (only essential data)
      creaturesIndex = creatures.map(c => ({
        name: c.name,
        size: c.size,
        challenge: c.challenge
      }));
    }

    // Apply filters and pagination
    let filtered = creaturesCache;

    if (searchTerm) {
      filtered = filtered.filter(creature =>
        creature.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const total = filtered.length;

    if (limit) {
      filtered = filtered.slice(offset, offset + limit);
    }

    return {
      creatures: filtered,
      total,
      hasMore: limit ? (offset + limit) < total : false
    };

  } catch (error) {
    console.error('Failed to load creatures:', error);
    return { creatures: [], total: 0, hasMore: false };
  }
}

// Get creature index for fast searches
export function getCreatureIndex() {
  return creaturesIndex || [];
}

// Clear cache (useful for development)
export function clearCreatureCache() {
  creaturesCache = null;
  creaturesIndex = null;
}

function parseCreatureMarkdown(content) {
  try {
    // Split frontmatter and body
    const parts = content.split('---');
    if (parts.length < 3) {
      throw new Error('Invalid markdown format');
    }

    // Parse frontmatter (YAML-like)
    const frontmatterText = parts[1].trim();
    const frontmatter = parseFrontmatter(frontmatterText);

    // Get body content
    const body = parts.slice(2).join('---').trim();

    // Convert to the expected format
    const creature = {
      layout: frontmatter.layout || 'creature',
      name: frontmatter.name,
      tags: frontmatter.tags || [],
      cha: frontmatter.cha,
      wis: frontmatter.wis,
      int: frontmatter.int,
      con: frontmatter.con,
      dex: frontmatter.dex,
      str: frontmatter.str,
      size: frontmatter.size,
      alignment: frontmatter.alignment,
      challenge: frontmatter.challenge,
      languages: frontmatter.languages,
      skills: frontmatter.skills,
      speed: frontmatter.speed,
      hit_points: frontmatter.hit_points,
      armor_class: frontmatter.armor_class,
      senses: frontmatter.senses,
      saving_throws: frontmatter.saving_throws,
      damage_immunities: frontmatter.damage_immunities,
      damage_resistances: frontmatter.damage_resistances,
      condition_immunities: frontmatter.condition_immunities,
      description: body
    };


    return creature;
  } catch (error) {
    console.warn('Failed to parse creature markdown:', error);
    return null;
  }
}

function parseFrontmatter(text) {
  const result = {};
  const lines = text.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex === -1) continue;

    const key = trimmed.slice(0, colonIndex).trim();
    let value = trimmed.slice(colonIndex + 1).trim();

    // Handle arrays (tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        // Remove brackets and split by comma
        const arrayContent = value.slice(1, -1);
        value = arrayContent.split(',').map(item => item.trim().replace(/['"]/g, ''));
      } catch {
        // If parsing fails, keep as string
        value = [];
      }
    } else if (value.startsWith('"') && value.endsWith('"')) {
      // Remove surrounding quotes
      value = value.slice(1, -1);
    }


    result[key] = value;
  }

  return result;
}
