import HeroSlider from "../../components/heroSlider/HeroSlider";
import ProductsSlider from "../../components/productsSlider/ProductsSlider";
import "./home.css";
import ProductsSliderLoading from "../../components/productsSlider/ProductsSliderLoading";
import { useGetCategoriesQuery } from "../../api/categoriesApi";
import PageTransition from "../../components/PageTransition";

const choosenCategories = [
  "smartphones",
  "laptops",
  "accessories",
  "furniture",
];

function Home() {
  const { data, isLoading } = useGetCategoriesQuery();
  const categories = data?.data;
  const homeSlidersCategories = choosenCategories
    .map((name) => categories?.find((ele) => ele.name === name))
    .filter(Boolean);

  return (
    <PageTransition>
      <div>
        <HeroSlider choosenCategories={choosenCategories} />
        {isLoading
          ? homeSlidersCategories.map((category) => {
              return <ProductsSliderLoading key={category._id} />;
            })
          : homeSlidersCategories.map((category) => {
              return <ProductsSlider key={category.name} category={category} />;
            })}
      </div>
    </PageTransition>
  );
}

export default Home;
