# Use a lighter version of Node as a parent image
FROM node:8 as react-build
# Copy the current directory contents into the container at /server
COPY . ./server/
# copy package.json into the container at /server
COPY package*.json /server/
# Set the working directory to /server
WORKDIR /server
# install dependencies
RUN npm install
# Make port 9000 available to the world outside this container
EXPOSE 9000
# Run the app when the container launches
CMD ["node", "app.js"]