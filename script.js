var prevScrollpos = window.pageYOffset;
var isTransparent = false;

window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  var navbar = document.getElementById("myNavbar");

  if (prevScrollpos > currentScrollPos) {
    // Munculkan navbar saat scroll ke atas
    navbar.style.top = "0";
    isTransparent = false;
  } else {
    // Sembunyikan navbar saat scroll ke bawah
    navbar.style.top = "-80px";

    // Tambahkan kelas transparent saat scroll ke atas dan belum pernah ada
    if (!isTransparent) {
      navbar.classList.add("transparent");
      isTransparent = true;
    }
  }

  // Jika scroll mencapai bagian atas halaman
  if (currentScrollPos === 0) {
    navbar.classList.remove("transparent");
    isTransparent = false;
  }

  prevScrollpos = currentScrollPos;
};

function myFunction() {
  var x = document.getElementById("myNavbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

const apiURL = 'https://suitmedia-backend.suitdev.com/api/ideas';
let currentPage = 1;
let itemsPerPage = 10;
let sortBy = 'published_at';

function fetchData() {
  const url = new URL(apiURL);
  url.searchParams.append('page[number]', currentPage);
  url.searchParams.append('page[size]', itemsPerPage);
  url.searchParams.append('append', ['small_image', 'medium_image']);
  url.searchParams.append('sort', sortBy);

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPosts(data.data));
}

function displayPosts(posts) {
  const postCardsContainer = document.getElementById('postCards');
  postCardsContainer.innerHTML = '';

  posts.forEach((post) => {
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');

    const thumbnailURL = post.small_image ? post.small_image.url : 'placeholder.jpg'; // Ganti placeholder.jpg dengan path placeholder gambar Anda
    const postTitle = post.attributes.title;

    postCard.innerHTML = `
      <img src="${thumbnailURL}" alt="${postTitle}">
      <h3>${postTitle}</h3>
    `;

    postCardsContainer.appendChild(postCard);
  });
}

function handleSortChange() {
  sortBy = document.getElementById('sort').value;
  currentPage = 1;
  fetchData();
}

function handleShowPerPageChange() {
  itemsPerPage = document.getElementById('showPerPage').value;
  currentPage = 1;
  fetchData();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchData();
    updatePageNumber();
  }
}

function nextPage() {
  currentPage++;
  fetchData();
  updatePageNumber();
}

function updatePageNumber() {
  document.getElementById('currentPage').innerText = currentPage;
}

// Fetch data saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  fetchData();
});
