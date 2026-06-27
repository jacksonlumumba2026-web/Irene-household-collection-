import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import FlashSale from '@/components/FlashSale';
import BestSellers from '@/components/BestSellers';
import NewArrivals from '@/components/NewArrivals';
import Reviews from '@/components/Reviews';
import Gallery from '@/components/Gallery';
import WhyChooseUs from '@/components/WhyChooseUs';
import Story from '@/components/Story';
import Brands from '@/components/Brands';
import InstagramFeed from '@/components/InstagramFeed';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <FlashSale />
        <BestSellers />
        <NewArrivals />
        <WhyChooseUs />
        <Story />
        <Reviews />
        <Gallery />
        <Brands />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
