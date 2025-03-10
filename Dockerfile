# Node.js-in son LTS versiyasını istifadə edirik
FROM node:18

# İşçi qovluğu yaradıb ora keçirik
WORKDIR /app

# Layihə fayllarını konteynerə köçürürük
COPY package.json package-lock.json ./

# Lazımi paketləri yükləyirik
RUN npm install

# Qalan kodları konteynerə köçürürük
COPY . .

# Serverin hansı portu dinləyəcəyini təyin edirik
EXPOSE 3000

# Serveri başladırıq
CMD ["npm", "start"]
