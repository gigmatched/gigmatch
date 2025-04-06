import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// Images
import musicianImg from "../assets/images/musician.jpg";
import venueImg from "../assets/images/venue.jpg";
import sceneImg from "../assets/images/scene.jpg";
import djImg from "../assets/images/dj.jpg";
import vocalistImg from "../assets/images/vocalist.jpg";
import rockImg from "../assets/images/rock.jpg";
import womensaxplayerImg from "../assets/images/womensaxplayer.avif";

const HomeEn = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen bg-navy">
      <Helmet>
        <title>Home - Gig Match</title>
        <meta
          name="description"
          content="Connecting local venues, artists and fans. With Gig Match find local concerts, book talented artists, and grow your music career."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://gigmatch.io/en" />
      </Helmet>

      {/* 1. Header (Hero) Section */}
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-bold text-poppins text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-teal-500">The Meeting Point</span>
            <br />
            <span className="text-pink-300">of Musicians</span>
            <br />
            <span className="text-white">and Stages</span>
          </h1>
          <p className="font-regular text-poppins text-xl md:text-2xl text-white mb-12">
            With Gig Match, performing on stage or discovering new artists is now very easy.
            <br className="hidden md:block" />
            Sign up for free and open the doors to the stage!
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/en/login"
                className="bg-transparent border border-pink-300 text-pink-300 px-8 py-4 rounded-full font-semibold hover:bg-pink-300 hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                to="/en/register"
                className="bg-pink-300 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-400 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 2. Section */}
      <section className="py-32 bg-navy">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-bold text-poppins text-3xl md:text-4xl text-teal-500 mb-6">
            The Stage for <span className="text-pink-300">Everyone</span>
          </h2>
          <p className="font-regular text-poppins text-lg md:text-xl text-white mb-10">
            Whether you are a listener or a musician,
            <br className="hidden md:block" />
            Gig Match brings the stage and art together; be a part of this meeting.
          </p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative flex-1">
              <img
                src={musicianImg}
                alt="Musicians"
                loading="lazy"
                className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 p-4 rounded-lg max-w-xs">
                <h3 className="font-bold text-poppins text-lg mb-2 text-white">
                  For the most talented musicians:
                </h3>
                <p className="font-regular text-poppins text-sm text-white">
                  No more worries about how to get on stage!
                  <br className="hidden md:block" />
                  Just focus on your music, we'll take care of the rest.
                </p>
              </div>
            </div>
            <div className="relative flex-1">
              <img
                src={venueImg}
                alt="Venues"
                loading="lazy"
                className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 p-4 rounded-lg max-w-xs">
                <h3 className="font-bold text-poppins text-lg mb-2 text-white">
                  For the most popular venues:
                </h3>
                <p className="font-regular text-poppins text-sm text-white">
                  Your stage will never be empty again!
                  <br className="hidden md:block" />
                  It's very easy to reach reliable and talented musicians.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section */}
      <section className="py-32 bg-navy">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8 text-white">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-bold text-poppins text-3xl md:text-4xl text-teal-500 mb-6">
              Let the Stage <span className="text-pink-300">Find You</span>
            </h2>
            <p className="font-regular text-poppins text-lg md:text-xl mb-6">
              An online platform that makes it possible for musicians and venues to reach each other
              and facilitates the processes in between.
            </p>
          </div>
          <div className="flex-1 relative">
            <img
              src={sceneImg}
              alt="Stage"
              loading="lazy"
              className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
            />
            <div className="absolute bottom-4 right-4 bg-pink-300 bg-opacity-75 p-4 rounded-lg max-w-xs">
              <p className="font-regular text-poppins text-lg text-white">
                A new era has begun for independent musicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-bold text-3xl md:text-4xl text-teal-500 mb-8">
            Discover with Gig Match, <span className="text-pink-300">Get Discovered</span>
          </h2>
          <div className="mb-10 space-y-4 font-sans text-lg md:text-xl text-white text-center">
            <p>Whether you are a DJ or a vocalist!</p>
            <p>Whether you play folk music in traditional venues or rock out with your band on stage!</p>
            <p>There is no discrimination on Gig Match.</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center space-x-8 mb-4">
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <img
                  src={djImg}
                  alt="DJ performing at a crowded venue"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <img
                  src={rockImg}
                  alt="Vocalist singing with a band in a studio setting"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <img
                  src={womensaxplayerImg}
                  alt="Woman playing saxophone"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-lg transform hover:scale-105 transition duration-300 hover:shadow-xl">
                <img
                  src={vocalistImg}
                  alt="Women singing on stage"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section */}
      <section className="py-32 bg-navy text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-bold text-poppins text-3xl md:text-4xl text-teal-500 mb-6">
            Sign Up for <span className="text-pink-300">Gig Match</span>
          </h2>
          <p className="font-regular text-poppins text-lg md:text-xl text-white mb-8">
            Sign up and gain access to a variety of concerts and artists!
          </p>
          <Link
            to="/en/register"
            className="bg-pink-300 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-400 transition"
          >
            Register for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeEn;