import prisma from "@/lib/db/prisma";
import Image from "next/image";
import ProductCard from "./component/ProductCard";
import Link from "next/link";

export default async  function Home() {
  const products=await prisma.product.findMany({
    orderBy:{idproduct:'desc'}
  })
  // cons  ole.log(products)
  return (
    // <div>Hi</div>
    <div>
      <div className="hero rounded-xl bg-base-200" >
        <div className="hero-content flex-col lg:flex-row">
          <Image 
           src={products[0].imageUrl||""} 
           alt={products[0].name || ""}
           width={800} 
           height={400} 
           placeholder="blur" 
           blurDataURL="/assets/images/loader.svg" 
           loading="lazy"  
           className="w-full max-w-sm rounded-lg shadow-2xl" 
           quality={100}
          //  priority
          />
          <div>
            <h1 className="text-5xl font-bold">{products[0].name}</h1>
            <div className="py-6">{products[0].descriptions}</div>
            <Link className="btn btn-primary" href={`/products/${products[0].idproduct}`}>
            {/* <Link className="btn btn-primary" href={`/${products[0].idproduct}`}> */}
            Check Out
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map(product=>(
        <ProductCard key={product.idproduct} product={product}/>
      ))}

      </div>
    </div>
  );
}
