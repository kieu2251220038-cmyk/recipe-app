/**
 * Semantic Search Service
 * Finds recipes based on meaning, not just keyword matching
 * Supports natural language queries like "something quick and healthy"
 */

export interface RecipeEmbedding {
  id: string;
  title: string;
  embedding: number[];
  keywords: string[];
  category: string;
}

export interface SearchResult {
  id: string;
  score: number;
  relevance: 'high' | 'medium' | 'low';
}

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Simple embedding generator for Vietnamese text
 * In production, use OpenAI API or Hugging Face models
 */
function generateEmbedding(text: string): number[] {
  const words = text.toLowerCase().split(/\s+/);
  const embedding = new Array(50).fill(0);

  // Create a hash-based embedding
  for (const word of words) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      const char = word.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    // Distribute hash across embedding dimensions
    const index = Math.abs(hash) % embedding.length;
    embedding[index] += 1;
  }

  // Normalize
  const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return norm > 0 ? embedding.map(val => val / norm) : embedding;
}

/**
 * Keywords that help identify recipe characteristics
 */
const characteristicKeywords: Record<string, string[]> = {
  quick: ['nhanh', 'dễ', 'đơn giản', 'phút', 'minute', 'quick', 'fast', 'chóng'],
  healthy: ['lành mạnh', 'khỏe', 'healthy', 'diets', 'nguyên chất', 'tự nhiên'],
  spicy: ['cay', 'spicy', 'nồn', 'very', 'hot', 'chilli'],
  vegetarian: ['chay', 'vegetarian', 'vegan', 'không thịt', 'tofu'],
  seafood: ['hải sản', 'seafood', 'cá', 'tôm', 'mực', 'fish'],
  sweet: ['ngọt', 'sweet', 'dessert', 'bánh', 'candy'],
  savory: ['mặn', 'savory', 'cơm', 'com', 'rice'],
};

/**
 * Main semantic search function
 */
export function semanticSearch(
  query: string,
  recipes: Array<{
    id: string;
    title: string;
    details: string;
    ingredients: string[];
    categoryId: string;
  }>,
  limit: number = 10
): SearchResult[] {
  if (!query.trim()) return [];

  const queryEmbedding = generateEmbedding(query);
  const results: SearchResult[] = [];

  for (const recipe of recipes) {
    // Combine all text content
    const fullText = `${recipe.title} ${recipe.details} ${recipe.ingredients.join(' ')}`;
    const recipeEmbedding = generateEmbedding(fullText);

    // Calculate semantic similarity
    const semanticScore = cosineSimilarity(queryEmbedding, recipeEmbedding);

    // Boost score based on keyword matches
    let keywordBoost = 0;
    const lowerQuery = query.toLowerCase();
    
    for (const [characteristic, keywords] of Object.entries(characteristicKeywords)) {
      if (keywords.some(kw => lowerQuery.includes(kw))) {
        // Check if recipe matches this characteristic
        const recipeText = fullText.toLowerCase();
        if (keywords.some(kw => recipeText.includes(kw))) {
          keywordBoost += 0.15;
        }
      }
    }

    const finalScore = Math.min(1, semanticScore + keywordBoost);

    if (finalScore > 0.2) {
      results.push({
        id: recipe.id,
        score: finalScore,
        relevance: finalScore > 0.7 ? 'high' : finalScore > 0.4 ? 'medium' : 'low',
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

/**
 * Hybrid search combining semantic and traditional keyword matching
 */
export function hybridSearch(
  query: string,
  recipes: Array<{
    id: string;
    title: string;
    details: string;
    ingredients: string[];
    categoryId: string;
  }>,
  selectedCategories: string[] = [],
  limit: number = 10
): SearchResult[] {
  // Get semantic results
  const semanticResults = semanticSearch(query, recipes, limit * 2);

  // Filter by category if specified
  if (selectedCategories.length > 0) {
    return semanticResults.filter(result => {
      const recipe = recipes.find(r => r.id === result.id);
      return recipe && selectedCategories.includes(recipe.categoryId);
    }).slice(0, limit);
  }

  return semanticResults.slice(0, limit);
}

/**
 * Get suggestions based on user input
 */
export function getSearchSuggestions(
  query: string,
  recipes: Array<{
    id: string;
    title: string;
    details: string;
    ingredients: string[];
    categoryId: string;
  }>
): string[] {
  if (!query.trim()) return [];

  const suggestions: Set<string> = new Set();
  const lowerQuery = query.toLowerCase();

  // Suggest recipe titles that match
  recipes.forEach(recipe => {
    if (recipe.title.toLowerCase().includes(lowerQuery)) {
      suggestions.add(recipe.title);
    }
  });

  // Suggest characteristics
  const characteristics = [
    'nhanh chóng',
    'lành mạnh',
    'cay',
    'chay',
    'hải sản',
    'ngọt',
    'dễ làm',
    'bình dân',
    'sang trọng',
  ];

  characteristics.forEach(char => {
    if (char.includes(lowerQuery)) {
      suggestions.add(char);
    }
  });

  return Array.from(suggestions).slice(0, 5);
}
