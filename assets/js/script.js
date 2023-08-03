async function getPokemon() {
  const pokemonNameOrId = document.getElementById('pokemonInput').value.toLowerCase();

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
    const data = await response.json();

    // Extract the necessary data from the response
    const name = data.name;
    const image = data.sprites.front_default;
    const stats = data.stats;

    // Build the stats table
    let statsTable = '<table>';
    stats.forEach(stat => {
      statsTable += `
        <tr>
          <td>${stat.stat.name}</td>
          <td>${stat.base_stat}</td>
        </tr>
      `;
    });
    statsTable += '</table>';

    // Display the information
    const pokemonInfoElement = document.getElementById('pokemonInfo');
    pokemonInfoElement.innerHTML = `
      <h2>${name}</h2>
      <img src="${image}" alt="${name}">
      <h3>Basic Stats</h3>
      ${statsTable}
    `;
  } catch (error) {
    // Handle errors, e.g., if the Pokemon is not found
    const pokemonInfoElement = document.getElementById('pokemonInfo');
    pokemonInfoElement.innerHTML = '<p>Pokemon not found.</p>';
  }
}
