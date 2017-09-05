--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE courses (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title character varying(255) NOT NULL,
    outline text,
    path_id bigint NOT NULL
);


ALTER TABLE courses OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE courses_id_seq OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE courses_id_seq OWNED BY courses.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE knex_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE knex_migrations_id_seq OWNED BY knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE knex_migrations_lock (
    is_locked integer
);


ALTER TABLE knex_migrations_lock OWNER TO postgres;

--
-- Name: paths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE paths (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    rank integer DEFAULT 0,
    title character varying(255) NOT NULL,
    color character varying(255) NOT NULL,
    icon character varying(255) NOT NULL,
    slug character varying(255)
);


ALTER TABLE paths OWNER TO postgres;

--
-- Name: paths_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE paths_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE paths_id_seq OWNER TO postgres;

--
-- Name: paths_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE paths_id_seq OWNED BY paths.id;


--
-- Name: trainers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE trainers (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    picture character varying(255) NOT NULL,
    description text NOT NULL,
    slug character varying(255) NOT NULL
);


ALTER TABLE trainers OWNER TO postgres;

--
-- Name: trainers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE trainers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainers_id_seq OWNER TO postgres;

--
-- Name: trainers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE trainers_id_seq OWNED BY trainers.id;


--
-- Name: training_locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE training_locations (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    zipcode character varying(255) NOT NULL,
    country character varying(255) NOT NULL
);


ALTER TABLE training_locations OWNER TO postgres;

--
-- Name: training_locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE training_locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE training_locations_id_seq OWNER TO postgres;

--
-- Name: training_locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE training_locations_id_seq OWNED BY training_locations.id;


--
-- Name: training_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE training_sessions (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    training_id bigint NOT NULL,
    training_location_id bigint NOT NULL
);


ALTER TABLE training_sessions OWNER TO postgres;

--
-- Name: training_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE training_sessions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE training_sessions_id_seq OWNER TO postgres;

--
-- Name: training_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE training_sessions_id_seq OWNED BY training_sessions.id;


--
-- Name: trainings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE trainings (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title character varying(255) NOT NULL,
    abstract character varying(255) NOT NULL,
    description text NOT NULL,
    icon character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    social_icon character varying(255),
    rank integer DEFAULT 0,
    objectives text,
    prerequisites text,
    social_title character varying(255),
    social_abstract character varying(255),
    path_id bigint
);


ALTER TABLE trainings OWNER TO postgres;

--
-- Name: trainings_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE trainings_courses (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    rank integer DEFAULT 0,
    training_id bigint NOT NULL,
    course_id bigint NOT NULL
);


ALTER TABLE trainings_courses OWNER TO postgres;

--
-- Name: trainings_courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE trainings_courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainings_courses_id_seq OWNER TO postgres;

--
-- Name: trainings_courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE trainings_courses_id_seq OWNED BY trainings_courses.id;


--
-- Name: trainings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE trainings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainings_id_seq OWNER TO postgres;

--
-- Name: trainings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE trainings_id_seq OWNED BY trainings.id;


--
-- Name: trainings_trainers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE trainings_trainers (
    id bigint NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    training_id bigint NOT NULL,
    trainer_id bigint NOT NULL
);


ALTER TABLE trainings_trainers OWNER TO postgres;

--
-- Name: trainings_trainers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE trainings_trainers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE trainings_trainers_id_seq OWNER TO postgres;

--
-- Name: trainings_trainers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE trainings_trainers_id_seq OWNED BY trainings_trainers.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY courses ALTER COLUMN id SET DEFAULT nextval('courses_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY knex_migrations ALTER COLUMN id SET DEFAULT nextval('knex_migrations_id_seq'::regclass);


--
-- Name: paths id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paths ALTER COLUMN id SET DEFAULT nextval('paths_id_seq'::regclass);


--
-- Name: trainers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainers ALTER COLUMN id SET DEFAULT nextval('trainers_id_seq'::regclass);


--
-- Name: training_locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY training_locations ALTER COLUMN id SET DEFAULT nextval('training_locations_id_seq'::regclass);


--
-- Name: training_sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY training_sessions ALTER COLUMN id SET DEFAULT nextval('training_sessions_id_seq'::regclass);


--
-- Name: trainings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings ALTER COLUMN id SET DEFAULT nextval('trainings_id_seq'::regclass);


--
-- Name: trainings_courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_courses ALTER COLUMN id SET DEFAULT nextval('trainings_courses_id_seq'::regclass);


--
-- Name: trainings_trainers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_trainers ALTER COLUMN id SET DEFAULT nextval('trainings_trainers_id_seq'::regclass);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: paths paths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paths
    ADD CONSTRAINT paths_pkey PRIMARY KEY (id);


--
-- Name: paths paths_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY paths
    ADD CONSTRAINT paths_slug_unique UNIQUE (slug);


--
-- Name: trainers trainers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainers
    ADD CONSTRAINT trainers_pkey PRIMARY KEY (id);


--
-- Name: trainers trainers_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainers
    ADD CONSTRAINT trainers_slug_unique UNIQUE (slug);


--
-- Name: training_locations training_locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY training_locations
    ADD CONSTRAINT training_locations_pkey PRIMARY KEY (id);


--
-- Name: training_sessions training_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY training_sessions
    ADD CONSTRAINT training_sessions_pkey PRIMARY KEY (id);


--
-- Name: trainings_courses trainings_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_courses
    ADD CONSTRAINT trainings_courses_pkey PRIMARY KEY (id);


--
-- Name: trainings trainings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings
    ADD CONSTRAINT trainings_pkey PRIMARY KEY (id);


--
-- Name: trainings trainings_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings
    ADD CONSTRAINT trainings_slug_unique UNIQUE (slug);


--
-- Name: trainings_trainers trainings_trainers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_trainers
    ADD CONSTRAINT trainings_trainers_pkey PRIMARY KEY (id);


--
-- Name: courses_path_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX courses_path_id_index ON courses USING btree (path_id);


--
-- Name: paths_rank_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX paths_rank_index ON paths USING btree (rank);


--
-- Name: training_sessions_end_date_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_sessions_end_date_index ON training_sessions USING btree (end_date);


--
-- Name: training_sessions_start_date_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_sessions_start_date_index ON training_sessions USING btree (start_date);


--
-- Name: training_sessions_training_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_sessions_training_id_index ON training_sessions USING btree (training_id);


--
-- Name: training_sessions_training_location_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX training_sessions_training_location_id_index ON training_sessions USING btree (training_location_id);


--
-- Name: trainings_courses_course_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_courses_course_id_index ON trainings_courses USING btree (course_id);


--
-- Name: trainings_courses_rank_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_courses_rank_index ON trainings_courses USING btree (rank);


--
-- Name: trainings_courses_training_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_courses_training_id_index ON trainings_courses USING btree (training_id);


--
-- Name: trainings_path_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_path_id_index ON trainings USING btree (path_id);


--
-- Name: trainings_rank_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_rank_index ON trainings USING btree (rank);


--
-- Name: trainings_trainers_trainer_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_trainers_trainer_id_index ON trainings_trainers USING btree (trainer_id);


--
-- Name: trainings_trainers_training_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX trainings_trainers_training_id_index ON trainings_trainers USING btree (training_id);


--
-- Name: courses courses_path_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY courses
    ADD CONSTRAINT courses_path_id_foreign FOREIGN KEY (path_id) REFERENCES paths(id);


--
-- Name: training_sessions training_sessions_training_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY training_sessions
    ADD CONSTRAINT training_sessions_training_id_foreign FOREIGN KEY (training_id) REFERENCES trainings(id);


--
-- Name: training_sessions training_sessions_training_location_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY training_sessions
    ADD CONSTRAINT training_sessions_training_location_id_foreign FOREIGN KEY (training_location_id) REFERENCES training_locations(id);


--
-- Name: trainings_courses trainings_courses_course_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_courses
    ADD CONSTRAINT trainings_courses_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses(id);


--
-- Name: trainings_courses trainings_courses_training_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_courses
    ADD CONSTRAINT trainings_courses_training_id_foreign FOREIGN KEY (training_id) REFERENCES trainings(id);


--
-- Name: trainings trainings_path_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings
    ADD CONSTRAINT trainings_path_id_foreign FOREIGN KEY (path_id) REFERENCES paths(id);


--
-- Name: trainings_trainers trainings_trainers_trainer_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_trainers
    ADD CONSTRAINT trainings_trainers_trainer_id_foreign FOREIGN KEY (trainer_id) REFERENCES trainers(id);


--
-- Name: trainings_trainers trainings_trainers_training_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trainings_trainers
    ADD CONSTRAINT trainings_trainers_training_id_foreign FOREIGN KEY (training_id) REFERENCES trainings(id);


--
-- PostgreSQL database dump complete
--

-- Knex migrations

INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170603173516_init.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170604191541_trainings-slug.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170616152405_add-columns-to-training.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170712113822_create_table_training_sessions.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170714122843_create_table_trainers.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170719091316_add_column_social_cloudinary_id_to_trainings.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170810111442_new_trainings.js, 1, NOW());
INSERT INTO knex_migrations(name, batch, migration_time) VALUES ('20170904090813_add_column_slug_to_path.js, 1, NOW());
