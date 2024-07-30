# Shopify Notifications and Shipping Label Web App

This web application allows users to manage notifications from multiple Shopify stores and generate shipping labels from a centralised location using the pdfme library. The application uses MongoDB for data storage and Firebase for authentication.

[Read the Blog Post - ShipStation](https://www.inv3nt.dev/blog/shipstation)

To view the example application, use the following credentials:
[test@example.com]
[password]

## Features

- **Centralised Notifications**: Subscribe to and manage notifications from multiple Shopify stores.
- **PDF Shipping Labels**: Generate and download shipping labels in PDF format.
- **Secure Authentication**: Firebase authentication for user management.
- **Database Integration**: MongoDB for storing user, client, and order data.

## API Routes

### `/api/clients`
- `GET /api/clients/get`: Retrieves a list of clients associated with a user.
- `POST /api/clients/add`: Adds a new client to the user's account.
- `DELETE /api/clients/delete`: Deletes a specified client based on the provided UID and URL.

### `/api/orders`
- `GET /api/orders`: Fetches all orders associated with a specific user.

### `/api/orderhook`
- `POST /api/orderhook`: Handles incoming webhook data from Shopify, storing order details.

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prxoio/shipstation.git
   cd shipstation
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Configuration**
   Set up your `.env` file with the necessary configurations for Firebase, MongoDB, and other services.

4. **Run the Application**
   ```bash
   pnpm start
   ```

## Technologies Used

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **PDF Generation**: pdfme

## Contributing

Contributions are welcome.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.