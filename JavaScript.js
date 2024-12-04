document.getElementById('search-btn').addEventListener('click', function() {
    const searchQuery = document.getElementById('search').value;
    if (searchQuery) {
      window.location.href = `/search?q=${searchQuery}`;
    }
  });
  