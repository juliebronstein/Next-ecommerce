import fromatPrice from "@/lib/db/formatPrice";
import { product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import PriceTag from "./PriceTag";
import AddToCartButton from "../products/[productsId]/AddToCartButton";
import incrementProductQuantity from "../products/[productsId]/actions";

interface ProductCardProbs {
  product: product;
}
const ProductCard = ({ product }: ProductCardProbs) => {
  const isNew =
    Date.now() - new Date(product.createAt).getTime() < 7 * 24 * 60 * 60 * 1000;
  return (
    <Link
      href={`/products/${product.idproduct}`}
      // href={`/${product.idproduct}`}
      className="card bg-base-100 w-full hover:shadow-xl transition-shadow mb-10"
    >
      <figure>
        <Image
          src={product.imageUrl || ""}
          alt={product.name || ""}
          width={400}
          height={400}
          placeholder="blur"
          blurDataURL="/assets/images/loader.svg"
          loading="lazy"
          className="h-48 object-cover"
          quality={100}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew && <span className="badge badge-secondary">NEW</span>}
        <p>{product.descriptions}</p>
        <div className="card-actions justify-between place-items-baseline">
          <PriceTag className="card-title" price={product?.price || 0} />
          <AddToCartButton productId={product.idproduct} incrementProductQuantity={incrementProductQuantity} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
