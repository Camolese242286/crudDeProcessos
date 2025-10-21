# lgpd-java

# Confg Docker

O docker compose esta na nossa pasta como o yml,
podemos configurar lá, por enquanto ele esta no meu localhost,
mas pode alterar e configurar

Implementação docker em andamento....
------------------------------------
# Tabelas alimentas
Temos 4 tabelas alimentas, irei mandar o backup no nosso grupo
irei colocar as 4 em um backup só.
Elas são :
- areas
- processos
- pessoas
- responsaveis

# Como usar ?
Apague as tabelas geradas pelo JPA no pgAdmin, as tabelas citadas
acima, e com o backup em mãos, va em cima do database e aperte
restoure, na pasta para escolher o arquivo coloque All Files,
pos arquivos .sql nao mostra no padrao e escolha o backup.
Feito isso já vai ter as tabelas alimentas e tratadas pronta
pra uso.
# Banco de Dados LGPD - PostgreSQL (via Docker)

Este projeto contém a imagem Docker de um banco de dados PostgreSQL já populado com as tabelas e dados do sistema LGPD.

A imagem foi salva no Docker Hub com os dados carregados corretamente.

---

## 📦 Imagem Docker

**Imagem disponível em:**
 

- eriklisboa1/postgres-lgpd-populado:2.0
- Essa versão 2.0 está confirmada e validada, com todas as tabelas e dados prontos.

---

## 🚀 Como rodar o banco de dados

### 1. Pré-requisitos

- Ter o Docker e o Docker Compose instalados na máquina.



### 2. Passos para rodar

- navegue ate a pasta database
- cd database e de docker compose up -d

### Ou entao sem Compose 
docker pull eriklisboa1/postgres-lgpd-populado:2.0

docker run -d --name banco-lgpd -p 5432:5432 eriklisboa1/postgres-lgpd-populado:2.0


### testar conexao 

- docker exec -it banco-lgpd psql -U postgres -d lgpd
- \dt
-  SELECT * FROM processos; ou outra tabela alimentada


