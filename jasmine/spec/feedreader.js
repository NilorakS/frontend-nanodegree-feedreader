/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test makes sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined', function() {
            for (feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }         
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined', function() {
            for (feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }  
        });
    });


    /* This test suite is all about the visibility status of
     * the menu element. 
     */
    describe('The menu', function() {
        const body = document.querySelector('body');

        /* This test ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. 
          */
        it('toggles visibility on click', function() {    
            const menuIcon = document.querySelector('.menu-icon-link');
            
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    /* This test suite is all about loading the initial entries.
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('are loaded', function() {
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
        });
    });

    /* This test suite is all about the correct loading of new feeds.
     */
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        let firstFeed;
        let secondFeed;
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = feed.firstElementChild.innerText;

                loadFeed(1, function() {
                    secondFeed = feed.firstElementChild.innerText;
                    done();
                });
            });                       
        });

        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes content', function() {
            expect(firstFeed).toBeDefined();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toEqual(secondFeed);  
        });
    });    
}());
