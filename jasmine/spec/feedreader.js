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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have each URL defined', function() {
            allFeeds.forEach(function(feed) {
                // Expect url to be defined
                expect(feed.url).toBeDefined();

                // Expect url not null
                expect(feed.url).not.toBe(null);

                // Expect url not empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have each name defined', function() {
            allFeeds.forEach(function(feed) {
                // Expect name to be defined
                expect(feed.name).toBeDefined();

                // Expect name not null
                expect(feed.name).not.toBe(null);

                // Expect name not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The menu', function() {

        var body = $('body');
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('is toggled when icon is clicked', function() {
            var menuIcon = $('.menu-icon-link');

            // Fire off click event using jQuery trigger() method on icon
            menuIcon.trigger('click');
            // Now the menu should be visible
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Fire off click event again on icon
            menuIcon.trigger('click');
            // Now the menu should be hidden again
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // Load initial feed within beforeEach, since it is asynchronous
        beforeEach(function(done) {
            // First clear the feeds
            $('.feed').empty();

            // Then loadFeed(0)
            loadFeed(0, function() {
                done();
            });
        });

        // This expectation will only run after loadFeed(0) has finished
        it('should conatain at least one entry in the feed container', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var oldFeeds,
            newFeeds;

        beforeEach(function(done) {
            // First clear the feeds
            $('.feed').empty();

            // Then fire off loadFeed(0)
            loadFeed(0, function() {

                // In the callback of loadFeed(0), save feed content to oldFeeds
                oldFeeds = $('.feed').html();

                // Then clear the feeds again
                $('.feed').empty();

                // Then fire off loadFeed(1)
                loadFeed(1, function(){

                    // In the callback of loadFeed(1), save feed content to newFeeds
                    newFeeds = $('.feed').html();

                    // Finally we have read both old and new feeds
                    // Now it is time to call done()
                    done();
                });
            });
        });

        // We expect the oldFeeds and newFeeds should be different
        it('should allow content change when a new feed is loaded', function(done) {
            expect(oldFeeds).not.toEqual(newFeeds);
            done();
        });
    });

}());