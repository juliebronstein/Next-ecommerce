import Link from "next/link"

interface PaginationBarProbs{
    totlalPage:number,
    currentPage:number
}

 const PaginationBar=({ totlalPage , currentPage }: PaginationBarProbs )=>{

    const maxPage=Math.min (totlalPage , Math.max ( currentPage + 4 , 10 ))
    const minPage=Math.max(1 , Math.min ( currentPage - 5 , maxPage - 9 ))


    const numberPagedItem:JSX.Element[]=[]
    for(let page = minPage ; page <= maxPage ; page++){
        numberPagedItem.push(
            <Link 
              href={"?page=" + page }
              key={page}
              className={`btn join-item 
                ${currentPage === page ? "btn-active pointer-events-none" : ""} `}
            >
            {page}
            </Link>
        )
    }
    return(
        <>
        <div className="join hidden sm:block">{numberPagedItem}</div>
        <div className="join block sm:hidden">
          {currentPage > 1 && (
            <Link href={"?page=" + (currentPage - 1)} 
            className="join-item btn">
              «
            </Link>
          )}
          <button className="join-item btn pointer-events-none">
            Page {currentPage}
          </button>
          {currentPage < totlalPage && (
            <Link href={"?page=" + (currentPage + 1)} 
            className="join-item btn">
              »
            </Link>
          )}
        </div>
      </>
    )
 }
 export default PaginationBar