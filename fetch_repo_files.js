document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'agastyahukoo'; // Replace with your GitHub username
    const repoName = 'HTML-Sandbox'; // Replace with your repository name
    const baseUrl = `https://${repoOwner}.github.io/${repoName}/`; // Base URL for GitHub Pages

    function openPopup(url) {
        document.getElementById('siteFrame').src = url;
        document.getElementById('sitePopup').style.display = 'block';
    }

    function closePopup() {
        document.getElementById('sitePopup').style.display = 'none';
        document.getElementById('siteFrame').src = '';
    }

    window.closePopup = closePopup; // Expose closePopup function globally

    function fetchFiles(path = '') {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`)
            .then(response => response.json())
            .then(data => {
                const fileListElement = document.getElementById('file-list');
                fileListElement.innerHTML = ''; // Clear current list

                data.forEach(item => {
                    // Only display if item is a directory or an HTML file
                    if (item.type === 'dir' || (item.type === 'file' && item.name.endsWith('.html'))) {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = item.name;

                        if (item.type === 'dir') {
                            // If item is a directory, fetch its contents on click
                            link.href = '#';
                            link.onclick = () => { fetchFiles(item.path); return false; };
                        } else {
                            // Open HTML files in the popup iframe instead of navigating away
                            link.href = 'javascript:void(0);';
                            link.onclick = () => { openPopup(baseUrl + item.path); };
                        }

                        listItem.appendChild(link);
                        fileListElement.appendChild(listItem);
                    }
                });
            })
            .catch(error => console.error('Error fetching repository data:', error));
    }

    fetchFiles(); // Fetch root directory files on load
});
