# Use an official Node.js runtime as the base image
FROM node:lts-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat && apk add git

# Set the working directory in the Docker container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files into the Docker container
COPY package*.json ./

# Install the application dependencies inside the Docker container
RUN npm install --legacy-peer-deps

# Copy the application files into the Docker container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3002 for the application
EXPOSE 3000 465

# Start the application
CMD ["npm", "start"]
