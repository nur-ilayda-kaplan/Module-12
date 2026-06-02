import express, { Express } from 'express';

let server: any = null;
let cartCount = 0;
let isLoggedIn = false;

/**
 * Start a simple mock test server
 * Serves mock pages with expected test elements
 */
export function startMockServer(port: number = 3000) {
  const app: Express = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Mock Login Page
  app.get('/login', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Login</title></head>
      <body>
        <form id="loginForm" action="/login" method="POST">
          <input data-testid="username" name="username" placeholder="Username" />
          <input data-testid="password" name="password" type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <div data-testid="error-message" style="color:red; display:none;">Invalid credentials</div>
        <script>
          document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const res = await fetch('/login', { method: 'POST', body: formData });
            const text = await res.text();
            if (res.redirected) {
              window.location = res.url;
            } else {
              document.documentElement.innerHTML = text;
            }
          });
        </script>
      </body>
      </html>
    `);
  });

  // Handle login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'standard_user' && password === 'secret') {
      isLoggedIn = true;
      res.redirect(302, '/dashboard');
    } else {
      res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Login</title></head>
        <body>
          <form action="/login" method="POST">
            <input data-testid="username" name="username" placeholder="Username" />
            <input data-testid="password" name="password" type="password" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
          <div data-testid="error-message" style="color:red;">Invalid credentials</div>
        </body>
        </html>
      `);
    }
  });

  // Mock Dashboard
  app.get('/dashboard', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Dashboard</title></head>
      <body>
        <h1>Welcome to Dashboard</h1>
      </body>
      </html>
    `);
  });

  // Mock Home Page
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Home</title></head>
      <body>
        <input data-testid="search" placeholder="Search..." />
      </body>
      </html>
    `);
  });

  // Mock Product Page
  app.get('/products/:name', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Product</title></head>
      <body>
        <h1>${req.params.name}</h1>
        <button data-testid="add-to-cart" onclick="fetch('/api/cart', {method:'POST'}).then(()=>window.location='/cart')">Add to Cart</button>
      </body>
      </html>
    `);
  });

  // API endpoint to add to cart
  app.post('/api/cart', (req, res) => {
    cartCount++;
    res.json({ cartCount });
  });

  // Mock Cart Page
  app.get('/cart', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Cart</title></head>
      <body>
        <div data-testid="cart-count">${cartCount}</div>
        <button data-testid="checkout" onclick="window.location='/checkout'">Proceed to Checkout</button>
      </body>
      </html>
    `);
  });

  // Mock Checkout Page
  app.get('/checkout', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Checkout</title></head>
      <body>
        <form action="/checkout" method="POST">
          <input data-testid="card-number" name="card" placeholder="Card Number" />
          <input data-testid="expiry" name="expiry" placeholder="MM/YY" />
          <input data-testid="cvv" name="cvv" placeholder="CVV" />
          <button data-testid="submit-order" type="submit">Submit Order</button>
        </form>
      </body>
      </html>
    `);
  });

  // Handle checkout
  app.post('/checkout', (req, res) => {
    res.redirect(302, '/confirmation');
  });

  // Mock Confirmation Page
  app.get('/confirmation', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Order Confirmed</title></head>
      <body>
        <h1>Order Confirmed!</h1>
        <p>Your order has been placed successfully.</p>
      </body>
      </html>
    `);
  });

  return new Promise((resolve) => {
    server = app.listen(port, () => {
      console.log(`✅ Mock test server running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

export function stopMockServer() {
  cartCount = 0;
  isLoggedIn = false;
  return new Promise((resolve) => {
    if (server) {
      server.close(() => {
        console.log('✅ Mock test server stopped');
        resolve(null);
      });
    } else {
      resolve(null);
    }
  });
}
