FROM node:lts-alpine3.18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable
ENV Service1_URL=http://carservice:8080

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "server.js"]
