import prisma from "@/lib/db/prisma";
import Image from "next/image";
import ProductCard from "./component/ProductCard";
import Link from "next/link";
import PaginationBar from "./component/paginateBar";

interface HomeProbs{
  searchParams:{page:string}
}

export default async  function Home({ searchParams :  { page = "1" } }:HomeProbs) {
const currentPage=parseInt(page)
const pageSize = 6
const heroItemCount = 1
const totalProductItem = await prisma.product.count()
const totlalPage = Math.ceil (( totalProductItem - heroItemCount ) / pageSize )

  const products = await prisma.product.findMany ({
    orderBy : { idproduct : 'desc' },
    skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  })
  return (

    <div className="flex flex-col items-center">
      <div className="hero rounded-xl bg-base-200" >
          { currentPage===1 &&
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

          }
      </div>
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.idproduct} />
        ))}
        </div>
      {totlalPage >1 &&(
        <PaginationBar totlalPage={totlalPage} currentPage={currentPage}/>
      )}

    </div>
  );
}
