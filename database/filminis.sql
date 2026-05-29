CREATE DATABASE filminis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
use filminis;

INSERT INTO api_genero (nome) VALUES
('Ação'),
('Drama'),
('Ficção Científica'),
('Comédia'),
('Terror'),
('Animação');

INSERT INTO api_diretor (nome) VALUES
('Christopher Nolan'),
('Steven Spielberg'),
('Quentin Tarantino'),
('Greta Gerwig'),
('James Cameron');

INSERT INTO api_ator (nome) VALUES
('Leonardo DiCaprio'),
('Matthew McConaughey'),
('Anne Hathaway'),
('Margot Robbie'),
('Ryan Gosling'),
('Tom Hanks'),
('Samuel L. Jackson');

INSERT INTO api_produtora (nome) VALUES
('Warner Bros'),
('Universal Pictures'),
('Paramount Pictures'),
('20th Century Studios'),
('Columbia Pictures');

INSERT INTO api_pais (nome) VALUES
('Estados Unidos'),
('Brasil'),
('Reino Unido'),
('Canadá'),
('Japão');

INSERT INTO api_linguagem (nome) VALUES
('Inglês'),
('Português'),
('Espanhol'),
('Francês'),
('Japonês');

INSERT INTO api_filme 
(titulo, ano, sinopse, poster, orcamento, genero_id, diretor_id, produtora_id, pais_id, linguagem_id, aprovado, criado_por_id, criado_em)
VALUES
('Interestelar', 2014, 'Um grupo de exploradores viaja pelo espaço em busca de um novo lar para a humanidade.', '', 165000000.00, 3, 1, 1, 1, 1, 1, NULL, NOW()),

('Titanic', 1997, 'Um romance nasce durante a viagem do famoso navio Titanic.', '', 200000000.00, 2, 5, 4, 1, 1, 1, NULL, NOW()),

('Barbie', 2023, 'Barbie parte em uma jornada pelo mundo real e descobre novas perspectivas sobre si mesma.', '', 145000000.00, 4, 4, 1, 1, 1, 1, NULL, NOW());

INSERT INTO api_filme_atores (filme_id, ator_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 4),
(3, 5);

USE filminis;

INSERT INTO api_filme 
(titulo, ano, duracao, sinopse, poster, orcamento, genero_id, diretor_id, produtora_id, pais_id, linguagem_id, aprovado, criado_por_id, criado_em)
VALUES
('Crepúsculo', 2008, '2h 02min', 'Bella Swan conhece Edward Cullen, um vampiro, e se envolve em um romance perigoso.', 'https://image.tmdb.org/t/p/w500/3Gkb6jm6962ADUPaCBqzz9CTbn9.jpg', 37000000.00,
(SELECT id FROM api_genero WHERE nome='Romance'), (SELECT id FROM api_diretor WHERE nome='Catherine Hardwicke'), (SELECT id FROM api_produtora WHERE nome='Temple Hill'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Interestelar', 2014, '2h 49min', 'Exploradores viajam pelo espaço em busca de um novo lar para a humanidade.', 'https://image.tmdb.org/t/p/w500/nrSaXF39nDfAAeLKksRCyvSzI2a.jpg', 165000000.00,
(SELECT id FROM api_genero WHERE nome='Ficção Científica'), (SELECT id FROM api_diretor WHERE nome='Christopher Nolan'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Titanic', 1997, '3h 14min', 'Um romance nasce durante a viagem do famoso navio Titanic.', 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', 200000000.00,
(SELECT id FROM api_genero WHERE nome='Drama'), (SELECT id FROM api_diretor WHERE nome='James Cameron'), (SELECT id FROM api_produtora WHERE nome='Paramount Pictures'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Barbie', 2023, '1h 54min', 'Barbie sai de seu mundo perfeito e parte para uma jornada no mundo real.', 'https://image.tmdb.org/t/p/w500/yRRuLt7sMBEQkHsd1S3KaaofZn7.jpg', 145000000.00,
(SELECT id FROM api_genero WHERE nome='Comédia'), (SELECT id FROM api_diretor WHERE nome='Greta Gerwig'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Avatar', 2009, '2h 42min', 'Um ex-fuzileiro participa de uma missão no planeta Pandora.', 'https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg', 237000000.00,
(SELECT id FROM api_genero WHERE nome='Ficção Científica'), (SELECT id FROM api_diretor WHERE nome='James Cameron'), (SELECT id FROM api_produtora WHERE nome='20th Century Studios'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Homem-Aranha', 2002, '2h 01min', 'Peter Parker ganha poderes após ser picado por uma aranha geneticamente modificada.', 'https://image.tmdb.org/t/p/w500/gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 139000000.00,
(SELECT id FROM api_genero WHERE nome='Ação'), (SELECT id FROM api_diretor WHERE nome='Sam Raimi'), (SELECT id FROM api_produtora WHERE nome='Columbia Pictures'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Duna', 2021, '2h 35min', 'Paul Atreides precisa proteger o futuro de sua família e de seu povo.', 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg', 165000000.00,
(SELECT id FROM api_genero WHERE nome='Ficção Científica'), (SELECT id FROM api_diretor WHERE nome='Denis Villeneuve'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('O Senhor dos Anéis: A Sociedade do Anel', 2001, '2h 58min', 'Frodo recebe a missão de destruir o Um Anel.', 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', 93000000.00,
(SELECT id FROM api_genero WHERE nome='Fantasia'), (SELECT id FROM api_diretor WHERE nome='Peter Jackson'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Nova Zelândia'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Jurassic Park', 1993, '2h 07min', 'Um parque com dinossauros clonados se transforma em um grande perigo.', 'https://image.tmdb.org/t/p/w500/9i3plLl89DHMz7mahksDaAo7HIS.jpg', 63000000.00,
(SELECT id FROM api_genero WHERE nome='Aventura'), (SELECT id FROM api_diretor WHERE nome='Steven Spielberg'), (SELECT id FROM api_produtora WHERE nome='Universal Pictures'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Pulp Fiction', 1994, '2h 34min', 'Histórias criminosas se cruzam de forma inesperada.', 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', 8000000.00,
(SELECT id FROM api_genero WHERE nome='Drama'), (SELECT id FROM api_diretor WHERE nome='Quentin Tarantino'), (SELECT id FROM api_produtora WHERE nome='Miramax'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW());

INSERT IGNORE INTO api_produtora (nome) VALUES ('Miramax');

INSERT INTO api_filme 
(titulo, ano, duracao, sinopse, poster, orcamento, genero_id, diretor_id, produtora_id, pais_id, linguagem_id, aprovado, criado_por_id, criado_em)
VALUES
('Toy Story', 1995, '1h 21min', 'Brinquedos ganham vida quando os humanos não estão por perto.', 'https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg', 30000000.00,
(SELECT id FROM api_genero WHERE nome='Animação'), (SELECT id FROM api_diretor WHERE nome='Pete Docter'), (SELECT id FROM api_produtora WHERE nome='Pixar'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Vingadores', 2012, '2h 23min', 'Heróis se unem para salvar o planeta de uma grande ameaça.', 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg', 220000000.00,
(SELECT id FROM api_genero WHERE nome='Ação'), (SELECT id FROM api_diretor WHERE nome='Joss Whedon'), (SELECT id FROM api_produtora WHERE nome='Marvel Studios'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Matrix', 1999, '2h 16min', 'Um hacker descobre que a realidade em que vive é uma simulação.', 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg', 63000000.00,
(SELECT id FROM api_genero WHERE nome='Ficção Científica'), (SELECT id FROM api_diretor WHERE nome='Lana Wachowski'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Coringa', 2019, '2h 02min', 'Arthur Fleck enfrenta dificuldades sociais até se transformar no Coringa.', 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', 55000000.00,
(SELECT id FROM api_genero WHERE nome='Drama'), (SELECT id FROM api_diretor WHERE nome='Todd Phillips'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('O Rei Leão', 1994, '1h 28min', 'Simba precisa assumir seu lugar como rei.', 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg', 45000000.00,
(SELECT id FROM api_genero WHERE nome='Animação'), (SELECT id FROM api_diretor WHERE nome='Roger Allers'), (SELECT id FROM api_produtora WHERE nome='Disney'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Harry Potter e a Pedra Filosofal', 2001, '2h 32min', 'Harry descobre que é bruxo e começa seus estudos em Hogwarts.', 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg', 125000000.00,
(SELECT id FROM api_genero WHERE nome='Fantasia'), (SELECT id FROM api_diretor WHERE nome='Chris Columbus'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Reino Unido'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Forrest Gump', 1994, '2h 22min', 'A vida de Forrest cruza momentos importantes da história americana.', 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', 55000000.00,
(SELECT id FROM api_genero WHERE nome='Drama'), (SELECT id FROM api_diretor WHERE nome='Robert Zemeckis'), (SELECT id FROM api_produtora WHERE nome='Paramount Pictures'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('O Iluminado', 1980, '2h 26min', 'Um escritor se isola com a família em um hotel e começa a enlouquecer.', 'https://image.tmdb.org/t/p/w500/b6ko0IKC8MdYBBPkkA1aBPLe2yz.jpg', 19000000.00,
(SELECT id FROM api_genero WHERE nome='Terror'), (SELECT id FROM api_diretor WHERE nome='Stanley Kubrick'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('Gladiador', 2000, '2h 35min', 'Um general romano busca vingança após ser traído.', 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg', 103000000.00,
(SELECT id FROM api_genero WHERE nome='Ação'), (SELECT id FROM api_diretor WHERE nome='Ridley Scott'), (SELECT id FROM api_produtora WHERE nome='Universal Pictures'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW()),

('A Origem', 2010, '2h 28min', 'Um ladrão invade sonhos para roubar segredos e recebe uma missão quase impossível.', 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg', 160000000.00,
(SELECT id FROM api_genero WHERE nome='Ficção Científica'), (SELECT id FROM api_diretor WHERE nome='Christopher Nolan'), (SELECT id FROM api_produtora WHERE nome='Warner Bros'), (SELECT id FROM api_pais WHERE nome='Estados Unidos'), (SELECT id FROM api_linguagem WHERE nome='Inglês'), 1, NULL, NOW());

INSERT IGNORE INTO api_diretor (nome) VALUES
('Joss Whedon'), ('Lana Wachowski'), ('Todd Phillips'), ('Roger Allers'),
('Chris Columbus'), ('Robert Zemeckis'), ('Stanley Kubrick'), ('Ridley Scott');

INSERT IGNORE INTO api_produtora (nome) VALUES
('Marvel Studios'), ('Disney');

SELECT id, titulo, poster, aprovado FROM api_filme;

DELETE FROM api_filme_atores
WHERE filme_id IN (5, 6, 7);

DELETE FROM api_filme
WHERE id IN (5, 6, 7);

SELECT id, titulo, poster, aprovado
FROM api_filme
ORDER BY id;

UPDATE api_filme
SET poster = 'https://image.tmdb.org/t/p/w500/nrSaXF39nDfAAeLKksRCyvSzI2a.jpg',
    duracao = '2h 49min'
WHERE id = 1;

UPDATE api_filme
SET poster = 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    duracao = '3h 14min'
WHERE id = 2;

UPDATE api_filme
SET poster = 'https://image.tmdb.org/t/p/w500/yRRuLt7sMBEQkHsd1S3KaaofZn7.jpg',
    duracao = '1h 54min'
WHERE id = 3;

USE filminis;

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'Crepúsculo' AND a.nome IN ('Kristen Stewart', 'Robert Pattinson', 'Taylor Lautner');

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'Avatar' AND a.nome IN ('Sam Worthington', 'Kate Winslet');

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'Pulp Fiction' AND a.nome IN ('Samuel L. Jackson');

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'O Senhor dos Anéis: A Sociedade do Anel' AND a.nome IN ('Elijah Wood');

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'Homem-Aranha' AND a.nome IN ('Tobey Maguire');

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'Duna' AND a.nome IN ('Timothée Chalamet', 'Zendaya');

INSERT INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f, api_ator a
WHERE f.titulo = 'A Origem' AND a.nome IN ('Leonardo DiCaprio');

SELECT f.titulo, a.nome
FROM api_filme_atores fa
JOIN api_filme f ON f.id = fa.filme_id
JOIN api_ator a ON a.id = fa.ator_id
ORDER BY f.titulo, a.nome;

INSERT IGNORE INTO api_ator (nome) VALUES
('Kristen Stewart'), ('Robert Pattinson'), ('Taylor Lautner'),
('Leonardo DiCaprio'), ('Matthew McConaughey'), ('Anne Hathaway'),
('Kate Winslet'), ('Margot Robbie'), ('Ryan Gosling'),
('Sam Worthington'), ('Zoe Saldana'), ('Sigourney Weaver'),
('Tobey Maguire'), ('Willem Dafoe'), ('Kirsten Dunst'),
('Timothée Chalamet'), ('Zendaya'), ('Rebecca Ferguson'),
('Elijah Wood'), ('Ian McKellen'), ('Viggo Mortensen'),
('Sam Neill'), ('Laura Dern'), ('Jeff Goldblum'),
('John Travolta'), ('Samuel L. Jackson'), ('Uma Thurman'),
('Tom Hanks'), ('Tim Allen'), ('Jim Varney'),
('Robert Downey Jr.'), ('Chris Evans'), ('Scarlett Johansson'),
('Keanu Reeves'), ('Laurence Fishburne'), ('Carrie-Anne Moss'),
('Joaquin Phoenix'), ('Robert De Niro'), ('Zazie Beetz'),
('Matthew Broderick'), ('Jeremy Irons'), ('James Earl Jones'),
('Daniel Radcliffe'), ('Emma Watson'), ('Rupert Grint'),
('Tom Hanks'), ('Robin Wright'), ('Gary Sinise'),
('Jack Nicholson'), ('Shelley Duvall'), ('Danny Lloyd'),
('Russell Crowe'), ('Joaquin Phoenix'), ('Connie Nielsen');

INSERT IGNORE INTO api_diretor (nome) VALUES
('Catherine Hardwicke'), ('Christopher Nolan'), ('James Cameron'),
('Greta Gerwig'), ('Sam Raimi'), ('Denis Villeneuve'),
('Peter Jackson'), ('Steven Spielberg'), ('Quentin Tarantino'),
('Pete Docter'), ('Joss Whedon'), ('Lana Wachowski'),
('Todd Phillips'), ('Roger Allers'), ('Chris Columbus'),
('Robert Zemeckis'), ('Stanley Kubrick'), ('Ridley Scott');

SET SQL_SAFE_UPDATES = 0;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Catherine Hardwicke'
)
WHERE titulo = 'Crepúsculo'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Christopher Nolan'
)
WHERE titulo = 'Interestelar'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'James Cameron'
)
WHERE titulo = 'Titanic'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Greta Gerwig'
)
WHERE titulo = 'Barbie'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'James Cameron'
)
WHERE titulo = 'Avatar'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Sam Raimi'
)
WHERE titulo = 'Homem-Aranha'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Denis Villeneuve'
)
WHERE titulo = 'Duna'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Peter Jackson'
)
WHERE titulo = 'O Senhor dos Anéis: A Sociedade do Anel'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Steven Spielberg'
)
WHERE titulo = 'Jurassic Park'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Quentin Tarantino'
)
WHERE titulo = 'Pulp Fiction'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Pete Docter'
)
WHERE titulo = 'Toy Story'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Joss Whedon'
)
WHERE titulo = 'Vingadores'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Lana Wachowski'
)
WHERE titulo = 'Matrix'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Todd Phillips'
)
WHERE titulo = 'Coringa'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Roger Allers'
)
WHERE titulo = 'O Rei Leão'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Chris Columbus'
)
WHERE titulo = 'Harry Potter e a Pedra Filosofal'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Robert Zemeckis'
)
WHERE titulo = 'Forrest Gump'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Stanley Kubrick'
)
WHERE titulo = 'O Iluminado'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Ridley Scott'
)
WHERE titulo = 'Gladiador'
AND id IS NOT NULL;

UPDATE api_filme
SET diretor_id = (
    SELECT id FROM api_diretor
    WHERE nome = 'Christopher Nolan'
)
WHERE titulo = 'A Origem'
AND id IS NOT NULL;

SET SQL_SAFE_UPDATES = 1;

SET SQL_SAFE_UPDATES = 0;

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Crepúsculo'
AND a.nome IN ('Kristen Stewart','Robert Pattinson','Taylor Lautner');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Avatar'
AND a.nome IN ('Sam Worthington','Zoe Saldana','Sigourney Weaver');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Homem-Aranha'
AND a.nome IN ('Tobey Maguire','Willem Dafoe','Kirsten Dunst');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Duna'
AND a.nome IN ('Timothée Chalamet','Zendaya','Rebecca Ferguson');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='O Senhor dos Anéis: A Sociedade do Anel'
AND a.nome IN ('Elijah Wood','Ian McKellen','Viggo Mortensen');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Jurassic Park'
AND a.nome IN ('Sam Neill','Laura Dern','Jeff Goldblum');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Toy Story'
AND a.nome IN ('Tom Hanks','Tim Allen','Jim Varney');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Vingadores'
AND a.nome IN ('Robert Downey Jr.','Chris Evans','Scarlett Johansson');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Matrix'
AND a.nome IN ('Keanu Reeves','Laurence Fishburne','Carrie-Anne Moss');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Coringa'
AND a.nome IN ('Joaquin Phoenix','Robert De Niro','Zazie Beetz');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='O Rei Leão'
AND a.nome IN ('Matthew Broderick','Jeremy Irons','James Earl Jones');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Harry Potter e a Pedra Filosofal'
AND a.nome IN ('Daniel Radcliffe','Emma Watson','Rupert Grint');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Forrest Gump'
AND a.nome IN ('Tom Hanks','Robin Wright','Gary Sinise');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='O Iluminado'
AND a.nome IN ('Jack Nicholson','Shelley Duvall','Danny Lloyd');

INSERT IGNORE INTO api_filme_atores (filme_id, ator_id)
SELECT f.id, a.id FROM api_filme f JOIN api_ator a
WHERE f.titulo='Gladiador'
AND a.nome IN ('Russell Crowe','Joaquin Phoenix','Connie Nielsen');

SET SQL_SAFE_UPDATES = 1;

SELECT f.titulo, a.nome AS ator
FROM api_filme_atores fa
JOIN api_filme f ON f.id = fa.filme_id
JOIN api_ator a ON a.id = fa.ator_id
ORDER BY f.titulo, a.nome;

INSERT IGNORE INTO api_produtora (nome) VALUES
('Disney'),
('Marvel Studios'),
('Pixar'),
('Miramax'),
('Temple Hill');

INSERT IGNORE INTO api_pais (nome) VALUES
('Nova Zelândia');

SET SQL_SAFE_UPDATES = 0;

UPDATE api_filme
SET produtora_id = (SELECT id FROM api_produtora WHERE nome = 'Disney')
WHERE titulo = 'O Rei Leão';

UPDATE api_filme
SET produtora_id = (SELECT id FROM api_produtora WHERE nome = 'Marvel Studios')
WHERE titulo = 'Vingadores';

UPDATE api_filme
SET produtora_id = (SELECT id FROM api_produtora WHERE nome = 'Pixar')
WHERE titulo = 'Toy Story';

UPDATE api_filme
SET produtora_id = (SELECT id FROM api_produtora WHERE nome = 'Miramax')
WHERE titulo = 'Pulp Fiction';

UPDATE api_filme
SET produtora_id = (SELECT id FROM api_produtora WHERE nome = 'Temple Hill')
WHERE titulo = 'Crepúsculo';

UPDATE api_filme
SET pais_id = (SELECT id FROM api_pais WHERE nome = 'Nova Zelândia')
WHERE titulo = 'O Senhor dos Anéis: A Sociedade do Anel';

SET SQL_SAFE_UPDATES = 1;

SELECT f.titulo, p.nome AS produtora, pa.nome AS pais
FROM api_filme f
LEFT JOIN api_produtora p ON p.id = f.produtora_id
LEFT JOIN api_pais pa ON pa.id = f.pais_id;

SET SQL_SAFE_UPDATES = 0;

UPDATE api_filme SET duracao = '01:21:00' WHERE titulo = 'Toy Story';
UPDATE api_filme SET duracao = '02:07:00' WHERE titulo = 'Jurassic Park';
UPDATE api_filme SET duracao = '02:58:00' WHERE titulo = 'O Senhor dos Anéis: A Sociedade do Anel';
UPDATE api_filme SET duracao = '02:35:00' WHERE titulo = 'Duna';
UPDATE api_filme SET duracao = '02:01:00' WHERE titulo = 'Homem-Aranha';
UPDATE api_filme SET duracao = '02:42:00' WHERE titulo = 'Avatar';
UPDATE api_filme SET duracao = '02:02:00' WHERE titulo = 'Crepúsculo';
UPDATE api_filme SET duracao = '01:54:00' WHERE titulo = 'Barbie';
UPDATE api_filme SET duracao = '03:14:00' WHERE titulo = 'Titanic';
UPDATE api_filme SET duracao = '02:49:00' WHERE titulo = 'Interestelar';
UPDATE api_filme SET duracao = '02:22:00' WHERE titulo = 'Forrest Gump';

SET SQL_SAFE_UPDATES = 1;

SELECT titulo, duracao
FROM api_filme
WHERE titulo IN (
  'Toy Story',
  'Jurassic Park',
  'O Senhor dos Anéis: A Sociedade do Anel',
  'Duna',
  'Homem-Aranha',
  'Avatar',
  'Crepúsculo',
  'Barbie',
  'Titanic',
  'Interestelar'
);