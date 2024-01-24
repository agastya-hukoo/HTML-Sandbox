document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'agastyahukoo'; // Replace with your GitHub username
    const repoName = 'HTML-Sandbox'; // Replace with your repository name
    const baseUrl = `https://${repoOwner}.github.io/${repoName}/`; // Base URL for GitHub Pages

    function openPopup(url) {
        document.getElementById('siteFrame').src = url;
        document.getElementById('sitePopup').style.display = 'block';
        document.body.classList.add('blur-background');
    }

    function closePopup() {
        document.getElementById('sitePopup').style.display = 'none';
        document.getElementById('siteFrame').src = '';
        document.body.classList.remove('blur-background');
    }

    window.closePopup = closePopup;

    function showBackButton(show) {
        document.getElementById('backButton').style.display = show ? 'block' : 'none';
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

        document.getElementById('backButton').onclick = () => {
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

    // Scroll behavior for header expansion and content fading
    const header = document.querySelector('.header');
    const mainContent = document.querySelector('.main-content');
    const translucentBox = document.querySelector('.translucent-box');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolling down
            header.style.height = '350px'; // Original header size
            mainContent.classList.add('fade-in');
            mainContent.classList.remove('fade-out');
            translucentBox.style.display = 'none';
        } else {
            // Scrolling up
            header.style.height = '100vh'; // Full viewport height
            mainContent.classList.add('fade-out');
            mainContent.classList.remove('fade-in');
            translucentBox.style.display = 'block';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Edge
    }, false);
});
