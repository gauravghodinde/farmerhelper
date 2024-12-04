# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application files
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Set the environment variable to production
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# Start the application
CMD ["npm", "run", "start"]
