--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: offers_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.offers_categories (
    id integer NOT NULL,
    parent_id integer,
    provider character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255),
    description text,
    content text,
    image_id integer,
    featured_id integer,
    banner_id integer,
    user_id integer,
    order_by integer,
    created_by_id integer,
    updated_by_id integer,
    enabled boolean DEFAULT true NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    updated timestamp with time zone DEFAULT now() NOT NULL,
    deleted timestamp with time zone
);


ALTER TABLE public.offers_categories OWNER TO postgres;

--
-- Name: offers_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.offers_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offers_categories_id_seq OWNER TO postgres;

--
-- Name: offers_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.offers_categories_id_seq OWNED BY public.offers_categories.id;


--
-- Name: offers_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers_categories ALTER COLUMN id SET DEFAULT nextval('public.offers_categories_id_seq'::regclass);


--
-- Data for Name: offers_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.offers_categories (id, parent_id, provider, title, slug, description, content, image_id, featured_id, banner_id, user_id, order_by, created_by_id, updated_by_id, enabled, created, updated, deleted) FROM stdin;
2	1	beauty	Маникюр	manicure	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 10:52:34.688+00	2023-09-11 10:52:34.688+00	\N
3	1	beauty	Педикюр	pedicure	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 10:54:04.59+00	2023-09-11 10:54:04.59+00	\N
4	1	beauty	Окрашивание волос	hair-coloring	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 10:55:22.015+00	2023-09-11 10:55:22.015+00	\N
5	1	beauty	Укладка волос	hair-styling	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 10:57:52.553+00	2023-09-11 10:57:52.553+00	\N
6	1	beauty	Стрижка волос	haircut	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 11:00:45.184+00	2023-09-11 11:00:45.184+00	\N
7	1	beauty	Уход за ресницами и бровями	eyelash-and-eyebrow-care	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 11:04:50.051+00	2023-09-11 11:04:50.051+00	\N
8	1	beauty	Чистка лица	face-cleaning	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:00:18.181+00	2023-09-11 12:00:18.181+00	\N
9	1	beauty	Мейкап	makeup	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:01:21.38+00	2023-09-11 12:01:21.38+00	\N
10	1	beauty	Эпиляция	epilation	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:02:17.29+00	2023-09-11 12:02:17.29+00	\N
11	1	beauty	Массаж	massage	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:02:56.881+00	2023-09-11 12:02:56.881+00	\N
12	1	beauty	Личный стилист	stylist	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:03:45.23+00	2023-09-11 12:03:45.23+00	\N
13	1	beauty	Личный диетолог	nutritionist	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:04:57.377+00	2023-09-11 12:04:57.377+00	\N
14	1	beauty	Личный велнес-консультант	wellness	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:06:02.731+00	2023-09-11 12:06:02.731+00	\N
15	1	beauty	Совместный шоппинг	shopping	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:06:50.493+00	2023-09-11 12:06:50.493+00	\N
16	1	beauty	Личный визажист	personal-makeup	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:08:32.548+00	2023-09-11 12:08:32.548+00	\N
1	\N	main	Бьюти	beauty	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 10:50:07.457+00	2023-09-11 10:50:07.457+00	\N
17	\N	main	Животные	pets	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:17:36.95+00	2023-09-11 12:17:36.95+00	\N
18	17	pets	Выгулять собаку	walk-the-dog	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:18:31.401+00	2023-09-11 12:18:31.401+00	\N
19	17	pets	Покормить кошку/собаку/мелкое домашнее животное	feed-the-pet	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:19:48.727+00	2023-09-11 12:19:48.727+00	\N
20	17	pets	Купить и доставить корм	buy-the-food	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:20:36.058+00	2023-09-11 12:20:36.058+00	\N
21	17	pets	Поухаживать за домашним животным в квартире хозяев	pet-care	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:21:27.696+00	2023-09-11 12:21:27.696+00	\N
22	17	pets	Забрать животное на передержку	forester-care	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:22:10.446+00	2023-09-11 12:22:10.446+00	\N
23	17	pets	Подстричь собаку, кошку (груминг)	grooming	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:23:09.467+00	2023-09-11 12:23:09.467+00	\N
24	\N	main	Обучение (репетиторство)	studying	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:27:01.704+00	2023-09-11 12:27:01.704+00	\N
25	\N	studying	Уроки по иностранному языку	languages	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:29:08.896+00	2023-09-11 12:29:08.896+00	\N
26	\N	studying	Уроки игры на музыкальных инструментах	music	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:29:32.837+00	2023-09-11 12:29:32.837+00	\N
27	\N	studying	Уроки программирования	programming	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:29:58.327+00	2023-09-11 12:29:58.327+00	\N
28	\N	studying	Уроки графического дизайна	graphic-design	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:30:23.888+00	2023-09-11 12:30:23.888+00	\N
29	\N	studying	Уроки SMM	smm	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:30:49.753+00	2023-09-11 12:30:49.753+00	\N
30	\N	studying	Уроки копирайтинга	copyright	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:31:18.852+00	2023-09-11 12:31:18.852+00	\N
31	\N	studying	Уроки диджеинга	dj	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:31:39.864+00	2023-09-11 12:31:39.864+00	\N
32	\N	studying	Уроки создания музыки	composer	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:32:04.125+00	2023-09-11 12:32:04.125+00	\N
33	\N	studying	Уроки съемки reels/stories	reels	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:32:21.33+00	2023-09-11 12:32:21.33+00	\N
34	\N	studying	Уроки по работе с Excel/Google Drive	computer-science	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:32:50.792+00	2023-09-11 12:32:50.792+00	\N
35	\N	studying	Уроки по работе с маркетплейсами	marketplace	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:33:11.273+00	2023-09-11 12:33:11.273+00	\N
36	\N	studying	Уроки футбола/волейбола/баскетбола	sport	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:33:33.173+00	2023-09-11 12:33:33.173+00	\N
37	\N	studying	Уроки пилатеса	pilates	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:33:53.617+00	2023-09-11 12:33:53.617+00	\N
38	\N	studying	Уроки воркаута	workout	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:34:16.855+00	2023-09-11 12:34:16.855+00	\N
39	\N	studying	Уроки фотосъемки и фотошопа	photo	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:34:41.454+00	2023-09-11 12:34:41.454+00	\N
40	\N	studying	Репетиторство по школьным предметам	school	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:35:05.753+00	2023-09-11 12:35:05.753+00	\N
41	\N	studying	Репетиторство при поступлении в ВУЗ	univercity	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:35:30.015+00	2023-09-11 12:35:30.015+00	\N
42	\N	studying	Репетиторство со студентами	students	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:35:53.068+00	2023-09-11 12:35:53.068+00	\N
43	\N	studying	Поделиться опытом	share-experience	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:36:19.262+00	2023-09-11 12:36:19.262+00	\N
44	\N	main	Автомобиль	transport	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:37:15.223+00	2023-09-11 12:37:15.223+00	\N
45	\N	transport	Завести двигатель/отогреть авто	start-the-engine	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:40:54.968+00	2023-09-11 12:40:54.968+00	\N
46	\N	transport	Диагностика неполадок во дворе	diagnose	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:41:27.244+00	2023-09-11 12:41:27.244+00	\N
47	\N	transport	Замена масла	oil-change	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:41:54.499+00	2023-09-11 12:41:54.499+00	\N
48	\N	transport	Мойка кузова/чистка салона	car-cleaning	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:42:31.961+00	2023-09-11 12:42:31.961+00	\N
49	\N	transport	Замена шин	tire-replacement	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:43:08.231+00	2023-09-11 12:43:08.231+00	\N
50	\N	transport	Перепарковать авто	car-reparking	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:43:37.311+00	2023-09-11 12:43:37.311+00	\N
51	\N	transport	Починить/заправить кондиционер	car-air-conditioner-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:44:06.33+00	2023-09-11 12:44:06.33+00	\N
52	\N	transport	Помогите я застрял	stuck-help	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:44:32.198+00	2023-09-11 12:44:32.198+00	\N
53	\N	transport	Поиск попутчика	travel-companion	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:45:04.412+00	2023-09-11 12:45:04.412+00	\N
54	\N	main	Домашние дела	housework	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:48:29.633+00	2023-09-11 12:48:29.633+00	\N
55	\N	housework	Уборка квартиры	cleaning	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:50:27.242+00	2023-09-11 12:50:27.242+00	\N
56	\N	housework	Химчистка ковров	carpet	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:52:05.661+00	2023-09-11 12:52:05.661+00	\N
57	\N	housework	Ремонт мебели	furniture-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:52:45.068+00	2023-09-11 12:52:45.068+00	\N
58	\N	housework	Сборка мебели	furniture-assembly	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:53:23.803+00	2023-09-11 12:53:23.803+00	\N
59	\N	housework	Ремонт сантехники	plumbing-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:53:56.889+00	2023-09-11 12:53:56.889+00	\N
60	\N	housework	Установка окон	window-assembly	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:54:32.589+00	2023-09-11 12:54:32.589+00	\N
61	\N	housework	Подъем и сборка мебели	furniture-lifting	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:55:05.849+00	2023-09-11 12:55:05.849+00	\N
119	\N	children	Подготовка к ЕГЭ	exam-preparation	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:38:24.154+00	2023-09-11 13:38:24.154+00	\N
62	\N	housework	Подъем и сборка бытовой техники	household-appliances	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:55:41.382+00	2023-09-11 12:55:41.382+00	\N
63	\N	housework	Покраска стен и потолков	house-paintings	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:56:22.541+00	2023-09-11 12:56:22.541+00	\N
64	\N	housework	Укладка кафеля	laying-tiles	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:56:49.027+00	2023-09-11 12:56:49.027+00	\N
65	\N	housework	Установка розеток	electricity	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:57:23.009+00	2023-09-11 12:57:23.009+00	\N
66	\N	housework	Мытье окон	window-cleaning	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:57:51.519+00	2023-09-11 12:57:51.519+00	\N
67	\N	housework	Укладка напольных покрытий	floor-covering	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:58:30.375+00	2023-09-11 12:58:30.375+00	\N
68	\N	housework	Ремонт одежды и обуви	clothes-and-shoes-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:59:14.155+00	2023-09-11 12:59:14.155+00	\N
69	\N	housework	Глажка	ironing	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 12:59:41.066+00	2023-09-11 12:59:41.066+00	\N
70	\N	housework	Уход за растениями	plant-care	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:00:06.117+00	2023-09-11 13:00:06.117+00	\N
71	\N	housework	Поклеить обои	wallpapers	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:00:36.987+00	2023-09-11 13:00:36.987+00	\N
72	\N	housework	Перестановка по фен-шую	feng-shui	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:01:01.063+00	2023-09-11 13:01:01.063+00	\N
73	\N	housework	Мелкая домашняя работа	minor-housework	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:01:27.288+00	2023-09-11 13:01:27.288+00	\N
74	\N	housework	Ремонт дверей	door-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:01:50.74+00	2023-09-11 13:01:50.74+00	\N
75	\N	housework	Остекленение балкон	balcony-glazing	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:02:38.695+00	2023-09-11 13:02:38.695+00	\N
76	\N	housework	Помощь на даче / загородом	countryside	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:03:06.212+00	2023-09-11 13:03:06.212+00	\N
77	\N	housework	Вынести мусор	trash	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:03:31.188+00	2023-09-11 13:03:31.188+00	\N
78	\N	main	Помощь с техникой	appliances	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:05:18.5+00	2023-09-11 13:05:18.5+00	\N
79	\N	appliances	Ремонт компьютеров и телефонов	computer-and-phone-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:06:27.911+00	2023-09-11 13:06:27.911+00	\N
80	\N	appliances	Настройка компьютеров и телефонов	setting-up-computer-and-phone	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:07:14.047+00	2023-09-11 13:07:14.047+00	\N
81	\N	appliances	Скачать и настроить приложение	configure-applications	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:07:50.414+00	2023-09-11 13:07:50.414+00	\N
82	\N	appliances	Обслуживание и ремонт бытовой техники	maintenance-and-repair	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:08:25.116+00	2023-09-11 13:08:25.116+00	\N
83	\N	appliances	Установка и обслуживание кондиционеров	ac-maintenance-and-installation	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:09:13.507+00	2023-09-11 13:09:13.507+00	\N
84	\N	appliances	Обслуживание и ремонт велосипедов	bicycle-maintenance-and-installation	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:09:46.329+00	2023-09-11 13:09:46.329+00	\N
85	\N	main	Социальные услуги	social	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:11:06.233+00	2023-09-11 13:11:06.233+00	\N
86	\N	social	Купить и принести продукты	groceries	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:12:08.861+00	2023-09-11 13:12:08.861+00	\N
87	\N	social	Приготовить еду	prepare-food	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:12:44.608+00	2023-09-11 13:12:44.608+00	\N
88	\N	social	Посидеть с пожилым человеком	elderies	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:13:12.978+00	2023-09-11 13:13:12.978+00	\N
89	\N	social	Заполнить документы	fill-the-documents	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:13:45.267+00	2023-09-11 13:13:45.267+00	\N
90	\N	social	Отнести и отправить посылку на почту/ПВЗ	post-parcels	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:14:11.703+00	2023-09-11 13:14:11.703+00	\N
91	\N	social	Забрать и принести товар из ПВЗ	pickup-parcels	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:14:39.873+00	2023-09-11 13:14:39.873+00	\N
92	\N	social	Проверить квартиру в отсутствие хозяев	check-the-appartments	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:15:11.676+00	2023-09-11 13:15:11.676+00	\N
93	\N	social	Уточнить показания счетчиков	meter-reading	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:15:45.509+00	2023-09-11 13:15:45.509+00	\N
94	\N	social	Показать квартиру покупателю/арендаторув	show-apartment	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:16:22.264+00	2023-09-11 13:16:22.264+00	\N
95	\N	social	Организовать встречу домовладельцев	house-meetings	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:17:05.744+00	2023-09-11 13:17:05.744+00	\N
96	\N	social	Составить компанию	house-companies	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:17:51.724+00	2023-09-11 13:17:51.724+00	\N
97	\N	social	Организовать благотворительный ивент	charity	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:18:15.417+00	2023-09-11 13:18:15.417+00	\N
98	\N	social	Эзотерические услуги	esoteric	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:18:47.664+00	2023-09-11 13:18:47.664+00	\N
99	\N	social	Совместный отдых / путешествие/культурное мероприятие	house-events	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:19:18.586+00	2023-09-11 13:19:18.586+00	\N
100	\N	social	Помощь с покупками	shopping	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:19:42.059+00	2023-09-11 13:19:42.059+00	\N
101	\N	social	Поделиться лайфхаком	lifehacks	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:20:10.884+00	2023-09-11 13:20:10.884+00	\N
102	\N	social	Договориться с соседями	neighbours	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:20:43.72+00	2023-09-11 13:20:43.72+00	\N
103	\N	social	Совместно обустроить территорию	territory	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:21:12.274+00	2023-09-11 13:21:12.274+00	\N
104	\N	social	Привезти аленький цветочек (купить для соседа за границей)	get-a-gift	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:21:48.543+00	2023-09-11 13:21:48.543+00	\N
105	\N	social	Найти совместный интерес / партнерство по хобби	hobbies	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:22:17.52+00	2023-09-11 13:22:17.52+00	\N
106	\N	social	Провести опрос соседей	quiz	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:24:11.844+00	2023-09-11 13:24:11.844+00	\N
107	\N	social	Вопрос - ответ	question-answer	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:24:45.597+00	2023-09-11 13:24:45.597+00	\N
111	\N	social	Местные полезные дела	useful-things	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:31:14.666+00	2023-09-11 13:31:14.666+00	\N
112	\N	social	Локальный челлендж	challenge	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:33:02.948+00	2023-09-11 13:33:02.948+00	\N
108	\N	social	Устроить флешмоб	flashmob	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:25:17.366+00	2023-09-11 13:25:17.366+00	\N
109	\N	social	Поздравить соседа	congradulate	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:30:16.296+00	2023-09-11 13:30:16.296+00	\N
110	\N	social	Устроить сюрприз / розыгрыш	surprise	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:30:47.461+00	2023-09-11 13:30:47.461+00	\N
113	\N	main	Дети	children	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:34:42.384+00	2023-09-11 13:34:42.384+00	\N
114	\N	children	Посидеть с ребенком	sit-with-child	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:36:04.463+00	2023-09-11 13:36:04.463+00	\N
115	\N	children	Погулять с ребенком	walk-with-child	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:36:32.72+00	2023-09-11 13:36:32.72+00	\N
116	\N	children	Отвести ребенка в школу/сад/на занятия	child-activities	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:37:01.935+00	2023-09-11 13:37:01.935+00	\N
117	\N	children	Сделать уроки	child-homework	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:37:31.369+00	2023-09-11 13:37:31.369+00	\N
118	\N	children	Репетитор по предмету	child-studying	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:37:57.693+00	2023-09-11 13:37:57.693+00	\N
120	\N	children	Организовать праздник	organize-holiday	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:38:50.164+00	2023-09-11 13:38:50.164+00	\N
121	\N	main	Игры	games	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:51:56.135+00	2023-09-11 13:51:56.135+00	\N
122	\N	games	Провести турнир по шахматам	chess	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:52:42.124+00	2023-09-11 13:52:42.124+00	\N
123	\N	games	Провести турнир по футболу/волейболу/баскетболу	sports-tournament	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:53:13.717+00	2023-09-11 13:53:13.717+00	\N
124	\N	games	Провести турнир по настольной игре	boardgame-tournament	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:56:29.618+00	2023-09-11 13:56:29.618+00	\N
125	\N	games	Провести турнир по компьютерным играм	computergame-tournament	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:56:55.544+00	2023-09-11 13:56:55.544+00	\N
126	\N	games	Совместный поход на спорт / просмотр матча	sports-together	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:57:27.082+00	2023-09-11 13:57:27.082+00	\N
127	\N	games	Совместные занятия спортом	sports-activities	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:57:58.376+00	2023-09-11 13:57:58.376+00	\N
128	\N	main	Аренда	rent	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 13:59:00.571+00	2023-09-11 13:59:00.571+00	\N
129	\N	rent	Аренда спортинвентаря	rent-equipment	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:06:14.253+00	2023-09-11 14:06:14.253+00	\N
130	\N	rent	Аренда велосипедов	rent-bicycle	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:06:49.816+00	2023-09-11 14:06:49.816+00	\N
131	\N	rent	Аренда ПК / ноутбуков	rent-pc-laptop	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:07:13.763+00	2023-09-11 14:07:13.763+00	\N
132	\N	rent	Аренда бытовой техники	rent-appliances	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:07:40.908+00	2023-09-11 14:07:40.908+00	\N
133	\N	rent	Аренда мебели	rent-furniture	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:08:00.302+00	2023-09-11 14:08:00.302+00	\N
134	\N	rent	Сдать  жилье в аренду	rent-out	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:08:28.749+00	2023-09-11 14:08:28.749+00	\N
135	\N	rent	Снять жилье в аренду	rent-a-house	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:08:56.515+00	2023-09-11 14:08:56.515+00	\N
136	\N	rent	Совместная аренда	rent-tenancy	\N	\N	\N	\N	\N	\N	\N	1	1	t	2023-09-11 14:09:21.624+00	2023-09-11 14:09:21.624+00	\N
\.


--
-- Name: offers_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.offers_categories_id_seq', 136, true);


--
-- Name: offers_categories offers_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers_categories
    ADD CONSTRAINT offers_categories_pkey PRIMARY KEY (id);


--
-- Name: offers_categories offers_categories_title_provider_deleted; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers_categories
    ADD CONSTRAINT offers_categories_title_provider_deleted UNIQUE (title, provider, deleted);


--
-- Name: offers_categories offers_categories_parent_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers_categories
    ADD CONSTRAINT offers_categories_parent_id_foreign FOREIGN KEY (parent_id) REFERENCES public.offers_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: offers_categories offers_categories_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.offers_categories
    ADD CONSTRAINT offers_categories_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

