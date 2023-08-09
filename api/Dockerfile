# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN yarn install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta em que a aplicação está rodando (garanta que seja a mesma porta que a aplicação usa localmente)
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
