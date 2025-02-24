import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import robotplayingpianoImage from "../assets/images/robotplayingpiano.jpg";
import gdsplay01Image from "../assets/images/gdsplay01.jpg";
import emptystage01Image from "../assets/images/emptystage01.jpg";
import crowdconcert01Image from "../assets/images/crowdconcert01.jpg";

const OurStory = () => {
  return (
    <div className="bg-navy text-white min-h-screen">
      <Helmet>
        <title>Hikayemiz - Gig Match</title>
        <meta
          name="description"
          content="GigMatch'in hikayesi ve misyonu hakkında bilgi edinin."
        />
      </Helmet>

      <section className="container mx-auto px-6 py-16 space-y-16">
        {/* Sayfa Başlığı */}
        <h1 className="font-bold text-poppins text-4xl md:text-5xl text-center mb-6">
          Hikayemiz
        </h1>

        {/* Bölüm 1: Başlangıç - Heading in pink */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-pink-500">
              Başlangıç: Bir Müzisyenin İhtiyacından Doğan Fikir
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Merhaba, ben Görkem, Gig Match’in kurucusu ve aynı zamanda bir bağımsız müzisyenim. Müziğe olan tutkum ve sahne alma sürecinde karşılaştığım zorluklar, Gig Match’in doğuşuna ilham verdi.
            </p>
          </div>
          <div>
            <img
              src={gdsplay01Image}
              alt="Başlangıç Hikayesi"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Bölüm 2: Vizyonumuz - Heading in teal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src={emptystage01Image}
              alt="Vizyonumuz"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-teal-500">
              Vizyonumuz: Müziği ve Mekanları Birleştirmek
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Gig Match, sanatçıların kariyerlerini ileri taşıyabilecekleri ve mekanların kaliteli içerikle izleyicilerini memnun edebilecekleri bir ekosistem yaratmayı hedefliyor.
            </p>
          </div>
        </div>

        {/* Bölüm 3: Yolculuğumuz - Heading in pink */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-pink-500">
              Yolculuğumuz: Zorluklar ve Başarılar
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Her yenilikçi girişim gibi Gig Match de birçok zorlukla karşılaştı. Ancak topluluğumuzdan aldığımız geri bildirimlerle büyüdük ve geliştik.
            </p>
          </div>
          <div>
            <img
              src={crowdconcert01Image}
              alt="Yolculuğumuz"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Bölüm 4: Geleceğe Bakış - Heading in teal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <img
              src={robotplayingpianoImage}
              alt="Geleceğe Bakış"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-teal-500">
              Geleceğe Bakış: Sınırları Zorlamak
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Gig Match olarak, müziği ve canlı performansları daha erişilebilir hale getirme misyonumuzda sınır tanımıyoruz. Teknoloji ve sanatın buluştuğu bu platform, müzik sahnesini şekillendirmeye devam edecek.
            </p>
          </div>
        </div>

        {/* Bölüm 5: Katılın - Heading in pink */}
        <div className="text-center">
          <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-pink-500">
            Katılın: Müziğin Gücünü Keşfedin
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            Müzik, hepimizin ortak dilidir. Gig Match ile yeni başlangıçlar yapın, yeni sahneler keşfedin ve kariyerinizi zirveye taşıyın.
          </p>
          <Link
            to="/register"
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
          >
            Aramıza Katılın
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurStory;