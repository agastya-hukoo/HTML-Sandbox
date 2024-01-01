document.addEventListener('DOMContentLoaded', function() {
    const repoOwner = 'agastya-hukoo'; // Replace with your GitHub username
    const repoName = 'HTML-Sandbox'; // Replace with your repository name
    const baseUrl = `https://${repoOwner}.github.io/${repoName}/`; // Base URL for GitHub Pages

    fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/`)
        .then(response => response.json())
        .then(data => {
            const fileListElement = document.getElementById('file-list');
            data.forEach(file => {
                if (file.name.endsWith('.html') && file.name !== 'index.html') {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = baseUrl + file.name;
                    const displayName = localStorage.getItem(file.name) || file.name;
                    link.textContent = displayName; // Use the stored name if available
                    listItem.appendChild(link);

                    // Button to open naming modal
                    const nameButton = document.createElement('button');
                    nameButton.textContent = 'Name File';
                    nameButton.onclick = () => openModal(file.name);
                    listItem.appendChild(nameButton);

                    fileListElement.appendChild(listItem);
                }
            });
        })
        .catch(error => console.error('Error fetching repository data:', error));

    // Function to open naming modal
    function openModal(fileName) {
        document.getElementById('nameModal').style.display = 'block';
        document.getElementById('fileName').value = localStorage.getItem(fileName) || '';
        document.getElementById('fileName').setAttribute('data-filename', fileName);
    }

    // Function to save name
    window.saveName = function() {
        const input = document.getElementById('fileName');
        localStorage.setItem(input.getAttribute('data-filename'), input.value);
        closeModal();
        location.reload(); // Reload to update the display
    }

    // Function to close modal
    window.closeModal = function() {
        document.getElementById('nameModal').style.display = 'none';
    }
});
