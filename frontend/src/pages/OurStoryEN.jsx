import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

// JPG Images
import robotplayingpianoImage from "../assets/images/robotplayingpiano.jpg";
import gdsplay01Image from "../assets/images/gdsplay01.jpg";
import emptystage01Image from "../assets/images/emptystage01.jpg";
import crowdconcert01Image from "../assets/images/crowdconcert01.jpg";

// WebP Versions
import robotplayingpianoWebp from "../assets/images/robotplayingpiano.webp";
import gdsplay01Webp from "../assets/images/gdsplay01.webp";
import emptystage01Webp from "../assets/images/emptystage01.webp";
import crowdconcert01Webp from "../assets/images/crowdconcert01.webp";

const OurStoryEN = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="bg-navy text-white min-h-screen">
      <Helmet>
        <title>Our Story - Gig Match</title>
        <meta
          name="description"
          content="Learn about the inspiring journey of Gig Match, our success stories, and our mission to revolutionize the music scene."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/en/ourstory" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Our Story - Gig Match" />
        <meta
          property="og:description"
          content="Discover the journey behind Gig Match, the inspiring success stories, and our mission to transform the music scene."
        />
        <meta property="og:url" content="https://gigmatch.io/en/ourstory" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Story - Gig Match" />
        <meta
          name="twitter:description"
          content="Explore the story of Gig Match, where passion for music meets innovation in connecting artists, venues, and audiences."
        />

        {/* Optional Keywords */}
        <meta
          name="keywords"
          content="Gig Match, our story, music, success, inspiration, innovation, mission"
        />
      </Helmet>

      <section className="container mx-auto px-6 py-16 space-y-16">
        {/* Page Title */}
        <h1 className="font-bold text-poppins text-4xl md:text-5xl text-center mb-6">
          Our Story
        </h1>

        {/* Section 1: The Beginning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-pink-500">
              The Beginning: An Idea Born from a Musician's Need
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Hello, I am Gorkem, the founder of Gig Match and an independent musician.
              My passion for music and the challenges I encountered while performing inspired
              the creation of Gig Match.
            </p>
          </div>
          <div>
            <picture>
              <source srcSet={gdsplay01Webp} type="image/webp" />
              <img
                src={gdsplay01Image}
                alt="The Beginning Story"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        {/* Section 2: Our Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <picture>
              <source srcSet={emptystage01Webp} type="image/webp" />
              <img
                src={emptystage01Image}
                alt="Our Vision"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-teal-500">
              Our Vision: Uniting Music and Venues
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Gig Match aims to create an ecosystem where artists can elevate their careers and venues can connect with audiences through quality content.
            </p>
          </div>
        </div>

        {/* Section 3: Our Journey */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-pink-500">
              Our Journey: Challenges and Triumphs
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              Like every innovative venture, Gig Match faced numerous challenges.
              With support and valuable feedback from our community, we have grown and continuously improved.
            </p>
          </div>
          <div>
            <picture>
              <source srcSet={crowdconcert01Webp} type="image/webp" />
              <img
                src={crowdconcert01Image}
                alt="Our Journey"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        {/* Section 4: Looking to the Future */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <picture>
              <source srcSet={robotplayingpianoWebp} type="image/webp" />
              <img
                src={robotplayingpianoImage}
                alt="Looking to the Future"
                className="w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
            </picture>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-teal-500">
              Looking to the Future: Pushing Boundaries
            </h2>
            <p className="text-lg md:text-xl leading-relaxed">
              At Gig Match, we never shy away from pushing the limits in our mission to make music and live performances more accessible.
              Where technology meets art, our platform is poised to continue transforming the music scene.
            </p>
          </div>
        </div>

        {/* Section 5: Join Us - Call to Action (only shown to users who are not logged in) */}
        {!user && (
          <div className="text-center">
            <h2 className="font-semibold text-2xl md:text-3xl mb-4 text-pink-500">
              Join Us: Discover the Power of Music
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8">
              Music is our universal language. Begin new journeys with Gig Match, discover new stages, and take your career to new heights.
            </p>
            <Link
              to="/en/register"
              className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Join Us
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default OurStoryEN;