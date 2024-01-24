document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'agastyahukoo';
    const repoName = 'HTML-Sandbox';
    const baseUrl = `https://${repoOwner}.github.io/${repoName}/`;

function openPopup(url) {
    const iframe = document.getElementById('siteFrame');
    const popup = document.getElementById('sitePopup');
    const container = document.getElementById('main-container');

    iframe.src = url;
    popup.style.display = 'block';
    container.classList.add('blur-background');
}

function closePopup() {
    const popup = document.getElementById('sitePopup');
    const container = document.getElementById('main-container');

    popup.style.display = 'none';
    document.getElementById('siteFrame').src = '';
    container.classList.remove('blur-background');
}


    window.closePopup = closePopup;

    function showBackButton(show) {
        const backButton = document.getElementById('backButton');
        backButton.style.display = show ? 'block' : 'none';
    }

    function fetchFiles(path = '') {
        showBackButton(path !== '');

        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${path}`)
            .then(response => response.json())
            .then(data => {
                const fileListElement = document.getElementById('file-list');
                fileListElement.innerHTML = '';

                data.forEach(item => {
                    if (item.type === 'dir' || (item.type === 'file' && item.name.endsWith('.html'))) {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.textContent = item.name;

                        if (item.type === 'dir') {
                            link.href = '#';
                            link.onclick = () => {
                                fetchFiles(item.path); 
                                return false;
                            };
                        } else {
                            link.href = 'javascript:void(0);';
                            link.onclick = () => {
                                openPopup(baseUrl + item.path);
                            };
                        }

                        listItem.appendChild(link);
                        fileListElement.appendChild(listItem);
                    }
                });
            })
            .catch(error => console.error('Error fetching repository data:', error));

        const backButton = document.getElementById('backButton');
        backButton.onclick = () => {
            const lastSlashIndex = path.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                fetchFiles(path.substring(0, lastSlashIndex));
            } else {
                fetchFiles();
            }
            return false;
        };
    }

    fetchFiles(); // Fetch root directory files on load
});
