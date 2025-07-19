export function getOrCreateAnonymousId() {
  const key = "anonymous_data";
  const data = JSON.parse(localStorage.getItem(key));

  const now = new Date().getTime(); // current time in ms
  const thirtyDays = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

  if (data && data.id && now - data.timestamp < thirtyDays) {
    return { id: data.id, username: data.username };
  }

  // If no data or expired, generate a new ID
  const newId = crypto.randomUUID();

  const randomUsername = generateRandomUsername();
  localStorage.setItem(
    key,
    JSON.stringify({
      id: newId,
      username: randomUsername,
      timestamp: now,
    })
  );

  return { newId, username: randomUsername };
}

// Helper function for generating a placeholder name
function generateRandomUsername() {
  const adjectives = ["Swift", "Quiet", "Clever", "Bold", "Witty"];
  const animals = ["Fox", "Lion", "Owl", "Tiger", "Panther"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 1000);
  return `${randomAdjective}${randomAnimal}${number}`;
}
