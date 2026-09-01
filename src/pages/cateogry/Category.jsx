import ProductsPage from "../../components/productsPage/ProductsPage";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productApi";
import ProductsPageLoading from "../../components/productsPage/ProductsPageLoading";
function Category() {
  const { slug } = useParams();
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsQuery({ category: slug });
  if (isLoading || isFetching) return <ProductsPageLoading />;
  return (
    <div>
      <ProductsPage title={slug.replace("-", " ")} products={products.data} />
    </div>
  );
}
export default Category;
