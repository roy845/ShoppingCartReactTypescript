import { ProductType } from '../context/ProductsProvider';
import { ReducerActionType, ReducerAction } from '../context/CartProvider';
import { ReactElement, memo } from 'react';

type PropType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: PropType): ReactElement => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? ' → Item in Cart: ✔️' : null;

  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="products__img" />
      <p>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(product.price)}
        {itemInCart}
        <button onClick={onAddToCart}>Add to Cart</button>
      </p>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProdcut, inCart: prevInCart }: PropType,
  { product: nextProdcut, inCart: nextInCart }: PropType,
) {
  return (
    Object.keys(prevProdcut).every((key) => {
      return (
        prevProdcut[key as keyof ProductType] ===
        nextProdcut[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
