// Converts a .json file into a vertical timeline using Bootstrap 5


function fetchResume(path) {
	return fetch(path)
		.then(response => {
			if (response.ok) return response.json();
			else {
				throw new Error('Failed to load JSON: ${response.status} ${response.statusText}');
			}
		}).then(data => data.resume || data)
		.catch(error => {
			console.error(error); 
			return[];
		});
}

fetchResume('./assets/resume.json');