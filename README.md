# nytreact
Demo app at https://whispering-oasis-74236.herokuapp.com/

Create a new React-based redition of the New York Times Article Search application. This assignment requires you to create 
React components, work with helper functions, and utilize the React mounting lifecycle to query and display articles based 
on user searches. Also use Node, Express and MongoDB so that users can save articles to read later.

* Also use several Express routes for your app:

     ```
     * `/api/saved` (get) - your components will use this to query MongoDB for all saved articles

     * `/api/saved` (post) - your components will use this to save an article to the database

     * `/api/saved` (delete) - your components will use this to delete a saved article in the database

     * `*` (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes
     ```

   * The layout should include three React Components named `Main`, `Search` and `Saved`.

     ```
     * **Main** - contains the main-container div that holds the main layout and navigation. This component should also be able to hold sub-components Search and Saved

     * **Search** - queries the NYT API for articles. Displays API search results from another possible **Query** component and **Results** component. Gives the user the ability to save an article to their Saved Articles.

     * **Saved** - displays the Saved Articles that were searched and stored in the database
