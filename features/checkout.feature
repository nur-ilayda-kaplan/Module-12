@ui @regression @critical
Feature: Shopping cart checkout
  Ensure user can add items and complete purchase

  Scenario: Add item to cart and view cart
    Given the user is on the product page for "playwright book"
    When they add the item to the cart
    Then the cart should contain "1" item

  Scenario: Complete checkout
    Given the cart has at least one item
    When the user proceeds to checkout and fills payment details
    Then the order confirmation page should be shown