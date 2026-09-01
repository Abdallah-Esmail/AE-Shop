import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../api/productApi";
import ProductsPage from "../../components/productsPage/ProductsPage";
import NoResult from "../../components/errors/NoResult";
import ProductsPageLoading from "../../components/productsPage/ProductsPageLoading";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const { data, isLoading, isError, isFetching } = useGetProductsQuery(
    { keyword: query },
    { skip: !query },
  );
  if (isLoading || isFetching) {
    return <ProductsPageLoading />;
  }
  const products = data.data;

  if (isError) {
    return <NoResult />;
  }
  return (
    <div>
      <div className="container">
        <ProductsPage title={`Search for: ${query}`} products={products} />
      </div>
    </div>
  );
}

export default SearchResults;
