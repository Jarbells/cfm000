-- 1. CADASTRO DE LOCUTORES
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Vanderley Paulino', 'Apresentador do Manhã da Cultura', '/images/locutores/vanderley-paulino.jpg');
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Jarbas Santos', 'Apresentador do Jornal da Cultura', '/images/locutores/jarbas-santos.jpg');
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Genivaldo Ferreira', 'Apresentador do Revista no Rádio', '/images/locutores/genivaldo-ferreira.jpg');
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Teixeira Filho', 'Apresentador do Esporte é Cultura', '/images/locutores/teixeira-filho.jpg');
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Equipe Everton Lopes', 'Comando da Equipe Esportiva', '/images/locutores/equipe-everton-lopes.jpg');
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Guilherme Calixto', 'Apresentador do Sertão Repente e Viola', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Padre Reginaldo Manzotti', 'Apresentador do Experiência de Deus', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Luisa Sousa', 'Apresentadora do SINDSEP Em Ação', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Padre João Carlos', 'Apresentador do Programa Tempo de Paz', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Jonas Lopes', 'Membro da Equipe Esportiva', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Eronilton Buriti', 'Apresentador do Bodega Ecológica', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Williame Marques', 'Apresentador do A Voz da Diocese', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Padre Pablo', 'Apresentador do A Voz da Diocese', NULL);
INSERT INTO tb_locutor (name, bio, photo_url) VALUES ('Luciano Silva', 'Apresentador do O Rei do Baião', NULL);

-- 2. CADASTRO DE PROGRAMAS
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Sertão Repente e Viola', 'Segunda a Sábado', '05:00:00', '06:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Bom Dia Alegria', 'Segunda a Sexta', '06:00:00', '07:30:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Jornal da Dom Bosco', 'Segunda a Sexta', '07:30:00', '08:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Manhã da Cultura', 'Segunda a Sexta', '08:00:00', '10:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Experiência de Deus', 'Segunda a Sábado', '10:00:00', '11:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Esporte é Cultura Primeira Edição', 'Segunda a Sexta', '11:00:00', '11:30:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Jornal da Cultura', 'Segunda a Quinta', '11:30:00', '13:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Jornal da Cultura', 'Sexta-Feira', '12:00:00', '13:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Especial Musical', 'Segunda a Sexta', '13:00:00', '14:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Revista no Rádio', 'Segunda a Sexta', '14:00:00', '16:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Programa Tempo de Paz', 'Segunda a Sexta', '16:00:00', '17:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Missa FM Dom Bosco', 'Segunda a Sexta', '17:00:00', '17:45:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Vatican News', 'Segunda a Sexta', '17:45:00', '18:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Santo Terço', 'Segunda a Sexta', '18:00:00', '18:30:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Esporte é Cultura Segunda Edição', 'Segunda a Sexta', '18:30:00', '19:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('A Voz do Brasil', 'Segunda a Sexta', '19:00:00', '20:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('SINDSEP Em Ação', 'Sexta-Feira', '11:30:00', '12:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Transmissão da Santa Missa', 'Sábado', '06:00:00', '07:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Bodega Ecológica', 'Sábado', '07:00:00', '07:30:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Sindicato dos Trabalhadores Rurais', 'Sábado', '07:30:00', '08:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Hora da Caridade', 'Sábado', '08:00:00', '09:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('A Voz da Diocese', 'Sábado', '09:00:00', '10:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('O Rei do Baião', 'Domingo', '12:00:00', '15:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('Tarde Esportiva', 'Domingo', '15:00:00', '19:00:00');
INSERT INTO tb_program (name, days_of_week, start_time, end_time) VALUES ('A Santa Missa da Catedral', 'Domingo', '19:00:00', '20:00:00');

-- 3. RELACIONAMENTO PROGRAMAS E LOCUTORES
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (1, 6);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (2, 4);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (4, 1);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (5, 7);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (6, 4);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (6, 5);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (7, 2);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (8, 2);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (10, 3);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (11, 9);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (15, 10);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (15, 5);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (17, 8);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (19, 11);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (22, 12);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (22, 13);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (23, 14);
INSERT INTO tb_program_locutor (program_id, locutor_id) VALUES (24, 5);

-- 4. INFORMAÇÕES GLOBAIS DA RÁDIO (Registro Único)
INSERT INTO tb_radio_info (id, radio_name, slogan, logo_url, address_street, address_city, address_state, email_contact) VALUES (1, 'Cultura FM', 'A sua rádio em Quixadá', '/images/logo-cultura.png', 'Rua Monsenhor Salviano de Almeida Pinto', 'Quixadá', 'CE', 'contato@culturafm.com.br');
-- 5. CADASTRO DE NOTÍCIAS
INSERT INTO tb_news(title, subtitle, content, author, image_url, publication_date) VALUES ('Festival de Violeiros agita o fim de semana em Quixadá', 'Evento tradicional reuniu grandes nomes da música sertaneja de raiz na Praça da Cultura, atraindo grande público.', 'Durante todo o fim de semana, a cidade de Quixadá respirou a autêntica cultura nordestina com a realização do tradicional Festival de Violeiros. O evento, apoiado pela Rádio Cultura FM, contou com apresentações de artistas locais e regionais, que emocionaram a plateia com seus repentes e canções. A organização estima que mais de 5 mil pessoas passaram pela praça durante os dois dias de festa.', 'Redação Cultura FM', '/images/news/festival-violeiros.jpg', '2025-08-22 10:00:00');
INSERT INTO tb_news(title, subtitle, content, author, image_url, publication_date) VALUES ('Açude Cedro atinge marca histórica de volume', 'Boas chuvas na região animam agricultores e garantem abastecimento hídrico para os próximos meses, trazendo alívio para o sertão.', 'O Açude do Cedro, um dos cartões postais de Quixadá, atingiu nesta segunda-feira (25) uma de suas maiores marcas de volume acumulado dos últimos 10 anos, segundo dados dos órgãos de monitoramento. As recentes chuvas na bacia hidrográfica foram essenciais para a recuperação do reservatório. A notícia traz esperança para a agricultura familiar e para o abastecimento da cidade.', 'Jarbas Santos', '/images/news/acude-cedro.jpg', '2025-08-25 08:30:00');
INSERT INTO tb_news(title, subtitle, content, author, image_url, publication_date) VALUES ('Quixadá F.C. se prepara para a estreia no campeonato estadual', 'Equipe técnica e jogadores estão confiantes para o primeiro jogo da temporada, que acontece no próximo domingo no estádio Abilhão.', 'O Quixadá Futebol Clube intensificou os treinos esta semana visando a sua estreia no campeonato estadual. Em entrevista à Rádio Cultura, o técnico afirmou que o time está focado e bem preparado para enfrentar o seu primeiro adversário. A expectativa é de casa cheia para apoiar o Canarinho do Sertão em busca do acesso.', 'Equipe Everton Lopes', '/images/news/quixada-fc.jpg', '2025-08-25 15:00:00');

-- 6. CADASTRO DE EVENTOS
INSERT INTO tb_event(event_name, description, location, image_url, event_date) VALUES ('Feira de Artesanato na Praça', 'A tradicional feira de artesanato local volta a acontecer com dezenas de expositores, comidas típicas e música ao vivo.', 'Praça José de Barros, Centro', '/images/events/feira-artesanato.jpg', '2025-08-30 18:00:00');
INSERT INTO tb_event(event_name, description, location, image_url, event_date) VALUES ('Festejos da Padroeira de Quixadá', 'Novenas, missas e quermesses em celebração à Nossa Senhora Imaculada Conceição, padroeira de Quixadá.', 'Catedral de Jesus, Maria e José', '/images/events/festejos-padroeira.jpg', '2025-10-28 19:00:00');
INSERT INTO tb_event(event_name, description, location, image_url, event_date) VALUES ('Show de Verão com Sol Maior', 'A banda Sol Maior agita o início do verão com os maiores sucessos do forró e axé no Cedro Club.', 'Balneário Cedro Club', '/images/events/show-verao.jpg', '2025-12-21 22:00:00');

--
-- 7. CADASTRO DE PATROCINADORES
--
INSERT INTO tb_sponsor(name, logo_url, website_url, display_order) VALUES ('Mercadinho São Luiz', '/images/sponsors/sao-luiz.png', 'https://www.mercadinhossaoluiz.com.br/', 1);
INSERT INTO tb_sponsor(name, logo_url, website_url, display_order) VALUES ('Farmácia do Trabalhador', '/images/sponsors/farmacia-trabalhador.png', NULL, 2);
INSERT INTO tb_sponsor(name, logo_url, website_url, display_order) VALUES ('Óticas Diniz', '/images/sponsors/oticas-diniz.png', 'https://oticasdiniz.com.br/', 3);

--
-- 8. IMAGENS PARA PROGRAMAS (Exemplo)
--
INSERT INTO tb_program_image (program_id, image_url) VALUES (4, 'https://images.unsplash.com/photo-1598387993441-a364f55142b4?q=80&w=1920&auto=format&fit=crop');
INSERT INTO tb_program_image (program_id, image_url) VALUES (4, 'https://images.unsplash.com/photo-1516280440614-376394488844?q=80&w=1920&auto=format&fit=crop');
INSERT INTO tb_program_image (program_id, image_url) VALUES (4, 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1920&auto=format&fit=crop');