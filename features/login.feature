@ui @smoke @login
Feature: User authentication
  In order to access protected areas
  As a registered user
  I want to be able to log in and log out

  @critical
  Scenario: Login page loads successfully
    Given the user is on the login page
    Then the username input field should be visible

  Scenario: Failed login shows error state
    Given the user is on the login page
    When they enter an invalid password
    Then the error message element should exist