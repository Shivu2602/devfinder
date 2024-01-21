/*Toggle Light Dark Mode */
const btnDark = document.querySelector("#toggleDark");
const btnLight = document.querySelector("#toggleLight");
const lightText = document.querySelector(".light-text");
const darkText = document.querySelector(".dark-text");

const mainPage = document.querySelector("main");
const darkMode = localStorage.getItem("dark-mode");

btnLight.addEventListener("click", enableNightMode);
btnDark.addEventListener("click", enableLightMode);

function enableNightMode() {
  btnLight.classList.add("invisible");
  btnDark.classList.remove("invisible");
  lightText.classList.add("invisible");
  darkText.classList.remove("invisible");
  mainPage.classList.add("dark-mode-active");
  localStorage.setItem("dark-mode", "enable");
  console.log("Dark-mode Enable");
}

function enableLightMode() {
  btnLight.classList.remove("invisible");
  btnDark.classList.add("invisible");
  lightText.classList.remove("invisible");
  darkText.classList.add("invisible");
  mainPage.classList.remove("dark-mode-active");
  localStorage.setItem("dark-mode", "unable");
  console.log("Light-Mode Enable");
}

if (darkMode === "enable") {
  btnDark.classList.contains("dark-mode-active");
  enableNightMode();
}

/*Search Bar */
const searchInput = document.querySelector("input");
const searchBtn = document.querySelector(".searchBtn");
const noResult = document.querySelector("#no-result");
const URL = "https://api.github.com/users/";

// User Info Container
const profileContainer = document.querySelector(".profile-container");

/*User Data */
const username = document.getElementById("username-title");
const userJoined = document.getElementById("join");
const userAvatar = document.getElementById("avatar");
const userLink = document.getElementById("urlUser");
const userBio = document.getElementById("bio");
const userRepos = document.getElementById("repos");
const userFollowers = document.getElementById("followers");
const userFollowing = document.getElementById("following");
const userLocation = document.getElementById("location");
const userWebsiteBlog = document.getElementById("website");
const userTwitter = document.getElementById("media");
const userCompany = document.getElementById("company");

// User List Container
const userListContainer = document.querySelector(".user-Container");
const characterList = document.getElementById("characterList");

let searchUser = ""; // Define searchUser variable

searchBtn.addEventListener("click", async () => {
  searchUser = searchInput.value; // Update searchUser based on user input
  const userUrl = URL + searchUser;

  try {
    const response = await fetch(userUrl);
    const dataAPI = await response.json();

    if (dataAPI.message === "Not Found") {
      noResult.classList.remove("invisible");
      userListContainer.classList.add("invisible");
      profileContainer.classList.remove("invisible");
    } else {
      noResult.classList.add("invisible");
      userListContainer.classList.remove("invisible");

      characterList.innerHTML = "";

      const userWithSameName = await fetchUserWithSameName(dataAPI.login);
      userWithSameName.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = user.login;
        listItem.classList.add("user-card");
        listItem.addEventListener("click", () => displayUserinfo(user.login));
        characterList.append(listItem);
      });
    }

    // Update the initial load for repositories
    currentPage = 1;
    fetchUserRepositories(searchUser, currentPage);
  } catch (error) {
    console.log(error);
  }
});

// Searched User with the same username
async function fetchUserWithSameName(username) {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${username}`
    );
    const data = await response.json();

    profileContainer.classList.add("invisible");

    return data.items;
  } catch (error) {
    console.log(error);
  }
}

// Container with the displayed username you clicked

async function displayUserinfo(selectedUserName) {
  const userUrl = URL + selectedUserName;
  try {
    const response = await fetch(userUrl);
    const dataAPI = await response.json();

    profileContainer.classList.remove("invisible");
    userListContainer.classList.add("invisible");

    username.innerText = capitalLetter(dataAPI.login);
    userJoined.innerText = formatDate(dataAPI.created_at);
    userAvatar.src = dataAPI.avatar_url;
    userLink.innerText = dataAPI.html_url;
    userRepos.innerText = dataAPI.public_repos;
    userFollowers.innerText = dataAPI.followers;
    userFollowing.innerText = dataAPI.following;

    if (dataAPI.location === null) {
      userLocation.innerText = "Not Available";
    } else {
      userLocation.innerText = dataAPI.location;
    }

    if (dataAPI.blog === " ") {
      userWebsiteBlog.innerText = "Not Available";
    } else {
      userWebsiteBlog.innerText = dataAPI.blog;
    }

    if (dataAPI.twitter_username === null) {
      userTwitter.innerHTML = "Not Available";
    } else {
      userTwitter.innerText = dataAPI.twitter_username;
    }

    if (dataAPI.company === null) {
      userCompany.innerHTML = "Not Available";
    } else {
      userCompany.innerText = dataAPI.company;
    }

    if (dataAPI.bio === null) {
      userBio.innerText = "This profile has no bio";
    } else {
      userBio.innerText = dataAPI.bio;
    }
  } catch (error) {
    console.log(error);
  }
}

// Format Date

function formatDate(inputDate) {
  const date = new Date(inputDate).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return date;
}

// case sensitive

function capitalLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Server-side pagination
const reposContainer = document.getElementById("repos-container");
const paginationContainer = document.getElementById("pagination");
let reposPerPage = 10;
let currentPage = 1;

// show max. repo
function updateReposPerPage() {
  const reposPerPageSelect = document.getElementById("reposPerPage");
  reposPerPage = parseInt(reposPerPageSelect.value, 10);
  currentPage = 1;
  fetchUserRepositories(searchUser, currentPage, reposPerPage);
}

async function fetchUserRepositories(username, page = 1, perPage = 10) {
  showLoader();

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`
    );
    const repositories = await response.json();

    hideLoader();
    renderRepositories(repositories);

    // Assuming 'total_count' is available in the API response
    const totalCount = parseInt(
      response.headers.get("Link").match(/&page=(\d+)&/)[1],
      10
    );
    renderPagination(totalCount, perPage);

    // Show the repos per page dropdown after the search
    document.getElementById("repos-per-page-container").style.display = "block";
  } catch (error) {
    hideLoader();
    console.error("Error fetching repositories:", error);
  }
}

fetchUserRepositories("your_github_username", 1, reposPerPage);

// loader

function renderRepositories(repositories) {
  reposContainer.innerHTML = "";
  repositories.forEach((repo) => {
    const repoCard = document.createElement("div");
    repoCard.className = "repo-card";
    repoCard.innerHTML = `
    <h3>${repo.name}</h3>
    <p>Topics: ${repo.topics ? repo.topics.join(", ") : "N/A"}</p>
  `;
    reposContainer.appendChild(repoCard);
  });
}

function renderPagination(totalCount, perPage) {
  const totalPages = Math.ceil(totalCount / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  paginationContainer.innerHTML = "";
  pages.forEach((page) => {
    const pageLink = document.createElement("span");
    pageLink.className = `pagination-link ${
      page === currentPage ? "active" : ""
    }`;
    pageLink.textContent = page;
    pageLink.addEventListener("click", () => {
      currentPage = page;
      fetchUserRepositories("your_github_username", currentPage);
    });
    paginationContainer.appendChild(pageLink);
  });
}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}
