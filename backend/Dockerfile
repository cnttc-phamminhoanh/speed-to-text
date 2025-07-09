FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5002
CMD ["sh", "-c", "\
  if [ \"$BUILD_MODE\" = \"production\" ]; then \
    npm start; \
  elif [ \"$BUILD_MODE\" = \"test\" ]; then \
    npm run start:test; \
  else \
    npm run start:dev; \
  fi"]
