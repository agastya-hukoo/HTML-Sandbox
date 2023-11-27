document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'agastya-hukoo'; // Replace with your GitHub username
    const repoName = 'HTML-Sandbox'; // Replace with your repository name

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/`)
        .then(response => response.json())
        .then(data => {
            const fileListElement = document.getElementById('file-list');
            data.forEach(file => {
                if (file.name.endsWith('.html') && file.name !== 'file_list.html') {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = file.html_url;
                    link.textContent = file.name;
                    listItem.appendChild(link);
                    fileListElement.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching repository data:', error));
});
