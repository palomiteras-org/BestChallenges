FROM mcr.microsoft.com/playwright:v1.33.0-focal

WORKDIR /app

# Install netcat for the wait-for-it script
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the e2e test files
COPY . .

# Make the wait-for-it script executable
RUN chmod +x wait-for-it.sh

# Install Playwright browsers
RUN npx playwright install --with-deps chromium

# Set the entry point to wait for services and then run the tests
CMD ["./wait-for-it.sh", "frontend", "3000", "backend", "8000", "npm", "test"]
