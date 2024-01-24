document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'agastyahukoo'; // Replace with your GitHub username
    const repoName = 'HTML-Sandbox'; // Replace with your repository name
    const baseUrl = `https://${repoOwner}.github.io/${repoName}/`; // Base URL for GitHub Pages

    function fetchFiles(path = '') {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`)
            .then(response => response.json())
            .then(data => {
                const fileListElement = document.getElementById('file-list');
                fileListElement.innerHTML = ''; // Clear current list

                data.forEach(item => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.textContent = item.name;

                    if (item.type === 'dir') {
                        // If item is a directory, fetch its contents on click
                        link.href = '#';
                        link.onclick = () => { fetchFiles(item.path); return false; };
                    } else if (item.name.endsWith('.html') && item.name !== 'index.html') {
                        // If item is an HTML file, link to it
                        link.href = baseUrl + item.path;
                    } else {
                        // Non-HTML files or index.html can be ignored or handled differently
                        return;
                    }

                    listItem.appendChild(link);
                    fileListElement.appendChild(listItem);
                });
            })
            .catch(error => console.error('Error fetching repository data:', error));
    }

    fetchFiles(); // Fetch root directory files on load
});
