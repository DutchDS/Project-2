PGDMP     "    8                x         	   corona_db    12.1    12.1     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                        1262    17834 	   corona_db    DATABASE     �   CREATE DATABASE corona_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE corona_db;
                postgres    false            �            1259    18235    daily_stats    TABLE     �   CREATE TABLE public.daily_stats (
    "Unnamed: 0" bigint,
    american_name text,
    province_name text,
    province_short text,
    conf_count bigint,
    susp_count bigint,
    cured_count bigint,
    dead_count bigint,
    date text
);
    DROP TABLE public.daily_stats;
       public         heap    postgres    false           