export async function getPaginas(): Promise<object[]> {
	// Llamada a Api
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					"id": 1,
					"pagina": "home"
				},
				{
					"id": 2,
					"pagina": "about"
				},
				{
					"id": 3,
					"pagina": "nueva"
				},
				{
					"id": 4,
					"pagina": "nav"
				}
			]);
		}, 1000);
	});
}