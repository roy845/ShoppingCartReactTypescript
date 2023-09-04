import { useContext } from 'react';
import ProductsContext from '../context/ProductsProvider';
import { UserProductsContextType } from '../context/ProductsProvider';

const useProducts = (): UserProductsContextType => {
  return useContext(ProductsContext);
};

export default useProducts;
