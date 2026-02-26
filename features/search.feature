@ui @regression
Feature: Product search
  Users should be able to find items using the search box

  Scenario: User can access search input on home page
    Given the user is on the home page
    When they search for "playwright book"
    Then the search input should be available

  Scenario: Home page loads without errors
    Given the user is on the home page
    Then the page should load successfully