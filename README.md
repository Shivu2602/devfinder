# DevFinder - Github Repositories listing page

DevFinder is a simple web application that allows users to search for GitHub profiles and view repositories. It provides a clean interface for exploring GitHub user profiles and their repositories.

## Features

- **User Search:** Enter a GitHub username in the search bar and click "Search" to retrieve user details.
- **User Information:** View user details, including avatar, bio, location, and social links.
- **Repositories:** Explore repositories associated with the user, with server-side pagination.
- **Customizable Pagination:** Choose the number of repositories to display per page.
- **Dark Mode:** Toggle between light and dark modes for a comfortable viewing experience.

## Technologies Used

- HTML5: Structuring the web content.
- CSS3: Styling the user interface.
- JavaScript: Implementing dynamic features and API interactions.
- [GitHub REST API](https://docs.github.com/en/rest): Fetching GitHub user and repository data.

1. **Search for a User:**

   - Enter a GitHub username in the search bar.
   - Click the "Search" button.

2. **View User Information:**

   - Explore user details, including avatar, bio, and social links.

3. **Explore Repositories:**

   - View repositories with server-side pagination.
   - Adjust the number of repositories per page using the dropdown.

4. **Toggle Dark Mode:**

   - Switch between light and dark modes based on your preference.

## How to Run

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/shiivam-mishra/devfinder.git

   ```

1. Open the Application:
   Open the `index.html` file in a web browser.

1. Explore GitHub Profiles:
   Start searching for GitHub profiles and exploring repositories.

## ASSUMPTIONS

1. GitHub API Access:
   The code assumes that you have access to the GitHub API and that it allows fetching user information and repositories.

2. API Response Structure:

   The structure of the GitHub API response for user information and repositories is assumed to be consistent with the code's expectations. Any changes in the API response format may require adjustments to the code.

3. Default Repositories per Page:

   The code assumes a default of 10 repositories per page when fetching and displaying repositories. Users have the option to choose a maximum of 100 repositories per page.

4. Profile and Repository Display:

   The code assumes a two-section layout: one for displaying user profile information and another for displaying repositories. The user profile information is shown by default, and repositories are displayed after a search.

5. User Search and Display:

   When a user searches for a GitHub username, the code assumes that it fetches information about the user and displays it. If multiple users have the same username, it displays a list for the user to choose from.

## Contributors

SHIIVAM KUMAR MISHRA
