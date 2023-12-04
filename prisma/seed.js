import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();
dayjs.locale("pt", "BR");

async function seed() {
  await prisma.person.createMany({
    data: [{ name: "Gu" }, { name: "Jaque" }],
  });
  await prisma.account.createMany({
    data: [
      { personId: 1, name: "D Iti Gu" },
      { personId: 1, name: "D C6 Gu" },
      { personId: 2, name: "D BB Jaque" },
      { personId: 2, name: "D Nuconta Jaque" },
      { personId: 2, name: "D Alelo Alimentação Jaque" },
      { personId: 1, name: "C Visa Gu" },
      { personId: 1, name: "C Visa Jaque" },
      { personId: 1, name: "C C6 Gu" },
      { personId: 1, name: "C C6 Jaque" },
      { personId: 1, name: "C Inter Gu" },
      { personId: 1, name: "C Amazon Gu" },
      { personId: 1, name: "C Nubank Gu" },
      { personId: 2, name: "C Nubank Jaque" },
    ],
  });
  await prisma.transaction.createMany({
    data: [
      {
        accountId: 1,

        date: new Date("2023-11-23T12:00:00"),
        amount: 46.74,
        description: "IPTU Esgoto",
      },
      {
        accountId: 1,

        date: new Date("2023-11-16T12:00:00"),
        amount: 119.82,
        description: "Internet",
      },
      {
        accountId: 1,

        date: new Date("2023-11-16T12:00:00"),
        amount: 487.99,
        description: "Condomínio",
      },
      {
        accountId: 1,

        date: new Date("2023-11-10T12:00:00"),
        amount: 249.15,
        description: "Gás",
      },
      {
        accountId: 1,

        date: new Date("2023-11-10T12:00:00"),
        amount: 196.05,
        description: "Copel",
      },
      {
        accountId: 1,

        date: new Date("2023-11-10T12:00:00"),
        amount: 17.28,
        description: "IPTU Garagem",
      },
      {
        accountId: 1,

        date: new Date("2023-11-10T12:00:00"),
        amount: 62.55,
        description: "IPTU Apto",
      },
      // D BB
      {
        accountId: 3,

        date: new Date("2023-11-23T12:00:00"),
        amount: 150,
        description: "Festa BB",
      },
      {
        accountId: 3,

        date: new Date("2023-11-17T12:00:00"),
        amount: 227.27,
        description: "Cassi",
      },
      {
        accountId: 3,

        date: new Date("2023-11-17T12:00:00"),
        amount: 331.45,
        description: "Previ",
      },
      {
        accountId: 3,

        date: dayjs(new Date("2023-11-14T12:00:00")),
        amount: 90.94,
        description: "Licensiamento 2008",
      },
      {
        accountId: 3,

        date: new Date("2023-11-03T12:00:00"),
        amount: 200,
        description: "Estacionamento mensalista",
      },

      {
        accountId: 5,

        date: new Date("2023-11-29T12:00:00"),
        amount: 202.79,
        description: "Jacomar",
      },
      {
        accountId: 5,

        date: new Date("2023-11-27T12:00:00"),
        amount: 95.74,
        description: "Maru",
      },
      {
        accountId: 5,

        date: new Date("2023-11-25T12:00:00"),
        amount: 590.72,
        description: "AAJ Até 25/11/23",
      },
      {
        accountId: 5,

        date: new Date("2023-11-18T12:00:00"),
        amount: 731.59,
        description: "AAJ Até 18/11/23",
      },
      {
        accountId: 5,

        date: new Date("2023-11-11T12:00:00"),
        amount: 632.32,
        description: "AAJ Até 11/11/23",
      },
      {
        accountId: 5,

        date: new Date("2023-11-05T12:00:00"),
        amount: 21.9,
        description: "Maria Açai",
      },
      {
        accountId: 5,

        date: new Date("2023-11-05T12:00:00"),
        amount: 41.6,
        description: "Cacaushow",
      },

      // VG
      {
        accountId: 6,

        date: new Date("2023-11-16T12:00:00"),
        amount: 51,
        description: "Ifood Spedini",
      },
      {
        accountId: 6,

        date: new Date("2023-11-16T12:00:00"),
        amount: 50.73,
        description: "Aliexpres Teclado",
        reacurring: true,
        parcels: 2,
        currentParcel: 1,
      },
      {
        accountId: 6,

        date: new Date("2023-11-08T12:00:00"),
        amount: 27.4,
        description: "Uber",
      },
      {
        accountId: 6,

        date: new Date("2023-11-07T12:00:00"),
        amount: 34.59,
        description: "Youse",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 6,

        date: new Date("2023-11-07T12:00:00"),
        amount: 26.92,
        description: "Uber",
      },
      {
        accountId: 6,

        date: new Date("2023-11-05T12:00:00"),
        amount: 27.9,
        description: "Spotify",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 6,

        date: new Date("2023-11-05T12:00:00"),
        amount: 22.9,
        description: "Sencon",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 6,

        date: new Date("2023-11-03T12:00:00"),
        amount: 46.82,
        description: "Aliexpres tranqueiras",
      },
      {
        accountId: 6,

        date: new Date("2023-11-02T12:00:00"),
        amount: 98.8,
        description: "Ifood sushi",
      },
      {
        accountId: 6,

        date: new Date("2023-11-02T12:00:00"),
        amount: 200,
        description: "Posto Shell",
      },

      // VJ
      {
        accountId: 7,

        date: new Date("2023-11-26T12:00:00"),
        amount: 80.8,
        description: "Boticário presentes",
        reacurring: true,
        parcels: 3,
        currentParcel: 1,
      },
      {
        accountId: 7,

        date: new Date("2023-11-22T12:00:00"),
        amount: 118.8,
        description: "Seguro 2008",
        reacurring: true,
        parcels: 8,
        currentParcel: 1,
      },
      {
        accountId: 7,

        date: new Date("2023-11-17T12:00:00"),
        amount: 191.65,
        description: "Posto Shell",
      },
      {
        accountId: 7,

        date: new Date("2023-11-15T12:00:00"),
        amount: 52.99,
        description: "Ifood Hotdog",
      },
      {
        accountId: 7,

        date: new Date("2023-11-10T12:00:00"),
        amount: 44.88,
        description: "Ifood Doces",
      },
      {
        accountId: 7,

        date: new Date("2023-11-09T12:00:00"),
        amount: 192,
        description: "Posto Shell",
      },
      {
        accountId: 7,

        date: new Date("2023-11-08T12:00:00"),
        amount: 45,
        description: "Meu Estar",
      },

      // C6G
      {
        accountId: 8,

        date: new Date("2023-11-28T12:00:00"),
        amount: 75.28,
        description: "Renner",
        reacurring: true,
        parcels: 2,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-11-26T12:00:00"),
        amount: 10.99,
        description: "Gelo no posto",
      },
      {
        accountId: 8,

        date: new Date("2023-11-25T12:00:00"),
        amount: 10,
        description: "Smiles",
      },
      {
        accountId: 8,

        date: new Date("2023-11-25T12:00:00"),
        amount: 41.9,
        description: "Livelo",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 8,

        date: new Date("2023-11-25T12:00:00"),
        amount: 176.82,
        description: "Angeloni",
      },
      {
        accountId: 8,

        date: new Date("2023-11-23T12:00:00"),
        amount: 75,
        description: "Netshoes",
        reacurring: true,
        parcels: 4,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-11-23T12:00:00"),
        amount: 200,
        description: "Posto Shell",
      },
      {
        accountId: 8,

        date: new Date("2023-11-23T12:00:00"),
        amount: 84.8,
        description: "Boticário presente Kevão",
      },
      {
        accountId: 8,

        date: new Date("2023-11-19T12:00:00"),
        amount: 125,
        description: "American Breakfast",
      },
      {
        accountId: 8,

        date: new Date("2023-11-18T12:00:00"),
        amount: 82.8,
        description: "BK",
      },
      {
        accountId: 8,

        date: new Date("2023-11-18T12:00:00"),
        amount: 188.46,
        description: "Farmácio ézio",
      },
      {
        accountId: 8,

        date: new Date("2023-11-18T12:00:00"),
        amount: 20,
        description: "Fotos",
        reacurring: true,
        parcels: 6,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-11-15T12:00:00"),
        amount: 25.9,
        description: "Naluz artesanato",
      },
      {
        accountId: 8,

        date: new Date("2023-11-12T12:00:00"),
        amount: 225,
        description: "BBQ SJP 8 compras",
      },
      {
        accountId: 8,

        date: new Date("2023-11-12T12:00:00"),
        amount: 30,
        description: "BBQ SJP Estacionamento",
      },
      {
        accountId: 8,

        date: new Date("2023-11-11T12:00:00"),
        amount: 31.44,
        description: "Condor Cerveja",
      },
      {
        accountId: 8,

        date: new Date("2023-11-10T12:00:00"),
        amount: 40.99,
        description: "StudioZ presente pais",
        reacurring: true,
        parcels: 7,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-11-10T12:00:00"),
        amount: 346.46,
        description: "Executive Guest",
        reacurring: true,
        parcels: 9,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-11-08T12:00:00"),
        amount: 18.98,
        description: "Restaurante Chopps",
      },
      {
        accountId: 8,

        date: new Date("2023-11-08T12:00:00"),
        amount: 61.8,
        description: "Pizza Hut",
      },
      {
        accountId: 8,

        date: new Date("2023-11-07T12:00:00"),
        amount: 57.22,
        description: "Localiza",
      },
      {
        accountId: 8,

        date: new Date("2023-11-05T12:00:00"),
        amount: 76.34,
        description: "Balaroti plafon",
      },
      {
        accountId: 8,

        date: new Date("2023-11-04T12:00:00"),
        amount: 82.26,
        description: "Panvel",
      },
      {
        accountId: 8,

        date: new Date("2023-11-04T12:00:00"),
        amount: 105,
        description: "Betel Lavacar",
      },
      {
        accountId: 8,

        date: new Date("2023-11-03T12:00:00"),
        amount: 169,
        description: "Diarista",
      },
      {
        accountId: 8,

        date: new Date("2023-11-03T12:00:00"),
        amount: 158.96,
        description: "Americanas presente matteo",
      },
      {
        accountId: 8,

        date: new Date("2023-11-03T12:00:00"),
        amount: 65.6,
        description: "BK",
      },
      {
        accountId: 8,

        date: new Date("2023-11-02T12:00:00"),
        amount: 21.57,
        description: "Carrefour doces",
      },
      {
        accountId: 8,

        date: new Date("2023-11-02T12:00:00"),
        amount: 56,
        description: "Spedini",
      },
      {
        accountId: 8,

        date: new Date("2023-11-02T12:00:00"),
        amount: 39.89,
        description: "Panvel",
      },

      // C6J
      {
        accountId: 9,

        date: new Date("2023-11-26T12:00:00"),
        amount: 34.2,
        description: "Imporium roupas",
        reacurring: true,
        parcels: 8,
        currentParcel: 1,
      },
      {
        accountId: 9,

        date: new Date("2023-11-26T12:00:00"),
        amount: 57.75,
        description: "Amaro roupas",
        reacurring: true,
        parcels: 3,
        currentParcel: 1,
      },
      {
        accountId: 9,

        date: new Date("2023-11-26T12:00:00"),
        amount: 97.7,
        description: "BK",
      },
      {
        accountId: 9,

        date: new Date("2023-11-20T12:00:00"),
        amount: 18.55,
        description: "Patisserie Batel",
      },
      {
        accountId: 9,

        date: new Date("2023-11-19T12:00:00"),
        amount: 41.48,
        description: "Panvel",
      },
      {
        accountId: 9,

        date: new Date("2023-11-18T12:00:00"),
        amount: 139.6,
        description: "Nissei",
      },
      {
        accountId: 9,

        date: new Date("2023-11-16T12:00:00"),
        amount: 5.99,
        description: "Jupiter mercadinho",
      },
      {
        accountId: 9,

        date: new Date("2023-11-14T12:00:00"),
        amount: 216,
        description: "Cacho a cacho",
      },
      {
        accountId: 9,

        date: new Date("2023-11-14T12:00:00"),
        amount: 34.76,
        description: "Emakoto",
      },
      {
        accountId: 9,

        date: new Date("2023-11-13T12:00:00"),
        amount: 11.5,
        description: "Mocca",
      },
      {
        accountId: 9,

        date: new Date("2023-11-12T12:00:00"),
        amount: 74.99,
        description: "Dafiti",
        reacurring: true,
        parcels: 3,
        currentParcel: 1,
      },
      {
        accountId: 9,

        date: new Date("2023-11-12T12:00:00"),
        amount: 10.95,
        description: "Balaio de pão",
      },
      {
        accountId: 9,

        date: new Date("2023-11-11T12:00:00"),
        amount: 49.9,
        description: "Renner",
      },
      {
        accountId: 9,

        date: new Date("2023-11-07T12:00:00"),
        amount: 79.9,
        description: "Loja Franca presente lara",
      },
      {
        accountId: 9,

        date: new Date("2023-11-06T12:00:00"),
        amount: 35.9,
        description: "Nissei",
      },
      {
        accountId: 9,

        date: new Date("2023-11-05T12:00:00"),
        amount: 81.8,
        description: "Leo cosméticos",
      },
      {
        accountId: 9,

        date: new Date("2023-11-01T12:00:00"),
        amount: 24.79,
        description: "Nissei",
      },

      // IG
      {
        accountId: 10,

        date: new Date("2023-11-21T12:00:00"),
        amount: 117.87,
        description: "Carrefour Pneus",
        reacurring: true,
        parcels: 7,
        currentParcel: 1,
      },
      {
        accountId: 10,

        date: new Date("2023-11-08T12:00:00"),
        amount: 239.9,
        description: "TV nova",
        reacurring: true,
        parcels: 7,
        currentParcel: 1,
      },

      // AMZ
      {
        accountId: 11,

        date: new Date("2023-11-10T12:00:00"),
        amount: 52.49,
        description: "Processador e Fone gu",
        reacurring: true,
        parcels: 8,
        currentParcel: 1,
      },

      // fake old data
      {
        accountId: 1,

        date: new Date("2023-10-23T12:00:00"),
        amount: 46.74,
        description: "IPTU Esgoto",
      },
      {
        accountId: 1,

        date: new Date("2023-10-16T12:00:00"),
        amount: 119.82,
        description: "Internet",
      },
      {
        accountId: 1,

        date: new Date("2023-10-16T12:00:00"),
        amount: 487.99,
        description: "Condomínio",
      },
      {
        accountId: 1,

        date: new Date("2023-10-10T12:00:00"),
        amount: 249.15,
        description: "Gás",
      },
      {
        accountId: 1,

        date: new Date("2023-10-10T12:00:00"),
        amount: 196.05,
        description: "Copel",
      },
      {
        accountId: 1,

        date: new Date("2023-10-10T12:00:00"),
        amount: 17.28,
        description: "IPTU Garagem",
      },
      {
        accountId: 1,

        date: new Date("2023-10-10T12:00:00"),
        amount: 62.55,
        description: "IPTU Apto",
      },
      // D BB
      {
        accountId: 3,

        date: new Date("2023-10-23T12:00:00"),
        amount: 150,
        description: "Festa BB",
      },
      {
        accountId: 3,

        date: new Date("2023-10-17T12:00:00"),
        amount: 227.27,
        description: "Cassi",
      },
      {
        accountId: 3,

        date: new Date("2023-10-17T12:00:00"),
        amount: 331.45,
        description: "Previ",
      },
      {
        accountId: 3,

        date: dayjs(new Date("2023-10-14T12:00:00")),
        amount: 90.94,
        description: "Licensiamento 2008",
      },
      {
        accountId: 3,

        date: new Date("2023-10-03T12:00:00"),
        amount: 200,
        description: "Estacionamento mensalista",
      },

      {
        accountId: 5,

        date: new Date("2023-10-29T12:00:00"),
        amount: 202.79,
        description: "Jacomar",
      },
      {
        accountId: 5,

        date: new Date("2023-10-27T12:00:00"),
        amount: 95.74,
        description: "Maru",
      },
      {
        accountId: 5,

        date: new Date("2023-10-25T12:00:00"),
        amount: 590.72,
        description: "AAJ Até 25/11/23",
      },
      {
        accountId: 5,

        date: new Date("2023-10-18T12:00:00"),
        amount: 731.59,
        description: "AAJ Até 18/11/23",
      },
      {
        accountId: 5,

        date: new Date("2023-10-11T12:00:00"),
        amount: 632.32,
        description: "AAJ Até 11/11/23",
      },
      {
        accountId: 5,

        date: new Date("2023-10-05T12:00:00"),
        amount: 21.9,
        description: "Maria Açai",
      },
      {
        accountId: 5,

        date: new Date("2023-10-05T12:00:00"),
        amount: 41.6,
        description: "Cacaushow",
      },

      // VG
      {
        accountId: 6,

        date: new Date("2023-10-16T12:00:00"),
        amount: 51,
        description: "Ifood Spedini",
      },
      {
        accountId: 6,

        date: new Date("2023-10-16T12:00:00"),
        amount: 50.73,
        description: "Aliexpres Teclado",
        reacurring: true,
        parcels: 2,
        currentParcel: 1,
      },
      {
        accountId: 6,

        date: new Date("2023-10-08T12:00:00"),
        amount: 27.4,
        description: "Uber",
      },
      {
        accountId: 6,

        date: new Date("2023-10-07T12:00:00"),
        amount: 34.59,
        description: "Youse",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 6,

        date: new Date("2023-10-07T12:00:00"),
        amount: 26.92,
        description: "Uber",
      },
      {
        accountId: 6,

        date: new Date("2023-10-05T12:00:00"),
        amount: 27.9,
        description: "Spotify",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 6,

        date: new Date("2023-10-05T12:00:00"),
        amount: 22.9,
        description: "Sencon",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 6,

        date: new Date("2023-10-03T12:00:00"),
        amount: 46.82,
        description: "Aliexpres tranqueiras",
      },
      {
        accountId: 6,

        date: new Date("2023-10-02T12:00:00"),
        amount: 98.8,
        description: "Ifood sushi",
      },
      {
        accountId: 6,

        date: new Date("2023-09-02T12:00:00"),
        amount: 200,
        description: "Posto Shell",
      },

      // VJ
      {
        accountId: 7,

        date: new Date("2023-09-26T12:00:00"),
        amount: 80.8,
        description: "Boticário presentes",
        reacurring: true,
        parcels: 3,
        currentParcel: 1,
      },
      {
        accountId: 7,

        date: new Date("2023-09-22T12:00:00"),
        amount: 118.8,
        description: "Seguro 2008",
        reacurring: true,
        parcels: 8,
        currentParcel: 1,
      },
      {
        accountId: 7,

        date: new Date("2023-09-17T12:00:00"),
        amount: 191.65,
        description: "Posto Shell",
      },
      {
        accountId: 7,

        date: new Date("2023-09-15T12:00:00"),
        amount: 52.99,
        description: "Ifood Hotdog",
      },
      {
        accountId: 7,

        date: new Date("2023-09-10T12:00:00"),
        amount: 44.88,
        description: "Ifood Doces",
      },
      {
        accountId: 7,

        date: new Date("2023-09-09T12:00:00"),
        amount: 192,
        description: "Posto Shell",
      },
      {
        accountId: 7,

        date: new Date("2023-09-08T12:00:00"),
        amount: 45,
        description: "Meu Estar",
      },

      // C6G
      {
        accountId: 8,

        date: new Date("2023-09-28T12:00:00"),
        amount: 75.28,
        description: "Renner",
        reacurring: true,
        parcels: 2,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-09-26T12:00:00"),
        amount: 10.99,
        description: "Gelo no posto",
      },
      {
        accountId: 8,

        date: new Date("2023-08-25T12:00:00"),
        amount: 10,
        description: "Smiles",
      },
      {
        accountId: 8,

        date: new Date("2023-08-25T12:00:00"),
        amount: 41.9,
        description: "Livelo",
        reacurring: true,
        parcels: -1,
      },
      {
        accountId: 8,

        date: new Date("2023-08-25T12:00:00"),
        amount: 176.82,
        description: "Angeloni",
      },
      {
        accountId: 8,

        date: new Date("2023-08-23T12:00:00"),
        amount: 75,
        description: "Netshoes",
        reacurring: true,
        parcels: 4,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-08-23T12:00:00"),
        amount: 200,
        description: "Posto Shell",
      },
      {
        accountId: 8,

        date: new Date("2023-08-23T12:00:00"),
        amount: 84.8,
        description: "Boticário presente Kevão",
      },
      {
        accountId: 8,

        date: new Date("2023-08-19T12:00:00"),
        amount: 125,
        description: "American Breakfast",
      },
      {
        accountId: 8,

        date: new Date("2023-08-18T12:00:00"),
        amount: 82.8,
        description: "BK",
      },
      {
        accountId: 8,

        date: new Date("2023-08-18T12:00:00"),
        amount: 188.46,
        description: "Farmácio ézio",
      },
      {
        accountId: 8,

        date: new Date("2023-08-18T12:00:00"),
        amount: 20,
        description: "Fotos",
        reacurring: true,
        parcels: 6,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-08-15T12:00:00"),
        amount: 25.9,
        description: "Naluz artesanato",
      },
      {
        accountId: 8,

        date: new Date("2023-08-12T12:00:00"),
        amount: 225,
        description: "BBQ SJP 8 compras",
      },
      {
        accountId: 8,

        date: new Date("2023-08-12T12:00:00"),
        amount: 30,
        description: "BBQ SJP Estacionamento",
      },
      {
        accountId: 8,

        date: new Date("2023-08-11T12:00:00"),
        amount: 31.44,
        description: "Condor Cerveja",
      },
      {
        accountId: 8,

        date: new Date("2023-08-10T12:00:00"),
        amount: 40.99,
        description: "StudioZ presente pais",
        reacurring: true,
        parcels: 7,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-07-10T12:00:00"),
        amount: 346.46,
        description: "Executive Guest",
        reacurring: true,
        parcels: 9,
        currentParcel: 1,
      },
      {
        accountId: 8,

        date: new Date("2023-07-08T12:00:00"),
        amount: 18.98,
        description: "Restaurante Chopps",
      },
      {
        accountId: 8,

        date: new Date("2023-07-08T12:00:00"),
        amount: 61.8,
        description: "Pizza Hut",
      },
      {
        accountId: 8,

        date: new Date("2023-07-07T12:00:00"),
        amount: 57.22,
        description: "Localiza",
      },
      {
        accountId: 8,

        date: new Date("2023-07-05T12:00:00"),
        amount: 76.34,
        description: "Balaroti plafon",
      },
      {
        accountId: 8,

        date: new Date("2023-07-04T12:00:00"),
        amount: 82.26,
        description: "Panvel",
      },
      {
        accountId: 8,

        date: new Date("2023-07-04T12:00:00"),
        amount: 105,
        description: "Betel Lavacar",
      },
      {
        accountId: 8,

        date: new Date("2023-07-03T12:00:00"),
        amount: 169,
        description: "Diarista",
      },
      {
        accountId: 8,

        date: new Date("2023-07-03T12:00:00"),
        amount: 158.96,
        description: "Americanas presente matteo",
      },
      {
        accountId: 8,

        date: new Date("2023-07-03T12:00:00"),
        amount: 65.6,
        description: "BK",
      },
      {
        accountId: 8,

        date: new Date("2023-07-02T12:00:00"),
        amount: 21.57,
        description: "Carrefour doces",
      },
      {
        accountId: 8,

        date: new Date("2023-07-02T12:00:00"),
        amount: 56,
        description: "Spedini",
      },
      {
        accountId: 8,

        date: new Date("2023-06-02T12:00:00"),
        amount: 39.89,
        description: "Panvel",
      },

      // C6J
      {
        accountId: 9,

        date: new Date("2023-05-26T12:00:00"),
        amount: 34.2,
        description: "Imporium roupas",
        reacurring: true,
        parcels: 8,
        currentParcel: 1,
      },
      {
        accountId: 9,

        date: new Date("2023-05-26T12:00:00"),
        amount: 57.75,
        description: "Amaro roupas",
        reacurring: true,
        parcels: 3,
        currentParcel: 1,
      },
      {
        accountId: 9,

        date: new Date("2023-05-26T12:00:00"),
        amount: 97.7,
        description: "BK",
      },
      {
        accountId: 9,

        date: new Date("2023-05-20T12:00:00"),
        amount: 18.55,
        description: "Patisserie Batel",
      },
      {
        accountId: 9,

        date: new Date("2023-05-19T12:00:00"),
        amount: 41.48,
        description: "Panvel",
      },
      {
        accountId: 9,

        date: new Date("2023-05-18T12:00:00"),
        amount: 139.6,
        description: "Nissei",
      },
    ],
  });
}

try {
  await seed();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
