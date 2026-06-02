export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  selectors: {
    // Login Page
    usernameInput: process.env.LOGIN_USERNAME_SELECTOR || '[data-testid="username"]',
    passwordInput: process.env.LOGIN_PASSWORD_SELECTOR || '[data-testid="password"]',
    submitButton: process.env.LOGIN_SUBMIT_SELECTOR || 'button[type="submit"]',
    errorMessage: process.env.LOGIN_ERROR_SELECTOR || '[data-testid="error-message"]',

    // Home Page
    searchInput: process.env.SEARCH_INPUT_SELECTOR || '[data-testid="search"]',

    // Product Page
    addToCartButton: process.env.ADD_TO_CART_SELECTOR || '[data-testid="add-to-cart"]',

    // Cart Page
    cartCount: process.env.CART_COUNT_SELECTOR || '[data-testid="cart-count"]',
    checkoutButton: process.env.CHECKOUT_BUTTON_SELECTOR || 'button[data-testid="checkout"]',

    // Checkout Page
    cardNumber: process.env.CARD_NUMBER_SELECTOR || '[data-testid="card-number"]',
    expiry: process.env.EXPIRY_SELECTOR || '[data-testid="expiry"]',
    cvv: process.env.CVV_SELECTOR || '[data-testid="cvv"]',
    submitOrder: process.env.SUBMIT_ORDER_SELECTOR || 'button[data-testid="submit-order"]',
  },
  waitTimeout: parseInt(process.env.WAIT_TIMEOUT || '5000'),
};
