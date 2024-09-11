import PriceTag from "@/app/component/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import incrementProductQuantity from "./actions";

interface ProductPageProbs {
  params: {
    productsId: string,
  };
}
const getProduct = async (productsId: string) => {
  const product = await prisma.product.findUnique({ where: { idproduct: productsId } });
  if (!product) notFound();
  return product;
};
// const get=async (productsId:string)=>{
//   const id=Number(productsId)
//   const product=await prisma.product.findUnique({where:{idproduct:id}})
//   if(!product) notFound()
//     return product
// }
export async function generateMetadata({
  params: { productsId },
}: ProductPageProbs): Promise<Metadata> {
  const product = getProduct(productsId);
  return{
    title:(await product).name || "" +" - ecomerce",
    description:(await product).descriptions,
    openGraph:{
      images:[(await product).imageUrl || ""]
    }
  }
}
const ProductPage = async ({ params: { productsId } }: ProductPageProbs) => {
  const product = await getProduct(productsId);
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <figure>
        <Image
          src={product.imageUrl || ""}
          alt={product.name || ""}
          width={500}
          height={500}
          placeholder="blur"
          blurDataURL="/assets/images/loader.svg"
          loading="lazy"
          className="rounded-lg"
          quality={100}
        />
      </figure>
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <p className="py-6">{product.descriptions}</p>
        <PriceTag className="my-4" price={product?.price || 0} />
        <div className="mt-5">
          {/* <button className="btn btn-primary">Buy Now</button> */}
          <AddToCartButton productId={product.idproduct} incrementProductQuantity={incrementProductQuantity} />
          
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
